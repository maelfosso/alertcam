package com.cpc.alertcam.resource.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cpc.alertcam.resource.models.Datasource;
import com.cpc.alertcam.resource.models.Event;

public interface DatasourceRepository extends JpaRepository<Datasource, Long> { 
	List<Datasource> findByEvent(Event event);
}
