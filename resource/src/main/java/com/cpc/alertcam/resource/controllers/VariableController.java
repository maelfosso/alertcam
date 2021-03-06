package com.cpc.alertcam.resource.controllers;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cpc.alertcam.resource.models.Datasource;
import com.cpc.alertcam.resource.models.Option;
import com.cpc.alertcam.resource.models.Variable;
import com.cpc.alertcam.resource.repositories.DatasourceRepository;
import com.cpc.alertcam.resource.repositories.VariableRepository;

@RestController
public class VariableController {
	
	VariableRepository variableRepository;
	DatasourceRepository datasourceRepository;
	Logger logger = LoggerFactory.getLogger(VariableController.class);
	
	
	@Autowired
	public VariableController(VariableRepository variableRepository, DatasourceRepository datasourceRepository) {
		this.variableRepository = variableRepository;
		this.datasourceRepository = datasourceRepository;
	}
	
	@RequestMapping(value = "/surveillance/data-sources/{datasource}/variables", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Variable>> createVariables(@PathVariable("datasource") Long datasource, @RequestBody ArrayList<Variable> variables) {
		List<Variable> vars = new ArrayList<Variable>();
		for(Variable v: variables) {
			v.setDatasource(this.datasourceRepository.findOne(datasource));
			
			logger.debug(v.toString());
			for(Option o: v.getOptions()) {
				o.setVariable(v);
			}
			
			vars.add(v);
		}
		vars = this.variableRepository.save(vars);
		
		return new ResponseEntity<List<Variable>>(vars, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/surveillance/data-sources/{id}/variables", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Variable>> getAllVariables(@PathVariable("id") Long id) {
		Datasource datasource = this.datasourceRepository.findOne(id);
		
		List<Variable> variables = this.variableRepository.findByDatasource(datasource);
		
		return new ResponseEntity<List<Variable>>(variables, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/surveillance/data-sources/{id}/variables", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Variable>> updateVariables(@PathVariable("id") Long id, @RequestBody ArrayList<Variable> newVariables,
						@RequestBody ArrayList<Variable> oldVariables) {
		for(Variable v: oldVariables) {
			this.variableRepository.delete(v);
		}
		
		for(Variable v: newVariables) {
			this.variableRepository.save(v);
		}
		
		return null;
	}
	
	
}
