package com.cpc.alertcam.resource.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "indicators")
public class Indicator {

	public enum TypeOfIndicator {
		THRESHOLD, RANGE
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long Id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "description")
	private String description;
	
	@ManyToOne
	@JoinColumn(name = "variable_id", referencedColumnName = "id")
	private Variable variable;
	
	@Enumerated(EnumType.STRING)
	private TypeOfIndicator type;
	
	/*@ManyToOne
	@JoinColumn(name = "graphic_id", referencedColumnName = "id")
	private Graphic graphic;*/
	
	@ManyToOne
	@JoinColumn(name = "datasource_id", referencedColumnName = "id")
	private Datasource datasource;	
	
	
	public Indicator() {}

	public Long getId() {
		return Id;
	}

	public void setId(Long id) {
		Id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public TypeOfIndicator getType() {
		return type;
	}

	public void setType(TypeOfIndicator type) {
		this.type = type;
	}

	public Variable getVariable() {
		return variable;
	}

	public void setVariable(Variable variable) {
		this.variable = variable;
	}

	/*public Graphic getGraphic() {
		return graphic;
	}

	public void setGraphic(Graphic graphic) {
		this.graphic = graphic;
	}*/

	public Datasource getDatasource() {
		return datasource;
	}

	public void setDatasource(Datasource datasource) {
		this.datasource = datasource;
	}
	
}
