package com.cpc.alertcam.resource.controllers;

import java.sql.DriverManager;
import java.sql.ResultSet;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cpc.alertcam.resource.models.Axis;
import com.cpc.alertcam.resource.models.Dashboard;
import com.cpc.alertcam.resource.models.Datasource;
import com.cpc.alertcam.resource.models.Datum;
import com.cpc.alertcam.resource.models.Graphic;
import com.cpc.alertcam.resource.models.Variable;
import com.cpc.alertcam.resource.repositories.DashboardRepository;
import com.cpc.alertcam.resource.repositories.EventRepository;

@RestController
public class DashboardController {

	DashboardRepository dashboardRepository;
	EventRepository eventRepository;
	
	Logger logger = LoggerFactory.getLogger(DashboardController.class);
	
	@Autowired
	public DashboardController(DashboardRepository dashboardRepository, EventRepository eventRepository) {
		this.dashboardRepository = dashboardRepository;
		this.eventRepository = eventRepository;
	}
	
	@RequestMapping(value = "/dashboards/{eventId}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Dashboard> createDashboard(@PathVariable("eventId") Long event, @RequestBody Dashboard dashboard) {
		dashboard.setEvent(this.eventRepository.findOne(event));
		
		logger.debug("\n\n********************--------------------****************\n\n");
		logger.debug(dashboard.getGraphic().toString());
		logger.debug(dashboard.toString());
		logger.debug("\n\n********************--------------------****************\n\n");
		/*Axis xAxis = dashboard.getGraphic().getxAxis();
		xAxis.setGraphic(dashboard.getGraphic());
		*/
		Dashboard db = this.dashboardRepository.save(dashboard);
		
		return new ResponseEntity<Dashboard>(db, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/dashboards", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Dashboard>> getAllDashboard() { // @PathVariable("event") Long event) {
		List<Dashboard> dashboards = this.dashboardRepository.findAll(); // findByEvent(event);
		
		for(Dashboard dashboard: dashboards) {
			Graphic graphic = dashboard.getGraphic();
			Datasource datasource = graphic.getDatasource();
			Variable xVar = graphic.getxAxis().getVariable(),
						yVar = graphic.getyAxis().getVariable(),
						zVar = (graphic.getzAxis() == null ? null : graphic.getzAxis().getVariable());
			
			String select = "SELECT " + xVar.getName() + ", " + yVar.getName() + (zVar != null ? ", " + zVar.getName() : "");
			String from = "FROM " + xVar.getParent();
			String query = select + " " + from + " LIMIT 1000" ;
			
			logger.debug(select);
			logger.debug(from);
			logger.debug(query);
			
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
				Statement stmt = connection.createStatement();
				ResultSet rs = stmt.executeQuery(query);
				List<Datum> data = new ArrayList<Datum>();
				while (rs.next()) {
					String x = rs.getString(xVar.getName());
					String y = rs.getString(yVar.getName());
					String z = (zVar == null ? null : rs.getString(zVar.getName()));
					
					Datum datum = new Datum(x, y, z); 
					data.add(datum);
				}
				
				graphic.setData(data);
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
		}
		
		return new ResponseEntity<List<Dashboard>>(dashboards, HttpStatus.OK);
	}
	
}

