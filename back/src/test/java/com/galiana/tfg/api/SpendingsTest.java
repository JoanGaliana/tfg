package com.galiana.tfg.api;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class SpendingsTest {
    @Autowired
    private MockMvc mockMvc;

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
}