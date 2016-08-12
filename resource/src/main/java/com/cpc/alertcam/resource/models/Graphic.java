package com.cpc.alertcam.resource.models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "graphics")
public class Graphic {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	// Title of the graphic not the type of graphic. 
	// Next we will create a type attribute
	@Column(name = "name")
	private String name;
	
	@Column(name = "description")
	private String descritption;
	
	@OneToOne(cascade = CascadeType.ALL, optional = false, fetch = FetchType.EAGER)
	private Axis xAxis;
	
	@OneToOne(cascade = CascadeType.ALL, optional = false, fetch = FetchType.EAGER)
	private Axis yAxis;
	
	@OneToOne(cascade = CascadeType.ALL, optional = true, fetch = FetchType.EAGER)
	private Axis zAxis;
	
	@ManyToOne(cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH}, optional = false, fetch = FetchType.EAGER)
	private Datasource datasource;
	
	@Transient
	private List<Datum> data = new ArrayList<Datum>();
	
	/*@OneToMany(fetch = FetchType.LAZY, mappedBy="graphic", cascade = CascadeType.ALL)
	private List<Parameter> parameters;*/
	
	/*@OneToMany(fetch = FetchType.LAZY, mappedBy="graphic", cascade = CascadeType.ALL)
	private List<Axis> axis;*/
	
	public Graphic() {
		
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

	public String getDescritption() {
		return descritption;
	}

	public void setDescritption(String descritption) {
		this.descritption = descritption;
	}

	public Axis getxAxis() {
		return xAxis;
	}

	public void setxAxis(Axis xAxis) {
		this.xAxis = xAxis;
	}

	public Axis getyAxis() {
		return yAxis;
	}

	public void setyAxis(Axis yAxis) {
		this.yAxis = yAxis;
	}

	public Axis getzAxis() {
		return zAxis;
	}

	public void setzAxis(Axis zAxis) {
		this.zAxis = zAxis;
	}

	public Datasource getDatasource() {
		return this.datasource;
	}
	
	public void setDatasource(Datasource datasource) {
		this.datasource = datasource;
	}
	
	public List<Datum> getData() {
		return this.data;
	}
	
	public void setData(List<Datum> data) {
		this.data = data;
	}
	@Override
	public String toString() {
		return "Graphic [Id=" + id + ", name=" + name + ", descritption=" + descritption + ", xAxis=" + xAxis
				+ ", yAxis=" + yAxis + ", zAxis=" + zAxis + "]";
	}
		
}
