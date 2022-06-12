package com.galiana.tfg.api.Data;

import javax.validation.constraints.NotNull;

public record Member(@NotNull long id, @NotNull  String email, @NotNull double totalSpent){
}
