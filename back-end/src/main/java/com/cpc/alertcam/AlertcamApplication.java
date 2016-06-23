package com.cpc.alertcam;

import java.security.Principal;
import java.util.Collections;
import java.util.Map;
import javax.servlet.http.HttpSession;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@EnableZuulProxy
@EnableJpaRepositories(basePackages="domain")
@EntityScan(basePackages="domain")
public class AlertcamApplication {
	
	
	/*
	@RequestMapping("/resource")
	public Map<String, Object> home() {
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("id", UUID.randomUUID().toString());
		model.put("content", "Hello World !!!");
		
		return model;
	}*/
	
	@RequestMapping("/user")
	public Principal user(Principal user) {
		return user;
	}
	/*
	@Configuration
	@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
	protected static class SecurityConfiguration extends WebSecurityConfigurerAdapter {
		
		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http.httpBasic()
				.and()
					.logout()
				.and()
					.authorizeRequests()
						.antMatchers(
							"/index.html",
							"/modules/welcome/welcome.html", 
							"/modules/welcome/about.html",
							"/modules/welcome/contact.html",
							"/modules/welcome/login.html").permitAll()
						.anyRequest().authenticated()
				.and()
					.addFilterAfter(new CsrfHeaderFilter(), CsrfFilter.class)
				.csrf()
					.csrfTokenRepository(csrfTokenRepository())
			;
			
		}
		
		private CsrfTokenRepository csrfTokenRepository() {
			HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
			repository.setHeaderName("X-XSRF-TOKEN");
			
			return repository;
		}
	}*/
	
	@RequestMapping("/token")
	@ResponseBody
	public Map<String, String> token(HttpSession session) {
		return Collections.singletonMap("token", session.getId());
	}
	
	public static void main(String[] args) {
		SpringApplication.run(AlertcamApplication.class, args);
	}
}
