package dev.canverse.finance.api.features.shared.embeddable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Embeddable
@Getter
public class DateTimePeriod implements Serializable {

    @Column(nullable = false)
    private LocalDateTime startDate;

    @Column(nullable = false)
    private LocalDateTime endDate;

    protected DateTimePeriod() {
    }

    public DateTimePeriod(LocalDateTime startDate, LocalDateTime endDate) {
        if (startDate == null || endDate == null)
            throw new IllegalArgumentException("Başlangıç tarihi ve bitiş tarihi alanları gereklidir.");

        if (startDate.isAfter(endDate))
            throw new IllegalArgumentException("Başlangıç tarihi, bitiş tarihinden önce olmalıdır.");

        this.startDate = startDate.withSecond(59).truncatedTo(ChronoUnit.SECONDS);
        this.endDate = endDate.withSecond(1).truncatedTo(ChronoUnit.SECONDS);
    }
}
