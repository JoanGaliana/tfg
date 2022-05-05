package com.galiana.tfg.api;

import com.galiana.tfg.repository.GroupRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class GroupsTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private GroupRepository groupRepository;

    @Test
    @Transactional
    @WithUserDetails("alicia@test.com")
    public void createNewGroup() throws Exception {
        var body = """
                                {
                                  "name": "Test group"
                                }
                """;

        var createdGroupId = this.mockMvc.perform(
                        post("/groups")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body)
                )
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();

        var createdGroup = groupRepository.findById(Long.decode(createdGroupId)).orElse(null);
        var groupUser = createdGroup.getUsers().iterator().next();

        assertThat(createdGroup).isNotNull();
        assertThat(createdGroup.getUsers().size()).isEqualTo(1);
        assertThat(groupUser.getEmail()).isEqualTo("alicia@test.com");
    }
}