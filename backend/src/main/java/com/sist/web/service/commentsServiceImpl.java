package com.sist.web.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.sist.web.dto.CommentsInsertDTO;
import com.sist.web.entity.Comment;
import com.sist.web.repository.CommentsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class commentsServiceImpl implements CommentsService {
  private final CommentsRepository commentsRepository;

  @Override
  public Map<String, Object> commentsList(String targetType, String targetNo, int page) {
    Map<String, Object> map = new HashMap<>();
    int pageSize = 10;
    
    Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by(Sort.Direction.ASC, "no"));
    Page<Comment> pageData = commentsRepository.findByTarget(targetType, targetNo, pageable);
    int totalCounts = commentsRepository.findByTargetCounts(targetType, targetNo);
    
    List<Comment> list = pageData.getContent();
    int totalPages = pageData.getTotalPages();
    
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
    map.put("totalCounts", totalCounts);
    
    return map;
  }

  @Override
  public void commentsInsert(CommentsInsertDTO dto) {
    String targetType = dto.getTargetType();
    String targetNo = dto.getTargetNo();
    String writer = dto.getWriter();
    String content = dto.getContent();
    
    Comment comment = new Comment();
    
    comment.setTargetType(targetType);
    comment.setTargetNo(targetNo);
    comment.setWriter(writer);
    comment.setContent(content);
    
    commentsRepository.save(comment);
  }
}
