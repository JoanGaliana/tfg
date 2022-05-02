package com.galiana.tfg.service;

import com.galiana.tfg.model.User;
import com.galiana.tfg.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.xml.bind.ValidationException;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User create(String email, String password) throws ValidationException {
        if (userRepository.existsByEmail(email)) {
            throw new ValidationException("Username already exists");
        }

        var encodedPassword = passwordEncoder.encode(password);
        var user = new User(email, encodedPassword);

        userRepository.save(user);

        return user;
    }
}
