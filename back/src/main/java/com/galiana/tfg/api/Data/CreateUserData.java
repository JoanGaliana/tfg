package com.galiana.tfg.api.Data;

import javax.validation.constraints.NotBlank;

public record CreateUserData(@NotBlank String email, @NotBlank String password) {
}
