package com.cpc.alertcam.resource.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
	
	@Column(name = "axis")
	private String axis;
	
	@ManyToOne /// (cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH})
	@JoinColumn(name = "datasource_id", referencedColumnName = "id")
	Datasource datasource;	
	
	@OneToMany(fetch = FetchType.EAGER, mappedBy="variable", orphanRemoval=true, cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
	@JsonManagedReference
	List<Option> options; // = new ArrayList<Option>();
	
	public Variable() {
	}
	
	public Variable(String parent, String name, String type) {
		super();
		
		this.type = type;
		this.name = name;
		this.parent = parent;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
	
	public String getAxis() {
		return axis;
	}

	public void setAxis(String axis) {
		this.axis = axis;
	}

	public Datasource getDatasource() {
		return datasource;
	}
	public void setDatasource(Datasource datasource) {
		this.datasource = datasource;
	}

	public void addOption(Option option) {
		this.options.add(option);
	}
	
	public List<Option> getOptions() {
		return options;
	}

	public void setOptions(List<Option> options) {
		this.options = options;
	}

	@Override
	public String toString() {
		return "Variable [id=" + id + ", type=" + type + ", name=" + name + ", parent=" + parent + ", axis=" + axis
				+ ", datasource=" + datasource + ", options=" + options + "]";
	}
	
}
