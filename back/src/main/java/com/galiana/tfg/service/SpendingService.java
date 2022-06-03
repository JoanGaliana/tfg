package com.galiana.tfg.service;

import com.galiana.tfg.model.Spending;
import com.galiana.tfg.repository.SpendingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;


@Service
@RequiredArgsConstructor
public class SpendingService {
    final SpendingRepository spendingRepository;

    public Spending findById(long id) {
        return spendingRepository.findById(id).orElse(null);
    }

    public Set<Spending> getByGroupId(Long groupId) {
        return spendingRepository.findByGroup_id(groupId);
    }
}
