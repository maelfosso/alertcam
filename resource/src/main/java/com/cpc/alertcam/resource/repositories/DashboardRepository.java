package com.cpc.alertcam.resource.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cpc.alertcam.resource.models.Dashboard;

public interface DashboardRepository extends JpaRepository<Dashboard, Long> {
	
	public List<Dashboard> findByEvent(Long event);
	
}
