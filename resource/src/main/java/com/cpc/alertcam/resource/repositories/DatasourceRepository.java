package com.cpc.alertcam.resource.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cpc.alertcam.resource.models.Datasource;

public interface DatasourceRepository extends JpaRepository<Datasource, Long> { 

}
