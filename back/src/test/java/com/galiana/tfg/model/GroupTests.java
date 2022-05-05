package com.galiana.tfg.model;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class GroupTests {
    @Test
    void constructor() {
        var name = "testGroup";
        var user = new User("pepe@pepe.com", "1234");
        var newGroup = new Group("testGroup", user );

        assertThat(newGroup.getName()).isEqualTo(name);
        assertThat(newGroup.getUsers().contains(user)).isTrue();
    }
}
