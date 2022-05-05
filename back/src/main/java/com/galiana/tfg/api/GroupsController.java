package com.galiana.tfg.api;

import com.galiana.tfg.model.Group;
import com.galiana.tfg.model.User;
import com.galiana.tfg.service.GroupService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Groups")
@RestController()
@RequiredArgsConstructor
public class GroupsController {
    private final GroupService groupService;

    private record CreateGroupData(String name) {
    }

    @PostMapping("/groups")
    ResponseEntity<Long> createNewGroup(@RequestBody CreateGroupData createGroupData) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) auth.getPrincipal();

        Group newGroup = groupService.create(createGroupData.name, currentUser);

        return new ResponseEntity<>(newGroup.getId(), HttpStatus.CREATED);
    }
}
