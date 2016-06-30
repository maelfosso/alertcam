package com.cpc.alertcam.resource.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cpc.alertcam.resource.models.ScheduledTask;

public interface ScheduledTaskRepository extends JpaRepository<ScheduledTask, Long> {
	
}
