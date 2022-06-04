package com.galiana.tfg.service;

import com.galiana.tfg.model.Group;
import com.galiana.tfg.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class GroupServiceTests {
    @Autowired
    private GroupService groupService;

    @Test
    @Transactional
    void findByUser() {
        var aliceGroups = groupService.findByUserId(1L);
        var bobGroups = groupService.findByUserId(2L);

        assertThat(aliceGroups).hasSize(2);
        assertThat(bobGroups).hasSize(2);

        var aliceGroup = aliceGroups.iterator().next();
        var bobGroup = bobGroups.iterator().next();

        assertThat(aliceGroup.getId()).isEqualTo(1L);
        assertThat(bobGroup.getId()).isEqualTo(2L);
    }

    @Test
    @Transactional
    void createGroup() {
        var groupName = "new group";
        var user = new User("Test user", "test");
        var group = groupService.create(groupName, user);

        assertThat(group.getName()).isEqualTo(groupName);

        assertThat(group.getUsers()).contains(user);
    }

    @Test
    @Transactional
    void findById() {
        var group1 = groupService.findById(1L); // name = testGroup
        var group999 = groupService.findById(999L); // Does not exist

        assertThat(group1).isNotNull();
        assertThat(group1.getName()).isEqualTo("testGroup");
        assertThat(group1.getUsers()).isNotNull();
        assertThat(group1.getUsers()).isNotEmpty();

        assertThat(group999).isNull();
    }

    @Test
    @Transactional
    void isUserInGroup() {
        assertThat(groupService.isUserInGroup(1L, 1L)).isTrue();
        assertThat(groupService.isUserInGroup(1L, 2L)).isFalse();
        assertThat(groupService.isUserInGroup(99L, 99L)).isFalse();
    }
}
