package com.galiana.tfg.api.Data;

import javax.validation.constraints.NotNull;

public record SpendigData(@NotNull String name, @NotNull double amount, @NotNull Long userId) {
}