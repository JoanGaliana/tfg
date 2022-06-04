package com.galiana.tfg.service;

import com.galiana.tfg.exceptions.GroupNotFoundException;
import com.galiana.tfg.exceptions.UserNotFoundException;
import com.galiana.tfg.exceptions.UserNotInGroupException;
import org.assertj.core.api.AssertionsForClassTypes;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
public class SpendingServiceTests {
    @Autowired
    private SpendingService spendingService;

    @Test
    @Transactional
    void findById() {
        var spending1 = spendingService.findById(1L); // name = testSpending
        var spending999 = spendingService.findById(999L); // Does not exist

        assertThat(spending1).isNotNull();
        assertThat(spending1.getName()).isEqualTo("Hotel bill");
        assertThat(spending1.getGroup().getId()).isEqualTo(1);
        assertThat(spending1.getUser().getId()).isEqualTo(2);
        assertThat(spending1.getAmount()).isEqualTo(40.5);

        assertThat(spending999).isNull();
    }

    @Test
    @Transactional
    void findByGroupId() {
        var spendings = spendingService.getByGroupId(1L); // name = testSpending

        assertThat(spendings).hasSize(2);
    }

    @Test
    @Transactional
    void create() {
        String name = "Mexican restaurant";
        long userId = 1;
        long groupId = 1;
        double amount = 21.45;

        var spending = spendingService.create(name, amount, userId, groupId);

        AssertionsForClassTypes.assertThat(spending.getName()).isEqualTo(name);
        AssertionsForClassTypes.assertThat(spending.getGroup().getName()).isEqualTo("testGroup");
        AssertionsForClassTypes.assertThat(spending.getUser().getEmail()).isEqualTo("alicia@test.com");
        AssertionsForClassTypes.assertThat(spending.getAmount()).isEqualTo(amount);
    }

    @Test
    @Transactional
    void createUserNotFound() {
        String name = "Mexican restaurant";
        double amount = 21.45;

        assertThatThrownBy(() -> spendingService.create(name, amount, 999L, 1L))
                .isInstanceOf(UserNotFoundException.class);
    }

    @Test
    @Transactional
    void createGroupNotFound() {
        String name = "Mexican restaurant";
        double amount = 21.45;

        assertThatThrownBy(() -> spendingService.create(name, amount, 1L, 999L))
                .isInstanceOf(GroupNotFoundException.class);
    }

    @Test
    @Transactional
    void createUserNotInGroup() {
        String name = "Mexican restaurant";
        double amount = 21.45;

        assertThatThrownBy(() -> spendingService.create(name, amount, 1L, 2L))
                .isInstanceOf(UserNotInGroupException.class);
    }
}
