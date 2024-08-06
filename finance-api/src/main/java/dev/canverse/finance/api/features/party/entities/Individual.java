package dev.canverse.finance.api.features.party.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "individuals")
@NoArgsConstructor
public class Individual extends Party {
    @Column(unique = true)
    private String socialSecurityNumber;

    private LocalDate birthDate;
}
