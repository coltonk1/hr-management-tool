package org.hrtool.repository;

import java.util.List;
import java.util.Optional;

import org.hrtool.tables.Business;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessRepo extends JpaRepository<Business, Long> {
    @Query("SELECT b FROM Business b WHERE b.business_id = ?1")
    Optional<Business> findByBusiness_Id(Long id);

    Optional<Business> findByName(String name);

    // @Query("SELECT u.username FROM Users u WHERE u.id = ?1")
    // String findUsernameById(Long id);

}
