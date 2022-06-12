package com.galiana.tfg.repository;

import com.galiana.tfg.api.Data.Member;
import com.galiana.tfg.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface GroupRepository extends JpaRepository<Group, Long> {
    Set<Group> findByUsers_id(Long userId);

    boolean existsByIdAndUsers_id(Long groupId, Long userId);

    @Query(
            "SELECT new com.galiana.tfg.api.Data.Member (u.id, u.email, COALESCE(SUM(s.amount), 0)) " +
                    "FROM Group g "+
                    "JOIN g.users u " +
                    "LEFT JOIN  Spending s ON s.group.id = g.id AND s.user.id = u.id " +
                    "WHERE g.id = ?1 " +
                    "GROUP BY u.id"
    )
    Set<Member> findMembersByGroupId(Long id);
}
