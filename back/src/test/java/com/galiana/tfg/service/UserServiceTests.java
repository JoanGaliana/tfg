package com.galiana.tfg.service;

import com.galiana.tfg.repository.UserRepository;
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

    @Autowired
    private UserRepository userRepository;

    @Test
    @Transactional
    void create() throws Exception {
        var email = "a@test.net";
        var password = "password";

        var newUser = userService.create(email, password);

        assertThat(newUser).isNotNull();
        assertThat(newUser.getEmail()).isEqualTo(email);
        assertThat(newUser.getPassword()).isNotEqualTo(email);
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
}
