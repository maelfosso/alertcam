package com.cpc.alertcam.resource.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cpc.alertcam.resource.models.Datasource;
import com.cpc.alertcam.resource.models.Indicator;

public interface IndicatorRepository extends JpaRepository<Indicator, Long> {
	List<Indicator> findByDatasource(Datasource ds);
}
