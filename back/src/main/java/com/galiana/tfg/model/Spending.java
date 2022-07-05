package com.galiana.tfg.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "SPENDINGS")
public class Spending {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Long id;

    @Getter
    @Setter
    @NotNull
    private String name;

    @Getter
    @Setter
    @NotNull
    private double amount;

    @Getter
    @Setter
    @ManyToOne
    private Group group;

    @Getter
    @Setter
    @ManyToOne
    private User user;

    public Spending(String name,Group group, User user, double amount) {
        setName(name);
        setGroup(group);
        setUser(user);
        setAmount(amount);
    }
}
