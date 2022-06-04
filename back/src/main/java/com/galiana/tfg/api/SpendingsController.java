package com.galiana.tfg.api;

import com.galiana.tfg.model.Spending;
import com.galiana.tfg.model.User;
import com.galiana.tfg.service.GroupService;
import com.galiana.tfg.service.SpendingService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@Tag(name = "Spendings")
@RestController()
@RequiredArgsConstructor
public class SpendingsController {
    private final SpendingService spendingService;
    private final GroupService groupService;

    @GetMapping("/groups/{id}/spendings")
    Set<Spending> getGroupSpendings(@PathVariable Long id) {
        return spendingService.getByGroupId(id);
    }

    private record SpendigData(String name, double amount, Long userId, Long groupId) {
    }

    @PostMapping("/spendings")
    ResponseEntity<Long> createNewSpending(@RequestBody SpendigData createSpendingData) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) auth.getPrincipal();

        boolean userInGroup = groupService.isUserInGroup(currentUser.getId(), createSpendingData.groupId);
        if (!userInGroup) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        Spending newSpending = spendingService.create(createSpendingData.name, createSpendingData.amount, createSpendingData.userId, createSpendingData.groupId);

        return new ResponseEntity<>(newSpending.getId(), HttpStatus.CREATED);
    }
}
