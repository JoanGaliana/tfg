package com.galiana.tfg.repository;

import com.galiana.tfg.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface GroupRepository extends JpaRepository<Group, Long> {
    Set<Group> findByUsers_id(Long userId);
}
