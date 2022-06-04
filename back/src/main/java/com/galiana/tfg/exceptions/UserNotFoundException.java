package com.galiana.tfg.exceptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException() {
        super("USER_NOT_FOUND");
    }
}
