package com.sist.web.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import reactor.core.publisher.Flux;

@Service
public class ChatBotService {
  private final ChatClient chatClient;
  
  public ChatBotService(ChatClient.Builder chatClientBuilder) {
    this.chatClient = chatClientBuilder.build();
  }
  
  public Flux<String> streamChat(String userMessage) {
    Flux<String> flux = chatClient.prompt().user(userMessage).stream().content().doOnNext(System.out::println);
    return flux;
  }
}
