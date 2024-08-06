package dev.canverse.finance.api.features.party.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "suppliers")
@NoArgsConstructor
public class Supplier extends Party {
    private String address;

    private String taxOffice;

    private String taxRegistrationNumber;

    private String phoneNumber;

    private String email;
}
