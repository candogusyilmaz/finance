package dev.canverse.finance.api.features.shared.embeddable;

import jakarta.persistence.Embeddable;
import lombok.Getter;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Embeddable
@Getter
public class DateTimePeriod implements Serializable {

    private LocalDateTime startDate;
    private LocalDateTime endDate;

    protected DateTimePeriod() {
    }

    public DateTimePeriod(LocalDateTime startDate, LocalDateTime endDate) {
        if (startDate != null && endDate != null && startDate.isAfter(endDate))
            throw new IllegalArgumentException("Başlangıç tarihi, bitiş tarihinden önce olmalıdır.");

        if (startDate != null)
            this.startDate = startDate.withSecond(59).truncatedTo(ChronoUnit.SECONDS);

        if (endDate != null)
            this.endDate = endDate.withSecond(1).truncatedTo(ChronoUnit.SECONDS);
    }
}
