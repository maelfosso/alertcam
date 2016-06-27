package com.cpc.alertcam.resource;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ResourceApplication /*extends WebSecurityConfigurerAdapter*/ {
	
	public static void main(String[] args) {
		SpringApplication.run(ResourceApplication.class, args);
	}
	
}

