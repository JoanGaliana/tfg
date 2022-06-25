package com.galiana.tfg.api;

import com.galiana.tfg.api.Data.SpendigData;
import com.galiana.tfg.model.Spending;
import com.galiana.tfg.model.User;
import com.galiana.tfg.service.GroupService;
import com.galiana.tfg.service.SpendingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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
    @Operation(
            summary = "Get spendings by group id",
            description = "Gets all spendings of a group",
            parameters = {
                    @Parameter(in = ParameterIn.PATH, name = "id", description = "Group id"),
            },
            responses = {
                    @ApiResponse(responseCode = "200", description = "User's groups"),
            }
    )
    Set<Spending> getGroupSpendings(@PathVariable Long id) {
        return spendingService.getByGroupId(id);
    }

    @PostMapping("/groups/{groupId}/spendings")
    @Operation(
            summary = "Creates a new spending on group",
            description = "Creates a new spending by an user in a group",
            parameters = {
                    @Parameter(in = ParameterIn.PATH, name = "groupId", description = "Group id"),
            },
            responses = {
                    @ApiResponse(responseCode = "201", description = "Created spending's id"),
                    @ApiResponse(
                            responseCode = "403",
                            description = "Authenticated user isn't member of group",
                            content = @Content(schema = @Schema(implementation = ErrorHandler.ApiError.class))
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "User or group not found",
                            content = @Content(schema = @Schema(implementation = ErrorHandler.ApiError.class))
                    ),
            }
    )
    ResponseEntity<Long> createNewSpending(@PathVariable Long groupId, @RequestBody SpendigData createSpendingData) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) auth.getPrincipal();

        boolean userInGroup = groupService.isUserInGroup(currentUser.getId(), groupId);
        if (!userInGroup) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        Spending newSpending = spendingService.create(createSpendingData.name(), createSpendingData.amount(), createSpendingData.userId(), groupId);

        return new ResponseEntity<>(newSpending.getId(), HttpStatus.CREATED);
    }
}
