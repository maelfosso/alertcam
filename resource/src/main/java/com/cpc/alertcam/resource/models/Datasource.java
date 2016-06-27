package com.cpc.alertcam.resource.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "datasources")
public class Datasource {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "source_type")
	private String sourceType;
	
	@Column(name = "db_server")
	private String dbServer;
	
	@Column(name = "db_username")
	private String dbUsername;
	
	@Column(name = "db_password")
	private String dbPassword;
	
	@Column(name = "event")
	private String event;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public String getSourceType() {
		return sourceType;
	}
	public void setSourceType(String sourceType) {
		this.sourceType = sourceType;
	}
	
	public String getDbServer() {
		return dbServer;
	}
	public void setDbServer(String dbServer) {
		this.dbServer = dbServer;
	}
	
	public String getDbUsername() {
		return dbUsername;
	}
	public void setDbUsername(String dbUsername) {
		this.dbUsername = dbUsername;
	}
	
	public String getDbPassword() {
		return dbPassword;
	}
	public void setDbPassword(String dbPassword) {
		this.dbPassword = dbPassword;
	}
	
	public String getEvent() {
		return event;
	}
	public void setEvent(String event) {
		this.event = event;
	}
	
	public void update(Datasource ds) {
		this.name = ds.getName();
		this.sourceType = ds.getSourceType();
		this.dbServer = ds.getDbServer();
		this.dbUsername = ds.getDbUsername();
		this.dbPassword = ds.getDbPassword();
		this.event = ds.getEvent();
	}
	
	
}
