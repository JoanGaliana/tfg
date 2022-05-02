package com.galiana.tfg.api;

import com.galiana.tfg.exceptions.InvalidCredentials;
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
    public ResponseEntity<ApiError> handleInvalidCredentialsException(InvalidCredentials ex, WebRequest request) {
        var apiError = new ApiError("INVALID_CREDENTIALS", LocalDateTime.now().toString(), "");

        return new ResponseEntity<>(apiError, HttpStatus.UNAUTHORIZED);
    }
}
