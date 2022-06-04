package com.galiana.tfg.service;

import com.galiana.tfg.exceptions.GroupNotFoundException;
import com.galiana.tfg.exceptions.UserNotFoundException;
import com.galiana.tfg.exceptions.UserNotInGroupException;
import com.galiana.tfg.model.Group;
import com.galiana.tfg.model.Spending;
import com.galiana.tfg.model.User;
import com.galiana.tfg.repository.GroupRepository;
import com.galiana.tfg.repository.SpendingRepository;
import com.galiana.tfg.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;


@Service
@RequiredArgsConstructor
public class SpendingService {
    final SpendingRepository spendingRepository;
    final UserRepository userRepository;
    final GroupRepository groupRepository;

    @Transactional
    public Spending create(String name, double amount, Long userId, Long groupId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new UserNotFoundException();
        }

        Group group = groupRepository.findById(groupId).orElse(null);
        if (group == null) {
            throw new GroupNotFoundException();
        }

        if (!groupRepository.existsByIdAndUsers_id(groupId, userId)) {
            throw new UserNotInGroupException();
        }

        Spending spending = new Spending(name, group, user, amount);

        spendingRepository.save(spending);

        return spending;
    }

    public Spending findById(long id) {
        return spendingRepository.findById(id).orElse(null);
    }

    public Set<Spending> getByGroupId(Long groupId) {
        return spendingRepository.findByGroup_id(groupId);
    }
}

