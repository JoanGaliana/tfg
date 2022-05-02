package com.galiana.tfg.api;

import com.galiana.tfg.config.security.JwtTokenUtil;
import com.galiana.tfg.exceptions.InvalidCredentials;
import com.galiana.tfg.model.User;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Tag(name = "Authentication")
@RestController
@RequiredArgsConstructor
public class UsersController {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;

    private record LoginData(String email, String password) {
    }

    @PostMapping("login")
    ResponseEntity<String> loginByPassword(@RequestBody @Valid LoginData loginData) {
        try {
            Authentication data = new UsernamePasswordAuthenticationToken(loginData.email, loginData.password);
            Authentication authenticate = authenticationManager.authenticate(data);

            User user = (User) authenticate.getPrincipal();

            return new ResponseEntity<>(jwtTokenUtil.generateAccessToken(user),HttpStatus.CREATED);
        } catch (BadCredentialsException ex) {
            throw new InvalidCredentials();
        }
    }
}
