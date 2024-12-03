package org.hrtool.repository;

import java.util.List;
import java.util.Optional;

import org.hrtool.tables.Employee;
import org.hrtool.tables.HoursHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeesRepo extends JpaRepository<Employee, Long> {
    // @Query("SELECT b FROM Business b WHERE b.business_id = ?1")
    // Optional<Business> findByBusiness_Id(Long id);

    // Optional<Business> findByName(String name);

    @Query("SELECT e.business_id FROM Employee e WHERE e.user_id = ?1")
    List<Long> findEmployeeBusiness(long user_id);

    @Query("SELECT e FROM Employee e WHERE e.user_id = ?1 AND e.business_id = ?2")
    Optional<Employee> findByUserIdAndBusiness(long user_id, long business_id);

    @Query("SELECT e FROM Employee e WHERE e.id = ?1 AND e.business_id = ?2")
    Optional<Employee> findByIdAndBusiness(long user_id, long business_id);

    @Query(value = "SELECT jsonb_agg(weekly_hours) AS recent_hours " +
            "FROM (" +
            "    SELECT jsonb_build_object(" +
            "        'week', date_trunc('week', (hours_entry->>'date')::DATE + interval '1 week'), " +
            "        'total_hours', sum((hours_entry->>'hours')::int) " +
            "    ) AS weekly_hours " +
            "    FROM employees, " +
            "    LATERAL jsonb_array_elements(hours_data) AS hours_entry " +
            "    WHERE (hours_entry->>'date')::DATE >= NOW() - INTERVAL '26 weeks' " +
            "    AND id = ?1 AND business_id = ?2 " +
            "    GROUP BY date_trunc('week', (hours_entry->>'date')::DATE + interval '1 week') " +
            "    ORDER BY date_trunc('week', (hours_entry->>'date')::DATE + interval '1 week') ASC " +
            "    LIMIT 26" +
            ") AS weekly_data", nativeQuery = true)
    Object getLastHalfYearHours(long user_id, long business_id);

    @Query(value = "SELECT jsonb_agg(weekly_hours) AS recent_hours " +
            "FROM (" +
            "    SELECT jsonb_build_object(" +
            "        'week', date_trunc('week', (hours_entry->>'date')::DATE + interval '1 week'), " +
            "        'total_hours', sum((hours_entry->>'hours')::int) " +
            "    ) AS weekly_hours " +
            "    FROM employees, " +
            "    LATERAL jsonb_array_elements(hours_data) AS hours_entry " +
            "    WHERE (hours_entry->>'date')::DATE >= NOW() - INTERVAL '4 weeks' " +
            "    AND business_id = ?1 " +
            "    GROUP BY date_trunc('week', (hours_entry->>'date')::DATE + interval '1 week') " +
            "    ORDER BY date_trunc('week', (hours_entry->>'date')::DATE + interval '1 week') ASC " +
            "    LIMIT 4" +
            ") AS weekly_data", nativeQuery = true)
    Object getLastFourWeeksHours(long business_id);

    @Query(value = "SELECT jsonb_agg(event) AS upcoming_events\n" + //
            "FROM (\n" + //
            "    SELECT event\n" + //
            "    FROM employees,\n" + //
            "    LATERAL jsonb_array_elements(events) AS event\n" + //
            "    WHERE (event->>'on_date')::DATE >= CURRENT_DATE\n" + //
            "    AND user_id = ?1 AND business_id = ?2" +
            "    ORDER BY (event->>'on_date')::DATE ASC\n" +
            ") AS filtered_events;", nativeQuery = true)
    Object getUserEvents(long user_id, long business_id);

    @Query(value = "SELECT jsonb_agg(event) AS upcoming_events\n" + //
            "FROM (\n" + //
            "    SELECT event\n" + //
            "    FROM employees,\n" + //
            "    LATERAL jsonb_array_elements(events) AS event\n" + //
            "    WHERE (event->>'on_date')::DATE >= CURRENT_DATE\n" + //
            "    AND id = ?1 AND business_id = ?2" +
            "    ORDER BY (event->>'on_date')::DATE ASC\n" +
            ") AS filtered_events;", nativeQuery = true)
    Object getUserEventsById(long user_id, long business_id);

    @Query(value = "SELECT jsonb_agg(event) AS monthly_events\n" +
            "FROM (\n" +
            "    SELECT event\n" +
            "    FROM employees,\n" +
            "    LATERAL jsonb_array_elements(events) AS event\n" +
            "    WHERE EXTRACT(MONTH FROM (event->>'on_date')::DATE) = EXTRACT(MONTH FROM ?3)\n" +
            "    AND EXTRACT(YEAR FROM (event->>'on_date')::DATE) = EXTRACT(YEAR FROM ?3)\n" +
            "    AND user_id = ?1 AND business_id = ?2\n" +
            ") AS filtered_events;", nativeQuery = true)
    Object getUserEventsByMonth(long user_id, long business_id, String date);

    // @Query("SELECT u.username FROM Users u WHERE u.id = ?1")
    // String findUsernameById(Long id);

}
