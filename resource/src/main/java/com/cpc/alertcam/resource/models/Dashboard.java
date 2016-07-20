package com.cpc.alertcam.resource.models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "dashboards")
public class Dashboard {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "graphic")
	private String graphic;
	
	@Column(name = "title")
	private String title;
	
	@ManyToMany
	@JoinTable(name = "dashboards_variables",
		joinColumns = @JoinColumn(name = "dashboard_id", referencedColumnName = "id"),
		inverseJoinColumns = @JoinColumn(name = "variable_id", referencedColumnName = "id")
	)
	private List<Variable> variables;
	
	@ManyToOne
	@JoinColumn(name = "event_id", referencedColumnName = "id")
	private Event event;
	
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<Variable> getVariables() {
		return variables;
	}

	public void setVariables(List<Variable> variables) {
		this.variables = variables;
	}

	public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
	}
	
	
}
