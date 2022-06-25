package com.galiana.tfg.api;

import com.galiana.tfg.api.Data.Member;
import com.galiana.tfg.model.Group;
import com.galiana.tfg.model.User;
import com.galiana.tfg.service.GroupService;
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

@Tag(name = "Groups")
@RestController()
@RequiredArgsConstructor
public class GroupsController {
    private final GroupService groupService;

    private record CreateGroupData(String name) {
    }

    @PostMapping("/groups")
    @Operation(
            summary = "Create new group",
            description = "Current authenticated user is added to group members by default",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Created group's id"),
            }
    )
    ResponseEntity<Long> createNewGroup(@RequestBody CreateGroupData createGroupData) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) auth.getPrincipal();

        Group newGroup = groupService.create(createGroupData.name, currentUser);

        return new ResponseEntity<>(newGroup.getId(), HttpStatus.CREATED);
    }

    @GetMapping("/groups/{id}")
    @Operation(
            summary = "Get group data by group id",
            description = "User can only get data from its own groups",
            parameters = {
                    @Parameter(in = ParameterIn.PATH, name = "id", description = "Group id")
            },
            responses = {
                    @ApiResponse(responseCode = "200", description = "Group's data"),
                    @ApiResponse(
                            responseCode = "403",
                            description = "Authenticated user isn't member of group",
                            content = @Content(schema = @Schema(implementation = ErrorHandler.ApiError.class))
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Group not found",
                            content = @Content(schema = @Schema(implementation = ErrorHandler.ApiError.class))
                    ),
            }
    )
    ResponseEntity<Group> getGroupById(@PathVariable Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) auth.getPrincipal();

        Group group = groupService.findById(id);

        if (group == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        boolean userInGroup = groupService.isUserInGroup(currentUser.getId(), group.getId());
        if (!userInGroup) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity<>(group, HttpStatus.OK);
    }

    @GetMapping("/groups/{id}/members")
    @Operation(
            summary = "Get group members by group id",
            description = "User can only get data from its own groups",
            parameters = {
                    @Parameter(in = ParameterIn.PATH, name = "id", description = "Group id")
            },
            responses = {
                    @ApiResponse(responseCode = "200", description = "Group's members"),
                    @ApiResponse(
                            responseCode = "403",
                            description = "Authenticated user isn't member of group",
                            content = @Content(schema = @Schema(implementation = ErrorHandler.ApiError.class))
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Group not found",
                            content = @Content(schema = @Schema(implementation = ErrorHandler.ApiError.class))
                    ),
            }
    )
    ResponseEntity<Set<Member>> getGroupMembersById(@PathVariable Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) auth.getPrincipal();

        Group group = groupService.findById(id);
        if (group == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        boolean userInGroup = groupService.isUserInGroup(currentUser.getId(), group.getId());
        if (!userInGroup) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        Set<Member> members = groupService.findMembersByGroupId(id);

        return new ResponseEntity<>(members, HttpStatus.OK);
    }
}
