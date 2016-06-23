package com.cpc.alertcam.resource.repository;

import com.cpc.alertcam.resource.model.Datasource;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DatasourceRepository extends JpaRepository<Datasource, Long> { 

}
