package org.hrtool.repository;

import java.util.Optional;

import org.hrtool.tables.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

// in this case, users is the table and long is the datatype of the primary key
public interface UserRepository extends JpaRepository<Users, Long> {
    // can use @Query("query"), however jpa has some basic ones, this is equivalent
    // to 'SELECT * FROM users WHERE username = $1';
    Optional<Users> findByUsername(String username);

    @Query("SELECT u.username FROM Users u WHERE u.id = ?1")
    String findUsernameById(Long id);
}
