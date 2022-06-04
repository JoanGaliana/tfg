package com.galiana.tfg.exceptions;

public class GroupNotFoundException extends RuntimeException {
    public GroupNotFoundException() {
        super("GROUP_NOT_FOUND");
    }
}
