package com.galiana.tfg.model;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class UserTests {
    @Test
    void getUsernameReturnsEmail() {
        var user = new User();
        user.setEmail("testEmail@test.com");

        assertThat(user.getUsername()).isEqualTo("testEmail@test.com");
    }
}
