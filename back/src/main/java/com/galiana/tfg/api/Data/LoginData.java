package com.galiana.tfg.api.Data;

import javax.validation.constraints.NotNull;

public record LoginData(@NotNull String email, @NotNull String password) {
}