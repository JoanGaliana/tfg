package com.example.demo.service;

import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class UserServiceTests {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Test
    void create() throws Exception {
        var email = "a@test.net";
        var password = "password";

        var newUser = userService.create(email, password);

        assertThat(newUser).isNotNull();
        assertThat(newUser.getEmail()).isEqualTo(email);
        assertThat(newUser.getPassword()).isNotEqualTo(email);
    }
}
