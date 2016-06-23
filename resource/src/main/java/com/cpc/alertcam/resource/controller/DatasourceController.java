package com.cpc.alertcam.resource.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.cpc.alertcam.resource.model.Datasource;
import com.cpc.alertcam.resource.repository.DatasourceRepository;

@Controller
@RequestMapping("/surveillance")
public class DatasourceController {

	private DatasourceRepository datasourceRepository;
	
	@Autowired
	public DatasourceController(DatasourceRepository datasourceRepository) {
		this.datasourceRepository = datasourceRepository;
	}
	
	@RequestMapping(value = "/surveillance", method = RequestMethod.GET)
	public void getAllDatasources() {
		
	}
	
	@RequestMapping(value = "/surveillance/{id}", method = RequestMethod.GET)
	public void getDatasource(@PathVariable("id") Long id) {
		
	}
	
	@RequestMapping(value = "/surveillance", method = RequestMethod.POST)
	public void createDatasource(@RequestBody Datasource datasource) {
		
	}
	
	@RequestMapping(value = "/surveillance/{id}", method = RequestMethod.PUT)
	public void updateDatasource(@PathVariable("id") Long id, @RequestBody Datasource datasource) {
		
	}
	
	@RequestMapping(value = "/surveillance/{id}", method = RequestMethod.DELETE)
	public void deleteDatasource(@PathVariable("id") Long id) {
		
	}
}
