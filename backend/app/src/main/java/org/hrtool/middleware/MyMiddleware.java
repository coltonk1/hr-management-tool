package org.hrtool.middleware;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@Component
public class MyMiddleware extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        HttpServletRequest httpRequest = request;

        // Gets the client's ip, request method, and endpoint
        String clientIp = request.getRemoteAddr();
        String requestUri = httpRequest.getRequestURI();
        String httpMethod = httpRequest.getMethod();
        String data = request.toString();

        System.out.println("Incoming request from IP: " + clientIp);
        System.out.println("HTTP Method: " + httpMethod);
        System.out.println("Requested URI: " + requestUri);
        System.out.println("Data: " + request);
        

        // Prints the query strings if any
        if (httpRequest.getQueryString() != null) {
            System.out.println("Query Parameters: " + httpRequest.getQueryString());
        }
        
        // Continue the filter chain, allowing the request to be processed by the next
        // filter or the target resource
        filterChain.doFilter(request, response);
    }

}