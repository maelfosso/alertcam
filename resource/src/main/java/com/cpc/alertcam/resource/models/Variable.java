package com.cpc.alertcam.resource.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "variables")
public class Variable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(name = "type")
	private String type;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "parent")
	private String parent;
	
	@ManyToOne
	@JoinColumn(name = "datasource_id", referencedColumnName = "id")
	Datasource datasource;	
	
	public Variable() {
		
	}
	
	public Variable(String parent, String name, String type) {
		super();
		
		this.type = type;
		this.name = name;
		this.parent = parent;
	}
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public String getParent() {
		return parent;
	}
	public void setParent(String parent) {
		this.parent = parent;
	}
	
	public Datasource getDatasource() {
		return datasource;
	}
	public void setDatasource(Datasource datasource) {
		this.datasource = datasource;
	}

	@Override
	public String toString() {
		return "Variable [id=" + id + ", type=" + type + ", name=" + name + ", parent=" + parent + ", datasource="
				+ datasource + "]";
	}
	
}
