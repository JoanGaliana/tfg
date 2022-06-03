package com.galiana.tfg.repository;

import com.galiana.tfg.model.Group;
import com.galiana.tfg.model.Spending;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;


public interface SpendingRepository extends JpaRepository<Spending, Long> {
    Set<Spending> findByGroup_id(Long groupId);
}
