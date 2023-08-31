package com.example.carrot.global.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.carrot.global.filter.AuthFilter;
import com.example.carrot.global.jwt.JwtProvider;
import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
public class AuthConfig {

	@Bean
	public FilterRegistrationBean authFilter(JwtProvider provider, ObjectMapper mapper) {
		FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
		filterRegistrationBean.setFilter(new AuthFilter(mapper, provider));
		filterRegistrationBean.setOrder(1);
		return filterRegistrationBean;
	}
}
