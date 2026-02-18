package com.sist.web.service;

import java.util.Map;

import com.sist.web.dto.CommentsInsertDTO;

public interface CommentsService {
  public Map<String, Object> commentsList(String tartgetType, String targetNo, int page);
  
  public void commentsInsert(CommentsInsertDTO dto);
}
