package com.cpc.alertcam.resource;

import java.util.UUID;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ResourceApplication /*extends WebSecurityConfigurerAdapter*/ {

	@RequestMapping("/")
	/*@CrossOrigin(origins="*", maxAge=3600,
					allowedHeaders={"x-auth-token", "x-requested-with"})*/
	public Message welcome() {
		return new Message("Mael");
	}
	
	public static void main(String[] args) {
		SpringApplication.run(ResourceApplication.class, args);
	}
	
	/*
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.httpBasic().disable();
		http.authorizeRequests().anyRequest().authenticated();
	}*/
}


class Message {
	private String id = UUID.randomUUID().toString();
	private String content;

	Message() {
	}

	public Message(String content) {
		this.content = content;
	}

	public String getId() {
		return id;
	}

	public String getContent() {
		return content;
	}
}