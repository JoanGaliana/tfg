package com.galiana.tfg.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

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

        assertThat(aliceGroups).hasSize(1);
        assertThat(bobGroups).isEmpty();
    }
}
