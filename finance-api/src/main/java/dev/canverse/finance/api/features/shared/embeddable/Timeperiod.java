package dev.canverse.finance.api.features.shared.embeddable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Embeddable
@Getter
public class Timeperiod implements Serializable {

    @Column(nullable = false)
    private LocalDateTime startDate;

    @Column(nullable = false)
    private LocalDateTime endDate;

    protected Timeperiod() {
    }

    public Timeperiod(LocalDateTime startDate, LocalDateTime endDate) {
        if (startDate == null || endDate == null)
            throw new IllegalArgumentException("Start date and end date must not be null.");

        if (startDate.isAfter(endDate))
            throw new IllegalArgumentException("Start date must be before end date.");

        this.startDate = startDate.withSecond(59).truncatedTo(ChronoUnit.SECONDS);
        this.endDate = endDate.withSecond(1).truncatedTo(ChronoUnit.SECONDS);
    }
}
