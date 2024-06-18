package dev.canverse.finance.api.features.shared.embeddable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;

import java.io.Serializable;
import java.time.LocalDate;

@Embeddable
@Getter
public class DatePeriod implements Serializable {

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    protected DatePeriod() {
    }

    public DatePeriod(LocalDate startDate, LocalDate endDate) {
        if (startDate == null || endDate == null)
            throw new IllegalArgumentException("Başlangıç tarihi ve bitiş tarihi alanları gereklidir.");

        if (startDate.isAfter(endDate))
            throw new IllegalArgumentException("Başlangıç tarihi, bitiş tarihinden önce olmalıdır.");

        this.startDate = startDate;
        this.endDate = endDate;
    }
}
