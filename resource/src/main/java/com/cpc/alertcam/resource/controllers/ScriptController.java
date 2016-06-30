package com.cpc.alertcam.resource.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cpc.alertcam.resource.models.Datasource;
import com.cpc.alertcam.resource.models.Message;
import com.cpc.alertcam.resource.models.Script;
import com.cpc.alertcam.resource.repositories.ScriptRepository;

@RestController
public class ScriptController {

	private ScriptRepository scriptRepository;
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	public static String ROOT = "upload-dir";
	
	private final ResourceLoader resourceLoader;
	
	@Autowired
	public ScriptController(ScriptRepository scriptRepository, ResourceLoader resourceLoader) {
		this.scriptRepository = scriptRepository;
		this.resourceLoader = resourceLoader;
	}

	@RequestMapping(value = "/tasks-management/scripts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Script>> getAllScripts() {
		List<Script> scripts = this.scriptRepository.findAll();
		if (scripts.isEmpty()) {
			return new ResponseEntity<List<Script>>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<List<Script>>(scripts, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/tasks-management/scripts/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Script> getScript(@PathVariable Long id) {
		
		return new ResponseEntity<Script>(this.scriptRepository.getOne(id), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/tasks-management/scripts", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Message> createScript(@RequestParam("file") MultipartFile file, Script script) {
		// Script s = new Script(); // this.scriptRepository.save(script);
		logger.info(script.toString());
		logger.info(file.getOriginalFilename() + " --- " + file.getContentType());
		
		if (!file.isEmpty()) {
			try {
				String filename = file.getOriginalFilename();
				
				if (Paths.get(ROOT, filename).toFile().exists()) {
					return new ResponseEntity<Message>(new Message("A file with the same name already exists"), HttpStatus.BAD_REQUEST);
				} else {
					Files.copy(file.getInputStream(), Paths.get(ROOT, file.getOriginalFilename()));
				}
			} catch(Exception e) {
				logger.error(e.getMessage());
				
				return new ResponseEntity<Message>(new Message(e.getMessage()), HttpStatus.BAD_REQUEST);
			}
			
			Script s = this.scriptRepository.save(script);
		}
		
		return new ResponseEntity<Message>(new Message("OK"), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/tasks-management/scripts/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Script>> updateScript(@PathVariable Long id, @RequestBody Script script) {
		Script s = this.scriptRepository.getOne(id);
		s.update(script);
		
		s = this.scriptRepository.save(s);
		
		return new ResponseEntity<List<Script>>(this.scriptRepository.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/tasks-management/scripts/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Script>> deleteScript(@PathVariable Long id) {
		this.scriptRepository.delete(id);
		
		return new ResponseEntity<List<Script>>(this.scriptRepository.findAll(), HttpStatus.OK);
	}
}
