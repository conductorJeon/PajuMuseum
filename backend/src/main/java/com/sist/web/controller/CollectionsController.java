package com.sist.web.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.sist.web.service.CollectionsService;
import com.sist.web.view.CollectionsDetailView;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CollectionsController {
  private final CollectionsService collectionsService;
  
  @GetMapping("/collections/springList/{page}")
  public ResponseEntity<Map<String, Object>> collectionsList(@PathVariable("page") int page) {
    try {
      Map<String, Object> map = new HashMap<>();
      
      map = collectionsService.CollectionsList(page);
      
      return new ResponseEntity<>(map, HttpStatus.OK);
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @GetMapping("/collections/springDetail/{id}")
  public ResponseEntity<CollectionsDetailView> collectionsDetail(@PathVariable("id") String id) {
    try {
      return new ResponseEntity<>(collectionsService.collectionsDetail(id), HttpStatus.OK);
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
