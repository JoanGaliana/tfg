package com.galiana.tfg.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import javax.xml.bind.ValidationException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
public class UserServiceTests {
    @Autowired
    private UserService userService;

    @Test
    @Transactional
    void create() throws Exception {
        var email = "a@test.net";
        var password = "password";

        var newUser = userService.create(email, password);

        assertThat(newUser).isNotNull();
        assertThat(newUser.getEmail()).isEqualTo(email);
        assertThat(newUser.getPassword()).isNotEqualTo(email);

        assertThat(newUser.isEnabled()).isTrue();
        assertThat(newUser.isAccountNonLocked()).isTrue();
        assertThat(newUser.isAccountNonExpired()).isTrue();
        assertThat(newUser.isCredentialsNonExpired()).isTrue();
    }

    @Test
    @Transactional
    void createAlreadyExistingEmail() {
        var existingEmail = "alicia@test.com";
        var password = "password";

        assertThatThrownBy(() -> {
            userService.create(existingEmail, password);
        })
                .isInstanceOf(ValidationException.class)
                .hasMessageContaining("Username already exists");
    }

    @Test
    void findByEmail() {
        var existingEmail = "alicia@test.com";

        var user = userService.findByEmail(existingEmail);

        assertThat(user).isNotNull();
        assertThat(user.getEmail()).isEqualTo(existingEmail);
    }

    @Test
    void findByEmailNonExisting() {
        var nonExistingEmail = "nonExisting@test.com";

        var user = userService.findByEmail(nonExistingEmail);

        assertThat(user).isNull();
    }
}
