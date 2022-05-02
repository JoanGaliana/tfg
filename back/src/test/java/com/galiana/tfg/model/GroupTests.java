package com.galiana.tfg.model;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class GroupTests {
    @Test
    void constructor() {
        var name = "testGroup";
        var newGroup = new Group("testGroup");

        assertThat(newGroup.getName()).isEqualTo(name);
    }
}
