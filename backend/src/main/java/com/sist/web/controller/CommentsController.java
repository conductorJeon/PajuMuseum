package com.sist.web.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sist.web.dto.CommentsInsertDTO;
import com.sist.web.service.CommentsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CommentsController {
  private final CommentsService commentsService;

  @GetMapping("/comments/springList/{targetType}/{targetNo}/{page}")
  public ResponseEntity<Map<String, Object>> commentsList(
      @PathVariable("targetType") String targetType,
      @PathVariable("targetNo") String targetNo,
      @PathVariable("page") int page) {
    try {
      Map<String, Object> map = new HashMap<>();

      map = commentsService.commentsList(targetType, targetNo, page);

      return new ResponseEntity<>(map, HttpStatus.OK);
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @PostMapping("/comments/springInsert")
  public ResponseEntity<String> commentsInsert(@RequestBody CommentsInsertDTO dto) {
      String msg = "";
      System.out.println(dto);
      try {
        commentsService.commentsInsert(dto);
        msg = "success";
        return new ResponseEntity<>(msg, HttpStatus.OK);
      } catch (Exception e) {
        e.printStackTrace();
        msg = "fail";
        return new ResponseEntity<>(msg, HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
}
