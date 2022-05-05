package com.galiana.tfg.service;

import com.galiana.tfg.model.Group;
import com.galiana.tfg.model.User;
import com.galiana.tfg.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class GroupService {
    final GroupRepository groupRepository;

    public Set<Group> findByUserId(Long userId) {
        return groupRepository.findByUsers_id(userId);
    }

    @Transactional
    public Group create(String groupName, User creator) {
        Group group = new Group(groupName, creator);

        groupRepository.save(group);

        return group;
    }
}
