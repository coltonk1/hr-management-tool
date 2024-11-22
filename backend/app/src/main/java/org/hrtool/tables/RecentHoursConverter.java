package org.hrtool.tables;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.AttributeConverter;

public class RecentHoursConverter implements AttributeConverter<List<Map<String, Object>>, String> {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<Map<String, Object>> recentHours) {
        try {
            return objectMapper.writeValueAsString(recentHours);
        } catch (JsonProcessingException jpe) {
            return null;
        }
    }

    @Override
    public List<Map<String, Object>> convertToEntityAttribute(String value) {
        try {
            return objectMapper.readValue(value, List.class);
        } catch (JsonProcessingException e) {
            return null;
        }
    }
}