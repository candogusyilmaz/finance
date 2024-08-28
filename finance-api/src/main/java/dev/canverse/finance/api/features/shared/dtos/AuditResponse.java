package dev.canverse.finance.api.features.shared.dtos;

import java.time.LocalDateTime;

public record AuditResponse(Long id, String name, LocalDateTime time) {
}
