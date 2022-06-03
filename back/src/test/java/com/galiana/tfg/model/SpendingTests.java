package com.galiana.tfg.model;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class SpendingTests {
    @Test
    void constructor() {
        String name = "Hotel bill";
        User user = new User("Alice", "1234");
        Group group = new Group("testGroup", user);
        double amount = 21.45;

        Spending spending = new Spending(name, group, user, amount);

        assertThat(spending.getName()).isEqualTo(name);
        assertThat(spending.getGroup()).isEqualTo(group);
        assertThat(spending.getUser()).isEqualTo(user);
        assertThat(spending.getAmount()).isEqualTo(amount);
    }
}
