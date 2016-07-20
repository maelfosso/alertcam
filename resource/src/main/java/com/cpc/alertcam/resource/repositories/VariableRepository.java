package com.cpc.alertcam.resource.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cpc.alertcam.resource.models.Datasource;
import com.cpc.alertcam.resource.models.Variable;

public interface VariableRepository extends JpaRepository<Variable, Long> {
	List<Variable> findByDatasource(Datasource ds);
}
