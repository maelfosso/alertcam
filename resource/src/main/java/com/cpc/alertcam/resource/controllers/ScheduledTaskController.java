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

import com.cpc.alertcam.resource.models.ScheduledTask;
import com.cpc.alertcam.resource.repositories.ScheduledTaskRepository;

@RestController
public class ScheduledTaskController {

	private ScheduledTaskRepository scheduledTaskRepository;
	
	@Autowired
	public ScheduledTaskController(ScheduledTaskRepository scheduledTaskRepository) {
		this.scheduledTaskRepository = scheduledTaskRepository;
	}

	@RequestMapping(value = "/tasks-management/scheduled-tasks", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ScheduledTask>> getAllScheduledTasks() {
		List<ScheduledTask> scheduledTasks = this.scheduledTaskRepository.findAll();
		if (scheduledTasks.isEmpty()) {
			return new ResponseEntity<List<ScheduledTask>>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<List<ScheduledTask>>(scheduledTasks, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/tasks-management/scheduled-tasks/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ScheduledTask> getScheduledTask(@PathVariable Long id) {
		
		return new ResponseEntity<ScheduledTask>(this.scheduledTaskRepository.getOne(id), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/tasks-management/scheduled-tasks", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ScheduledTask> createScheduledTask(@RequestBody ScheduledTask scheduledTask) {
		this.scheduledTaskRepository.save(scheduledTask);
		
		return new ResponseEntity<ScheduledTask>(scheduledTask, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/tasks-management/scheduled-tasks/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ScheduledTask>> updateScheduledTask(@PathVariable Long id, @RequestBody ScheduledTask scheduledTask) {
		ScheduledTask s = this.scheduledTaskRepository.getOne(id);
		s.update(scheduledTask);
		
		s = this.scheduledTaskRepository.save(s);
		
		return new ResponseEntity<List<ScheduledTask>>(this.scheduledTaskRepository.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/tasks-management/scheduled-tasks/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ScheduledTask>> deleteScheduledTask(@PathVariable Long id) {
		this.scheduledTaskRepository.delete(id);
		
		return new ResponseEntity<List<ScheduledTask>>(this.scheduledTaskRepository.findAll(), HttpStatus.OK);
	}
}
