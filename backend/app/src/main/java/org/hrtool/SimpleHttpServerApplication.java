package org.hrtool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class SimpleHttpServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(SimpleHttpServerApplication.class, args);
    }
}
