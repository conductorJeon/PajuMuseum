package com.sist.web.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sist.web.service.ChatBotService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ChatBotController {
  private final ChatBotService chatBotService;
  
  @GetMapping(value = "/chatbot/{message}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  @ResponseBody
  public Flux<String> streamChat(@PathVariable("message") String message) {
    return chatBotService.streamChat(message);
  }
}
