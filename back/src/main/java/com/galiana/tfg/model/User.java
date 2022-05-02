package com.galiana.tfg.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Collection;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Long id;

    @Getter
    @Setter
    private String email;

    @Getter
    @Setter @JsonIgnore
    private String password;

    @Getter
    @Setter
    private String username;

    @Getter
    @Setter @JsonIgnore
    private boolean accountNonExpired = true;
    @Getter
    @Setter @JsonIgnore
    private boolean accountNonLocked = true;
    @Getter
    @Setter @JsonIgnore
    private boolean credentialsNonExpired = true;
    @Getter
    @Setter @JsonIgnore
    private boolean enabled = true;

    public User(String email, String password) {
        this.email = email;
        this.username = email;
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }
}
