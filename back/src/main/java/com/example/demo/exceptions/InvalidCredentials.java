package com.example.demo.exceptions;

public class InvalidCredentials extends RuntimeException {
    public InvalidCredentials() {
        super("INVALID_AUTH_CREDENTIALS");
    }
}
