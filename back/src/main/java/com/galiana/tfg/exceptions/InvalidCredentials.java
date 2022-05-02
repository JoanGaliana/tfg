package com.galiana.tfg.exceptions;

public class InvalidCredentials extends RuntimeException {
    public InvalidCredentials() {
        super("INVALID_AUTH_CREDENTIALS");
    }
}
