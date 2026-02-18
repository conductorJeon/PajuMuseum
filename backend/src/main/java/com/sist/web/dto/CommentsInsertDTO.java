package com.sist.web.dto;

import lombok.Data;

@Data
public class CommentsInsertDTO {
  private String targetType;
  private String targetNo;
  private String writer;
  private String content;
}
