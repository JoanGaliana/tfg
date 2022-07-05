package com.galiana.tfg.api;


import com.galiana.tfg.repository.GroupRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;

import java.util.Objects;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
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

        assertThat(createdGroup).isNotNull();
        assertThat(createdGroup.getUsers().size()).isEqualTo(1);

        var groupUser = createdGroup.getUsers().iterator().next();
        assertThat(groupUser.getEmail()).isEqualTo("alicia@test.com");
    }

    @Test
    @Transactional
    @WithUserDetails("alicia@test.com")
    public void getGroupById() throws Exception {
        // Alicia is in group 1
        this.mockMvc.perform(
                        get("/groups/1")
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("testGroup"));
    }

    @Test
    @Transactional
    @WithUserDetails("alicia@test.com")
    public void getGroupByIdNotFound() throws Exception {
        // Alicia is not in group 2
        this.mockMvc.perform(
                        get("/groups/99999")
                )
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    @WithUserDetails("alicia@test.com")
    public void getGroupByIdForbidden() throws Exception {
        // Alicia is not in group 2
        this.mockMvc.perform(
                        get("/groups/2")
                )
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithUserDetails("alicia@test.com")
    public void getGroupMembers() throws Exception {
        this.mockMvc.perform(
                        get("/groups/3/members")
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[0].email").value("alicia@test.com"))
                .andExpect(jsonPath("$.[0].totalSpent").value(0))
                .andExpect(jsonPath("$.[1].email").value("bernardo@test2.com"))
                .andExpect(jsonPath("$.[1].totalSpent").value(45.5));
    }

    @Test
    @Transactional
    @WithUserDetails("alicia@test.com")
    public void getGroupMembersNotFound() throws Exception {
        this.mockMvc.perform(
                        get("/groups/9999/members")
                )
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    @WithUserDetails("alicia@test.com")
    public void getGroupMembersForbiddenNotMember() throws Exception {
        this.mockMvc.perform(
                        get("/groups/2/members")
                )
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithUserDetails("alicia@test.com")
    void addMember() throws Exception {
        var body = """
                                {
                                  "email": "bernardo@test2.com"
                                }
                """;

        this.mockMvc.perform(
                        post("/groups/1/members")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body)
                )
                .andExpect(status().isCreated());

        var group = groupRepository.findById(1L).orElseThrow();

        Assertions.assertThat(group.getUsers()).anyMatch((user) -> Objects.equals(user.getEmail(), "bernardo@test2.com"));
    }

    @Test
    @Transactional
    @WithUserDetails("alicia@test.com")
    void removeGroup() throws Exception {
        this.mockMvc.perform(
                        delete("/groups/1/")
                )
                .andExpect(status().isNoContent());

        var group = groupRepository.findById(1L).orElse(null);

        assertThat(group).isNull();
    }

    @Test
    @Transactional
    @WithUserDetails("alicia@test.com")
    public void removeGroupUserNotInGroup() throws Exception {
        this.mockMvc.perform(
                        delete("/groups/2/")
                )
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.error").value("USER_NOT_IN_GROUP"));
    }

    @Test
    @Transactional
    @WithUserDetails("alicia@test.com")
    void addMemberAlreadyInGroup() throws Exception {
        var body = """
                                {
                                  "email": "bernardo@test2.com"
                                }
                """;

        this.mockMvc.perform(
                        post("/groups/3/members")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body)
                )
                .andExpect(status().isCreated());

        var group = groupRepository.findById(3L).orElseThrow();

        Assertions.assertThat(group.getUsers()).anyMatch((user) -> Objects.equals(user.getEmail(), "bernardo@test2.com"));
    }

    @Test
    @Transactional
    @WithUserDetails("alicia@test.com")
    void addMemberUserNotInGroup() throws Exception {
        var body = """
                                {
                                  "email": "bernardo@test2.com"
                                }
                """;

        this.mockMvc.perform(
                        post("/groups/2/members")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body)
                )
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithUserDetails("alicia@test.com")
    void addMemberUserNotFound() throws Exception {
        var body = """
                                {
                                  "email": "not@exists.com"
                                }
                """;

        this.mockMvc.perform(
                        post("/groups/1/members")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body)
                )
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    @WithUserDetails("alicia@test.com")
    void addMemberGroupNotFound() throws Exception {
        var body = """
                                {
                                  "email": "bernardo@test2.com"
                                }
                """;

        this.mockMvc.perform(
                        post("/groups/9999/members")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body)
                )
                .andExpect(status().isNotFound());
    }
}
