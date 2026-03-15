package com.setec.backend.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class GreetingController {

    @GetMapping("/api/greeting")
    public String greeting() {
        return "Hello Team!";
    }
}
