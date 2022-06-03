package com.galiana.tfg.api;

import com.galiana.tfg.model.Spending;
import com.galiana.tfg.service.SpendingService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@Tag(name = "Spendings")
@RestController()
@RequiredArgsConstructor
public class SpendingsController {
    private final SpendingService spendingService;

    @GetMapping("/groups/{id}/spendings")
    Set<Spending> getGroupSpendings(@PathVariable Long id) {
        return spendingService.getByGroupId(id);
    }
}
