package org.hrtool;

import java.time.LocalDateTime;
import static java.time.temporal.ChronoUnit.SECONDS;

public class Clock
{
    // Temporary constants for testing 
    private static final int SECONDS_IN_DAY = 86400;

    // Returns current time for clock in/out
    public static LocalDateTime timeStamp()
    {
        return LocalDateTime.now();
    }

    // Add an amount of seconds to a time (used for testing the math)
    public static LocalDateTime addTime(LocalDateTime initialTime, long secondsToAdd)
    {
        return initialTime.plusSeconds(secondsToAdd);
    }

    // Return time (in seconds) between employee's clock in and clock out time
    public static long workTime (LocalDateTime clockIn, LocalDateTime clockOut)
    {
       return Math.abs(SECONDS.between(clockIn,clockOut));
    }

}