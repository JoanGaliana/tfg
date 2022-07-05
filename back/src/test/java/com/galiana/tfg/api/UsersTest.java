package com.galiana.tfg.api;

import com.galiana.tfg.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class UsersTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserService userService;

    @Test
    public void invalidLoginPasswordReturnsUnauthorized() throws Exception {
        var body = """
                                {
                                  "email": "alicia@test.com",
                                  "password": "123456"
                                }
                """;

        this.mockMvc.perform(
                        post("/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body)
                )
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("INVALID_CREDENTIALS"));
    }

    @Test
    public void invalidLoginEmailReturnsUnauthorized() throws Exception {
        var body = """
                                {
                                  "email": "non-existant@test.com",
                                  "password": "1234"
                                }
                """;

        this.mockMvc.perform(
                        post("/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body)
                )
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("INVALID_CREDENTIALS"));
    }

    @Test
    @Transactional
    public void createUser() throws Exception {
        var body = """
                                {
                                  "email": "non-existant@test.com",
                                  "password": "1234"
                                }
                """;

        var result = this.mockMvc.perform(
                        post("/users/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body)
                )
                .andExpect(status().isCreated()).andReturn();

        var resultToken = result.getResponse().getContentAsString();

        assertThat(resultToken).isNotEmpty();
    }

    @Test
    @Transactional
    public void createUserAlreadyExists() throws Exception {
        var body = """
                                {
                                  "email": "alicia@test.com",
                                  "password": "1234"
                                }
                """;

        this.mockMvc.perform(
                        post("/users/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body)
                )
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("USERNAME_ALREADY_EXISTS"));
    }

    @Test
    public void validLoginReturnsToken() throws Exception {
        var body = """
                                {
                                  "email": "alicia@test.com",
                                  "password": "1234"
                                }
                """;

        this.mockMvc.perform(
                        post("/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body)
                )
                .andExpect(status().isCreated())
                .andExpect(content().contentType("text/plain;charset=UTF-8"));
    }

    @Test
    @WithUserDetails("alicia@test.com")
    public void listCurrentUserGroups() throws Exception {

        this.mockMvc.perform(
                        get("/users/1/groups")
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("testGroup"));
    }

    @Test
    @WithUserDetails("alicia@test.com")
    public void cantListOtherUserGroups() throws Exception {

        this.mockMvc.perform(
                        get("/users/2/groups")
                )
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithUserDetails("alicia@test.com")
    public void getCurrentUserDetails() throws Exception {

        this.mockMvc.perform(
                        get("/users/current")
                )
                .andDo(print())
                .andExpect(jsonPath("$.email").value("alicia@test.com"));
    }
}