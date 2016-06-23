package com.cpc.alertcam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;

import com.cpc.alertcam.security.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
// @Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
@ComponentScan(basePackageClasses = CustomUserDetailsService.class)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	/*@Autowired
	private UserDetailsService mUserDetailsService;*/
	
	
	/*@Autowired
	public void configureAuthentication(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(mUserDetailsService).passwordEncoder(passwordEncoder());
	}*/
	
	@Bean(name="passwordEncoder")
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {

		/*auth.inMemoryAuthentication().
				withUser("greg").password("turnquist").roles("USER").and().//
				withUser("ollie").password("gierke").roles("USER", "ADMIN");*/
		
		/*auth.userDetailsService(mUserDetailsService)
			.passwordEncoder(passwordEncoder());*/
	}
	
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
	
}
