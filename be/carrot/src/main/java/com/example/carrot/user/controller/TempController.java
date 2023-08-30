package com.example.carrot.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class TempController {

	/**
	 * 임시 코드
	 * 프론트로 redirect 되는 페이지
	 * @param code
	 * @return
	 */
	@GetMapping("/oauth/redirect")
	public String redirect(@RequestParam String code) {
		return "redirect:/api/users/login?code=" + code;
	}

}
