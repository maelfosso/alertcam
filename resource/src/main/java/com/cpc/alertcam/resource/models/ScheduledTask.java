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
@Table(name = "scheduled_tasks")
public class ScheduledTask {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "start_date")
	private Date start;
	
	@ManyToOne
	@JoinColumn(name = "datasource_id", referencedColumnName = "id")
	private Datasource datasource;
	
	@ManyToOne
	@JoinColumn(name = "script_id", referencedColumnName = "id")
	private Script script;
	
	@Column(name = "mailling_list")
	private String mailingList;
	
	@Column(name = "periodicity")
	private String periodicity;
	
	@Column(name = "repetition_rate")
	private String repetitionRate;
	
	@Column(name = "next_fire_time")
	private Date nextFireTime;

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

	public Date getNextFireTime() {
		return nextFireTime;
	}

	public void setNextFireTime(Date nextFireTime) {
		this.nextFireTime = nextFireTime;
	}
	
	public Date getStart() {
		return start;
	}

	public void setStart(Date start) {
		this.start = start;
	}

	public Datasource getDatasource() {
		return datasource;
	}

	public void setDatasource(Datasource datasource) {
		this.datasource = datasource;
	}

	public String getMailingList() {
		return mailingList;
	}

	public void setMailingList(String mailingList) {
		this.mailingList = mailingList;
	}

	public Script getScript() {
		return this.script;
	}
	
	public void setScript(Script script) {
		this.script = script;
	}
	
	public String getPeriodicity() {
		return periodicity;
	}

	public void setPeriodicity(String periodicity) {
		this.periodicity = periodicity;
	}

	public String getRepetitionRate() {
		return repetitionRate;
	}

	public void setRepetitionRate(String repetitionRate) {
		this.repetitionRate = repetitionRate;
	}

	public void update(ScheduledTask s) {
		this.name = s.getName();
		this.script = s.getScript();
		this.nextFireTime = s.getNextFireTime();
		this.datasource = s.getDatasource();
		this.mailingList = s.getMailingList();
		this.periodicity = s.getPeriodicity();
		this.repetitionRate = s.getRepetitionRate();
		this.start = s.getStart();
	}
	
}
