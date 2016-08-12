package com.cpc.alertcam.resource.controllers;

import java.util.ArrayList;
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
import com.cpc.alertcam.resource.models.Indicator;
import com.cpc.alertcam.resource.models.Variable;
import com.cpc.alertcam.resource.repositories.DatasourceRepository;
import com.cpc.alertcam.resource.repositories.IndicatorRepository;

@RestController
public class IndicatorController {

	private IndicatorRepository indicatorRepository;
	private DatasourceRepository datasourceRepository;
	
	@Autowired
	public IndicatorController(IndicatorRepository indicatorRepository, DatasourceRepository datasourceRepository) {
		this.indicatorRepository = indicatorRepository;
		this.datasourceRepository = datasourceRepository;
	}
	
	@RequestMapping(value = "/surveillance/data-sources/{id}/indicators", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Indicator>> getAllIndicators(@PathVariable Long id) {
		Datasource datasource = this.datasourceRepository.findOne(id);
		List<Indicator> indicators = this.indicatorRepository.findByDatasource(datasource);

		if (indicators.isEmpty()) {
			return new ResponseEntity<List<Indicator>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Indicator>>(indicators, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/surveillance/data-sources/{datasource}/indicators/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Indicator> getIndicator(@PathVariable("datasource") Long datasource, @PathVariable("id") Long id) {
		Indicator indicator = indicatorRepository.findOne(id);
		
		return new ResponseEntity<Indicator>(indicator, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/surveillance/data-sources/{datasource}/indicators", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Indicator>> createIndicators(@PathVariable("datasource") Long datasource, @RequestBody ArrayList<Indicator> indicators) {
		List<Indicator> inds = this.indicatorRepository.save(indicators);
		
		return new ResponseEntity<List<Indicator>>(inds, HttpStatus.OK);
	}
}
