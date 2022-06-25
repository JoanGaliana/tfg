package com.galiana.tfg.service;

import com.galiana.tfg.api.Data.Member;
import com.galiana.tfg.exceptions.GroupNotFoundException;
import com.galiana.tfg.exceptions.UserNotFoundException;
import com.galiana.tfg.exceptions.UserNotInGroupException;
import com.galiana.tfg.model.Group;
import com.galiana.tfg.model.Spending;
import com.galiana.tfg.model.User;
import com.galiana.tfg.repository.GroupRepository;
import com.galiana.tfg.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class GroupService {
    final GroupRepository groupRepository;
    final UserRepository userRepository;

    public Set<Group> findByUserId(Long userId) {
        return groupRepository.findByUsers_id(userId);
    }

    @Transactional
    public Group create(String groupName, User creator) {
        Group group = new Group(groupName, creator);

        groupRepository.save(group);

        return group;
    }

    public Group findById(long id) {
        return groupRepository.findById(id).orElse(null);
    }

    public boolean isUserInGroup(long userId, long groupId) {
        return groupRepository.existsByIdAndUsers_id(groupId, userId);
    }

    public Set<Member> findMembersByGroupId(Long groupId) {
        return groupRepository.findMembersByGroupId(groupId);
    }

    @Transactional
    public Group addMember(Long authenticatedUserId, Long groupId, String email) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UserNotFoundException();
        }

        Group group = groupRepository.findById(groupId).orElse(null);
        if (group == null) {
            throw new GroupNotFoundException();
        }

        if (!groupRepository.existsByIdAndUsers_id(groupId, authenticatedUserId)) {
            throw new UserNotInGroupException();
        }

        group.getUsers().add(user);
        groupRepository.save(group);

        return group;
    }
}
