package com.cpc.alertcam.resource.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Datum {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String x;
	private String y;
	private String z;
	
	public Datum() {}
	
	public Datum(String x, String y, String z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getX() {
		return x;
	}

	public void setX(String x) {
		this.x = x;
	}

	public String getY() {
		return y;
	}

	public void setY(String y) {
		this.y = y;
	}

	public String getZ() {
		return z;
	}

	public void setZ(String z) {
		this.z = z;
	}

	@Override
	public String toString() {
		return "Datum [id=" + id + ", x=" + x + ", y=" + y + ", z=" + z + "]";
	}
	
	

}
