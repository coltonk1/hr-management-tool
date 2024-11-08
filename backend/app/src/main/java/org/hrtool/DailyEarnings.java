package org.hrtool;

import java.time.LocalDateTime;

// Calculates an employee's pay for a single work day
public class DailyEarnings
{
    // Placeholder for hourly wage
    private static double hourly = 25; // 

    // Placeholder for how long the employee worked
    private static final int WORKDAY_TIME = 28800; 
    
    // TODO: Add logic for handling benefits

    // Calculate wage in terms of $ per second
    public static double preciseWage(double hour)
    {
        double minute = hour / 60;
        double second = minute / 60;
        return second;
    }
    
   // This function should be called after an employee clocks out 
    public static double payDay()
    {
        /* Clock in/out time placeholders. 
        * In actual implementation, these will be created and stored when the user make the request to do so. */

        // LocalDateTime clockIn = LocalDateTime.parse("2024-10-17T21:00:00.00");
        LocalDateTime clockIn = Clock.timeStamp();
        LocalDateTime clockOut = Clock.addTime(clockIn,WORKDAY_TIME);

        // How long did the employee work?
        long workTime = Clock.workTime(clockIn,clockOut); 
        System.out.println("Total time worked in seconds: " + (workTime)); // debugging; remove later

        // Calculate multiplier
        double wage = preciseWage(hourly);
        System.out.println("Wage multiplier: " + wage);

        // $$$ earned!
        double MONEY$$$ = (workTime * wage);

        // Round to 2 decimal places
        MONEY$$$ = Math.round(MONEY$$$ * 100);
        MONEY$$$ = MONEY$$$ / 100;
        
        System.out.println("You got paid $" + MONEY$$$);

        return MONEY$$$;

    }
    
}