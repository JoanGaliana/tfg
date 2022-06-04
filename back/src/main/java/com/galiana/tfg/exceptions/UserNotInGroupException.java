package com.galiana.tfg.exceptions;

public class UserNotInGroupException extends RuntimeException {
    public UserNotInGroupException() {
        super("USER_NOT_IN_GROUP");
    }
}
