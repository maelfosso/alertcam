package com.cpc.alertcam.resource.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "scripts")
public class Script {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "last_updated")
	private Date lastUpdated;
	
	@ManyToOne
	@JoinColumn(name = "event_id", referencedColumnName = "id")
	private Event associatedDisease;
	
	@Column(name = "script_type")
	private String scriptType;

	@Column(name = "description")
	private String description;
	
	@Column(name = "file_name")
	private String fileName;
	
	public Script() {
		this.lastUpdated = new Date();
	}
	
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

	public Date getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(Date lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

	public Event getAssociatedDisease() {
		return associatedDisease;
	}

	public void setAssociatedDisease(Event associatedDisease) {
		this.associatedDisease = associatedDisease;
	}

	public String getScriptType() {
		return scriptType;
	}

	public void setScriptType(String scriptType) {
		this.scriptType = scriptType;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getFileName() {
		return this.fileName;
	}
	
	public void setFileName(String file) {
		this.fileName = file;
	}
	
	@Override
	public String toString() {
		return "Script [id=" + id + ", name=" + name + ", lastUpdated=" + lastUpdated + ", associatedDisease="
				+ associatedDisease.getName() + ", scriptType=" + scriptType + ", description=" + description + ", fileName=" + fileName
				+ "]";
	}

	public void update(Script script) {
		this.name = script.getName();
		this.associatedDisease = script.getAssociatedDisease();
		
		this.lastUpdated = new Date();
		this.fileName = script.getFileName();
		this.scriptType = script.getScriptType();
	}
	
}
