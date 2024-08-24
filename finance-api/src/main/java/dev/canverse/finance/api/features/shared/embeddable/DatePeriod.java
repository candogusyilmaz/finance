package dev.canverse.finance.api.features.shared.embeddable;

import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.io.Serializable;
import java.time.LocalDate;

@Embeddable
@Getter
@EqualsAndHashCode
public class DatePeriod implements Serializable {

    private LocalDate startDate;
    private LocalDate endDate;

    protected DatePeriod() {
    }

    public DatePeriod(LocalDate startDate, LocalDate endDate) {
        if (startDate != null && endDate != null && startDate.isAfter(endDate))
            throw new IllegalArgumentException("Başlangıç tarihi, bitiş tarihinden önce olmalıdır.");

        this.startDate = startDate;
        this.endDate = endDate;
    }
}
