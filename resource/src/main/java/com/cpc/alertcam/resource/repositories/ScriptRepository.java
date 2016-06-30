package com.cpc.alertcam.resource.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cpc.alertcam.resource.models.Script;

public interface ScriptRepository extends JpaRepository<Script, Long> {

}
