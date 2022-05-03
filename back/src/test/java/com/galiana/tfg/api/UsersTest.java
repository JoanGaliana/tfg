package com.galiana.tfg.api;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class UsersTest {
    @Autowired
    private MockMvc mockMvc;

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
}