package com.galiana.tfg.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

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
}
