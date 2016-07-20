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

import com.cpc.alertcam.resource.models.Dashboard;
import com.cpc.alertcam.resource.repositories.DashboardRepository;

@RestController
public class DashboardController {

	DashboardRepository dashboardRepository;

	@Autowired
	public DashboardController(DashboardRepository dashboardRepository) {
		this.dashboardRepository = dashboardRepository;
	}
	
	@RequestMapping(value = "/dashboards", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Dashboard> createDashboard(@RequestBody Dashboard dashboard) {
		Dashboard db = this.dashboardRepository.save(dashboard);
		
		return new ResponseEntity<Dashboard>(db, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/dashboards", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Dashboard>> getAllDashboard() { // @PathVariable("event") Long event) {
		List<Dashboard> dashboards = this.dashboardRepository.findAll(); // findByEvent(event);
		
		return new ResponseEntity<List<Dashboard>>(dashboards, HttpStatus.OK);
	}
	
}

