package com.galiana.tfg.api;

import com.galiana.tfg.api.Data.CreateUserData;
import com.galiana.tfg.api.Data.LoginData;
import com.galiana.tfg.config.security.JwtTokenUtil;
import com.galiana.tfg.exceptions.InvalidCredentials;
import com.galiana.tfg.model.Group;
import com.galiana.tfg.model.User;
import com.galiana.tfg.service.GroupService;
import com.galiana.tfg.service.UserService;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.xml.bind.ValidationException;
import java.security.Principal;
import java.util.Set;

@Tag(name = "Users")
@RestController
@RequiredArgsConstructor
public class UsersController {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final GroupService groupService;
    private final UserService userService;

    @PostMapping("login")
    @Operation(
            summary = "Get auth token by user's email and password",
            responses = {
                    @ApiResponse(responseCode = "200", description = "User's auth token"),
                    @ApiResponse(
                            responseCode = "401",
                            description = "Invalid credentials",
                            content = @Content(schema = @Schema(implementation = ErrorHandler.ApiError.class))
                    ),
            }
    )
    ResponseEntity<String> loginByPassword(@RequestBody @Valid LoginData loginData) {
        try {
            Authentication data = new UsernamePasswordAuthenticationToken(loginData.email(), loginData.password());
            Authentication authenticate = authenticationManager.authenticate(data);

            User user = (User) authenticate.getPrincipal();

            return new ResponseEntity<>(jwtTokenUtil.generateAccessToken(user), HttpStatus.CREATED);
        } catch (BadCredentialsException ex) {
            throw new InvalidCredentials();
        }
    }

    @PostMapping("/users/")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
            summary = "Creates a new user",
            description = "User email must be unique",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Created user's auth token"),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Validation error",
                            content = @Content(schema = @Schema(implementation = ErrorHandler.ApiError.class))
                    ),
            }
    )
    String createUser(@RequestBody @Valid CreateUserData createUserData) throws ValidationException {
        User user = userService.create(createUserData.email(), createUserData.password());

        return jwtTokenUtil.generateAccessToken(user);
    }

    @GetMapping("/users/current")
    @Operation(
            summary = "Get current authenticated user's data",
            responses = {
                    @ApiResponse(responseCode = "200", description = "User's data"),
            }
    )
    User getCurrentUser(Principal principal) {
        return userService.findByEmail(principal.getName());
    }

    @GetMapping("/users/{id}/groups")
    @PreAuthorize("#id == authentication.principal.id")
    @Operation(
            summary = "Get groups by user id",
            description = "Users can only get their own groups",
            parameters = {
                    @Parameter(in = ParameterIn.PATH, name = "id", description = "User id"),
            },
            responses = {
                    @ApiResponse(responseCode = "200", description = "User's groups"),
                    @ApiResponse(
                            responseCode = "403",
                            description = "Authenticated user doesn't have permission",
                            content = @Content(schema = @Schema(implementation = ErrorHandler.ApiError.class))
                    ),
            }
    )
    Set<Group> getUserGroups(@PathVariable Long id) {
        return groupService.findByUserId(id);
    }
}
