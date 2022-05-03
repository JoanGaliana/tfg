package com.galiana.tfg.service;

import com.galiana.tfg.model.Group;
import com.galiana.tfg.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class GroupService {
    final GroupRepository groupRepository;

    Set<Group> findByUserId(Long userId) {
        return groupRepository.findByUsers_id(userId);
    }
}
