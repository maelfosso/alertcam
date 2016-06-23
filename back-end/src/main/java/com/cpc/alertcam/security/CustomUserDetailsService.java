package com.cpc.alertcam.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cpc.alertcam.models.User;
import com.cpc.alertcam.models.UserRepository;
import com.cpc.alertcam.models.UserRolesRepository;

@Service("customUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

	private final UserRepository mUserRepository;
	private final UserRolesRepository mUserRolesRepository;
	
	@Autowired
	public CustomUserDetailsService(UserRepository userRepository, UserRolesRepository userRolesRepository) {
		this.mUserRepository = userRepository;
		this.mUserRolesRepository = userRolesRepository;
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = mUserRepository.findByUserName(username);
		
		if (user == null) {
			throw new UsernameNotFoundException("No user present with username :-:- " + username);
		} else {
			List<String> userRoles = mUserRolesRepository.findRoleByUserName(username);
			
			return new CustomUserDetails(user, userRoles);
		}
	}

}
