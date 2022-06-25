package com.galiana.tfg.service;

import com.galiana.tfg.exceptions.GroupNotFoundException;
import com.galiana.tfg.exceptions.UserNotFoundException;
import com.galiana.tfg.exceptions.UserNotInGroupException;
import com.galiana.tfg.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import java.util.Objects;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

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

    @Autowired
    private SpendingService spendingService;

    @Test
    @Transactional
    void findMembersByGroupId() {
        var members = groupService.findMembersByGroupId(1L);
        var a = spendingService.getByGroupId(1L);

        assertThat(members)
                .anyMatch(member -> member.id() == 1 && member.email().equals("alicia@test.com") && member.totalSpent() == 30.5)
                .noneMatch(member -> member.id() == 2);
    }

    @Test
    @Transactional
    void findMembersByGroupIdWithoutSpendings() {
        var members = groupService.findMembersByGroupId(3L);

        assertThat(members)
                .anyMatch(member -> member.id() == 1 && member.totalSpent() == 0.0)
                .anyMatch(member -> member.id() == 2 && member.totalSpent() == 45.5);
    }

    @Test
    @Transactional
    void findMembersByGroupIdOnlyGroupMembers() {
        var members = groupService.findMembersByGroupId(2L);

        assertThat(members)
                .noneMatch(member -> member.id() == 1)
                .anyMatch(member -> member.id() == 2);
    }

    @Test
    @Transactional
    void addMember() {
        groupService.addMember(1L, 1L, "bernardo@test2.com");

        var group = groupService.findById(1L);

        assertThat(group.getUsers()).anyMatch((user) -> Objects.equals(user.getEmail(), "bernardo@test2.com"));
    }

    @Test
    @Transactional
    void addMemberAlreadyInGroup() {
        groupService.addMember(1L, 3L, "bernardo@test2.com");

        var group = groupService.findById(3L);

        assertThat(group.getUsers()).anyMatch((user) -> Objects.equals(user.getEmail(), "bernardo@test2.com"));
    }

    @Test
    @Transactional
    void addMemberUserNotInGroup() {
        assertThatThrownBy(() -> groupService.addMember(2L, 1L, "bernardo@test2.com"))
                .isInstanceOf(UserNotInGroupException.class);
    }

    @Test
    @Transactional
    void addMemberUserNotFound() {
        assertThatThrownBy(() -> groupService.addMember(1L, 1L, "no@exists.com"))
                .isInstanceOf(UserNotFoundException.class);
    }
    @Test
    @Transactional
    void addMemberGroupNotFound() {
        assertThatThrownBy(() -> groupService.addMember(1L, 999L, "bernardo@test2.com"))
                .isInstanceOf(GroupNotFoundException.class);
    }
}
