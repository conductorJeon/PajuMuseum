package com.sist.web.service;

import java.util.Map;

import com.sist.web.view.CollectionsDetailView;

public interface CollectionsService {
  public Map<String, Object> CollectionsList(int page);
  
  public CollectionsDetailView collectionsDetail(String id);
}
