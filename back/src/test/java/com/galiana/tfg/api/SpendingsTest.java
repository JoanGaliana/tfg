package com.galiana.tfg.api;

import com.galiana.tfg.repository.SpendingRepository;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class SpendingsTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private SpendingRepository spendingRepository;

    @Test
    @Transactional
    @WithUserDetails("alicia@test.com")
    public void getGroupSpendings() throws Exception {
        this.mockMvc.perform(
                        get("/groups/1/spendings")
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[0].name").value("Hotel bill"))
                .andExpect(jsonPath("$.[1].name").value("Taxi"));
    }

    @Test
    @Transactional
    @WithUserDetails("alicia@test.com")
    public void create() throws Exception {
        var body = """
                                {
                                  "name": "Chinese restaurant",
                                  "amount": 45.2,
                                  "userId": 2,
                                  "groupId" : 3
                                }
                """;

        var createdSpendingId = this.mockMvc.perform(
                        post("/spendings")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body)
                )
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();

        var createdSpending = spendingRepository.findById(Long.decode(createdSpendingId)).orElse(null);

        assertThat(createdSpending).isNotNull();
        assertThat(createdSpending.getName()).isEqualTo("Chinese restaurant");
        assertThat(createdSpending.getAmount()).isEqualTo(45.2);
        assertThat(createdSpending.getUser().getId()).isEqualTo(2L);
        assertThat(createdSpending.getGroup().getId()).isEqualTo(3L);
    }

    @Test
    @Transactional
    @WithUserDetails("alicia@test.com")
    public void createCurrentUserNotInGroup() throws Exception {
        var body = """
                                {
                                  "name": "Chinese restaurant",
                                  "amount": 45.2,
                                  "userId": 2,
                                  "groupId" : 2
                                }
                """;

        this.mockMvc.perform(
                        post("/spendings")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body)
                )
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithUserDetails("alicia@test.com")
    public void createUserNotFound() throws Exception {
        var body = """
                                {
                                  "name": "Chinese restaurant",
                                  "amount": 45.2,
                                  "userId": 999,
                                  "groupId" : 1
                                }
                """;

        this.mockMvc.perform(
                        post("/spendings")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body)
                )
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("USER_NOT_FOUND"));
    }

    @Test
    @Transactional
    @WithUserDetails("alicia@test.com")
    public void createUserNotInGroup() throws Exception {
        var body = """
                                {
                                  "name": "Chinese restaurant",
                                  "amount": 45.2,
                                  "userId": 2,
                                  "groupId" : 1
                                }
                """;

        this.mockMvc.perform(
                        post("/spendings")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body)
                )
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("USER_NOT_IN_GROUP"));
    }
}