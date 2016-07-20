package com.cpc.alertcam.resource.controllers;

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

import com.cpc.alertcam.resource.models.Event;
import com.cpc.alertcam.resource.repositories.EventRepository;

@RestController
public class EventController {

	private EventRepository eventRepository;
	private Logger logger = LoggerFactory.getLogger(EventController.class);
	
	@Autowired
	public EventController(EventRepository eventRepository) {
		this.eventRepository = eventRepository;
	}
	
	@RequestMapping(value = "/users/events", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Event>> getAllEvents() {
		List<Event> events = this.eventRepository.findAll();
		if (events.isEmpty()) {
			return new ResponseEntity<List<Event>>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<List<Event>>(events, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/users/events/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Event> getEvent(@PathVariable("id") Long id) {
		
		return new ResponseEntity<Event>(this.eventRepository.findOne(id), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/users/events", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Event>> createEvent(@RequestBody Event event) {
		this.eventRepository.save(event);
		
		return new ResponseEntity<List<Event>>(this.eventRepository.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/users/events/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Event>> updateEvent(@PathVariable("id") Long id, @RequestBody Event event) {
		Event ds = this.eventRepository.getOne(id);
		ds.update(event);
		
		ds = this.eventRepository.save(ds);
		return new ResponseEntity<List<Event>>(this.eventRepository.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/users/events/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Event>> deleteEvent(@PathVariable("id") Long id) {
		this.eventRepository.delete(id);
		
		return new ResponseEntity<List<Event>>(this.eventRepository.findAll(), HttpStatus.OK);
	}
	
}
