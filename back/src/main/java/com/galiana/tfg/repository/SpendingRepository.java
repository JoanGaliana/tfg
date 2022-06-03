package com.galiana.tfg.repository;

import com.galiana.tfg.model.Spending;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SpendingRepository extends JpaRepository<Spending, Long> {
}
