package com.cpc.alertcam.resource.models;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "axis")
public class Axis implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "display")
	private String display;
	
	@ManyToOne(cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH}, optional = false, fetch = FetchType.EAGER)
	private Variable variable;

	/*@ManyToOne
	@JoinColumn(name = "graphic_id", referencedColumnName = "id")
	private Graphic graphic;
	*/
	public Axis() {
		super();
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

	public String getDisplay() {
		return display;
	}

	public void setDisplay(String display) {
		this.display = display;
	}

	public Variable getVariable() {
		return variable;
	}

	public void setVariable(Variable variable) {
		this.variable = variable;
	}
	/*
	public Graphic getGraphic() {
		return graphic;
	}
	
	public void setGraphic(Graphic graphic) {
		this.graphic = graphic;
	}*/
	
	@Override
	public String toString() {
		return "Axis [Id=" + id + ", name=" + name + ", display=" + display + ", variable=" + variable.toString() + "]";
	}
	
}
