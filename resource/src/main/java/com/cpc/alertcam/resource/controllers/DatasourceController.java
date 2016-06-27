package com.cpc.alertcam.resource.controllers;

import java.util.List;

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
import com.cpc.alertcam.resource.repositories.DatasourceRepository;

@RestController
// @RequestMapping("/surveillance/data-sources")
public class DatasourceController {

	private DatasourceRepository datasourceRepository;
	
	@Autowired
	public DatasourceController(DatasourceRepository datasourceRepository) {
		this.datasourceRepository = datasourceRepository;
	}
	
	@RequestMapping(value = "/surveillance/data-sources", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Datasource>> getAllDatasources() {
		List<Datasource> datasources = this.datasourceRepository.findAll();
		if (datasources.isEmpty()) {
			return new ResponseEntity<List<Datasource>>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<List<Datasource>>(datasources, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/surveillance/data-sources/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Datasource> getDatasource(@PathVariable("id") Long id) {
		
		return new ResponseEntity<Datasource>(this.datasourceRepository.getOne(id), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/surveillance/data-sources", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Datasource>> createDatasource(@RequestBody Datasource datasource) {
		this.datasourceRepository.save(datasource);
		
		return new ResponseEntity<List<Datasource>>(this.datasourceRepository.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/surveillance/data-sources/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Datasource>> updateDatasource(@PathVariable("id") Long id, @RequestBody Datasource datasource) {
		Datasource ds = this.datasourceRepository.getOne(id);
		ds.update(datasource);
		
		ds = this.datasourceRepository.save(ds);
		return new ResponseEntity<List<Datasource>>(this.datasourceRepository.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/surveillance/data-sources/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Datasource>> deleteDatasource(@PathVariable("id") Long id) {
		this.datasourceRepository.delete(id);
		
		return new ResponseEntity<List<Datasource>>(this.datasourceRepository.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/surveillance/data-sources/test-connexion", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public void testDatasourceConnexion(@RequestBody Datasource datasource) {
		
	}
}
