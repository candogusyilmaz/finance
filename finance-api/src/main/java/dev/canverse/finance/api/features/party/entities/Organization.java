package dev.canverse.finance.api.features.party.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "organizations")
@NoArgsConstructor
public class Organization extends Party {
    @Column(nullable = false)
    private String registrationNumber;
}