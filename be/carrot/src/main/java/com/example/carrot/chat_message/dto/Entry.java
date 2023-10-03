package com.example.carrot.chat_message.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Entry implements Serializable {
	private Long chatroomId;
	private Long enterMemberId;
}