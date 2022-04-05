package com.example.demo;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import javax.annotation.PostConstruct;
import javax.xml.bind.ValidationException;

@EnableJpaRepositories
@SpringBootApplication
@RequiredArgsConstructor
public class Application {
    private final UserService userService;
    private final UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @PostConstruct
    void checkitOut() throws ValidationException {
        userService.create("Bilbo", "1234");
        userService.create("Frodo", "1234");

        for (User user : userRepository.findAll()) {
            System.out.println("Hello " + user.toString());
        }
    }
}
