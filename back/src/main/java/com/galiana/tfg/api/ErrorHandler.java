package com.galiana.tfg.api;

import com.galiana.tfg.exceptions.GroupNotFoundException;
import com.galiana.tfg.exceptions.InvalidCredentials;
import com.galiana.tfg.exceptions.UserNotFoundException;
import com.galiana.tfg.exceptions.UserNotInGroupException;
import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class ErrorHandler {
    public record ApiError(String error, String timestamp, String details) {
    }

    @ExceptionHandler(InvalidCredentials.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @Hidden
    public ResponseEntity<ApiError> handleInvalidCredentialsException(InvalidCredentials ex, WebRequest request) {
        var apiError = new ApiError("INVALID_CREDENTIALS", LocalDateTime.now().toString(), "");

        return new ResponseEntity<>(apiError, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @Hidden
    public ResponseEntity<ApiError> handleUserNotFoundException(UserNotFoundException ex, WebRequest request) {
        var apiError = new ApiError("USER_NOT_FOUND", LocalDateTime.now().toString(), "");

        return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(GroupNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @Hidden
    public ResponseEntity<ApiError> handleGroupNotFoundException(GroupNotFoundException ex, WebRequest request) {
        var apiError = new ApiError("GROUP_NOT_FOUND", LocalDateTime.now().toString(), "");

        return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserNotInGroupException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @Hidden
    public ResponseEntity<ApiError> handleUserNotInGroupException(UserNotInGroupException ex, WebRequest request) {
        var apiError = new ApiError("USER_NOT_IN_GROUP", LocalDateTime.now().toString(), "");

        return new ResponseEntity<>(apiError, HttpStatus.FORBIDDEN);
    }
}
