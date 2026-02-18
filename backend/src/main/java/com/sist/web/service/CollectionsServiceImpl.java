package com.sist.web.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.sist.web.repository.CollectionsRepository;
import com.sist.web.view.CollectionsDetailView;
import com.sist.web.view.CollectionsListView;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CollectionsServiceImpl implements CollectionsService {
  public final CollectionsRepository collectionsRepository;

  @Override
  public Map<String, Object> CollectionsList(int page) {
    Map<String, Object> map = new HashMap<>();
    int size = 12;
    int pageSize = 10;
    
    Pageable pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.ASC, "id"));
    
    List<CollectionsListView> list = collectionsRepository.collectionsList(pageable);
    int totalPages = (int) (Math.ceil(collectionsRepository.count() / size));
    
    int startPage = ((page - 1) / pageSize * pageSize) + 1; 
    int endPage = ((page - 1) / pageSize * pageSize) + pageSize;
    
    if (endPage > totalPages) {
      endPage = totalPages;
    }
    
    map.put("currentPage", page);
    map.put("list", list);
    map.put("totalPages", totalPages);
    map.put("startPage", startPage);
    map.put("endPage", endPage);
    
    return map;
  }

  @Override
  public CollectionsDetailView collectionsDetail(String id) {
    return collectionsRepository.collectionsDetail(id);
  }
}
