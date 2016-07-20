package com.cpc.alertcam.resource.controllers;

import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cpc.alertcam.resource.ResourceApplication;
import com.cpc.alertcam.resource.models.Datasource;
import com.cpc.alertcam.resource.models.Event;
import com.cpc.alertcam.resource.models.Message;
import com.cpc.alertcam.resource.models.Variable;
import com.cpc.alertcam.resource.repositories.DatasourceRepository;
import com.cpc.alertcam.resource.repositories.EventRepository;

@RestController
public class DatasourceController {

	private DatasourceRepository datasourceRepository;
	private EventRepository eventRepository;
	private Logger logger = LoggerFactory.getLogger(DatasourceController.class);
	
	@Autowired
	public DatasourceController(DatasourceRepository datasourceRepository, EventRepository eventRepository) {
		this.datasourceRepository = datasourceRepository;
		this.eventRepository = eventRepository;
	}

	@RequestMapping(value = "/surveillance/data-sources", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Datasource>> getAllDatasources() {
		List<Datasource> datasources = this.datasourceRepository.findAll();
		if (datasources.isEmpty()) {
			return new ResponseEntity<List<Datasource>>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<List<Datasource>>(datasources, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/surveillance/data-sources/events/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Datasource>> getAllDatasourcesEvent(@PathVariable("id") Long id) {
		Event event = this.eventRepository.findOne(id);
		logger.debug(event.toString());
		List<Datasource> datasources = this.datasourceRepository.findByEvent(event);
		if (datasources.isEmpty()) {
			return new ResponseEntity<List<Datasource>>(HttpStatus.NO_CONTENT);
		}
		logger.debug(String.valueOf(datasources.size()));
		return new ResponseEntity<List<Datasource>>(datasources, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/surveillance/data-sources/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Datasource> getDatasource(@PathVariable("id") Long id) {
		
		return new ResponseEntity<Datasource>(this.datasourceRepository.findOne(id), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/surveillance/data-sources", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Datasource> createDatasource(@RequestBody Datasource datasource) {
		Datasource ds = this.datasourceRepository.save(datasource);
		
		return new ResponseEntity<Datasource>(ds, HttpStatus.OK);
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
	public ResponseEntity<Message> testConnexionToDatasource(@RequestBody Datasource datasource) {
		
		try {
			if (datasource.getSourceType() == "MySQL") {
				Class.forName("com.mysql.jdbc.Driver");
			}
			java.sql.Connection connection = DriverManager.getConnection(
												"jdbc:mysql://" + datasource.getDbServer() + "/" + datasource.getDbName(), 
												datasource.getDbUsername(), 
												datasource.getDbPassword()
											);
			logger.debug(connection.getSchema());
			
			return new ResponseEntity<Message>(HttpStatus.OK);
		} catch (ClassNotFoundException e) {
			// e.printStackTrace();
			logger.error("ClassNotFoundException .....");
			
			return new ResponseEntity<Message>(new Message("FAILED"), HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (SQLException e) {
			// e.printStackTrace();
			logger.error(e.getMessage());
			
			return new ResponseEntity<Message>(new Message(e.getMessage()), HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	@RequestMapping(value = "/surveillance/data-sources/{id}/columns", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Variable>> getAllDatasourceColumns(@PathVariable("id") Long id) {
		Datasource datasource = this.datasourceRepository.getOne(id);
		List<Variable> variables = new ArrayList<Variable>();
		java.sql.Connection connection = null;
		
		try {
			if (datasource.getSourceType() == "MySQL") {
				Class.forName("com.mysql.jdbc.Driver");
			}
			connection = DriverManager.getConnection(
												"jdbc:mysql://" + datasource.getDbServer() + "/" + datasource.getDbName(), 
												datasource.getDbUsername(), 
												datasource.getDbPassword()
											);
			
			List<String> tables = new ArrayList<String>();
			java.sql.DatabaseMetaData md = connection.getMetaData();
			ResultSet rs = md.getTables(null, null, "%", null);
			while (rs.next()) {
				tables.add(rs.getString(3));				
			}
			
			for(String table: tables) {
				ResultSet ts = md.getColumns(null, null, table, null);
				
				while(ts.next()) {
					String name = ts.getString(4);
					String type = ts.getString(6);
					
					variables.add(new Variable(table, name, type));
				}
			}
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			logger.error("ClassNotFoundException .....");
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		} finally {
			
			if (connection != null) {
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		
		return new ResponseEntity<List<Variable>>(variables, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/surveillance/data-sources/{id}/data", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getData(@PathVariable("id") Long id, @RequestBody String query) {
		Datasource datasource = this.datasourceRepository.findOne(id);
		logger.info(datasource.toString());
		java.sql.Connection connection = null;		
		try {
			if (datasource.getSourceType() == "MySQL") {
				Class.forName("com.mysql.jdbc.Driver");
			}
			connection = DriverManager.getConnection(
												"jdbc:mysql://" + datasource.getDbServer() + "/" + datasource.getDbName(), 
												datasource.getDbUsername(), 
												datasource.getDbPassword()
											);
			logger.info("Query .... " + query);
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			ResultSetMetaData rsmd = rs.getMetaData();
			int colsNb = rsmd.getColumnCount();
			logger.info("Column Number == " + String.valueOf(colsNb));
			String line = "[";
			while(rs.next()) {
				if (!rs.isFirst()) {
					line += ",";
				}
				line += "{";
				
				for(int i=0; i < colsNb; i++) {
					line += "\"" + rsmd.getColumnName(i + 1) + "\"";
					line += ":";
					line += "\"" + rs.getString(i + 1) + "\"";
					
					if (i < (colsNb - 1)) {
						line += ",";
					}
				}
				
				line += "}";
			}
			line += "]";
			
			logger.info("Result .... " + line);
			return new ResponseEntity<String>(line, HttpStatus.OK);
		} catch (ClassNotFoundException e) {
			// e.printStackTrace();
			logger.error("ClassNotFoundException ..... " + e.getMessage());
			
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (SQLException e) {
			// e.printStackTrace();
			logger.error("SQLException ..... " + e.getMessage());
			
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		} finally {
			
			if (connection != null) {
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			
		}
	}
}
