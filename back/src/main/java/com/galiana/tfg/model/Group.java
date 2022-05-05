package com.galiana.tfg.model;

import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "GROUPS")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Long id;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    @ManyToMany
    private Set<User> users;

    public Group(String name, User creator) {
        setName(name);

        var users = new HashSet<User>();
        users.add(creator);

        setUsers(users);
    }
}
