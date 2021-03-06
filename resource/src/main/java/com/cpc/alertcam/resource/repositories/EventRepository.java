package com.cpc.alertcam.resource.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cpc.alertcam.resource.models.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

}
