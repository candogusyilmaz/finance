package dev.canverse.finance.api.features.party.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "organizations")
public class Organization extends Party {
    private String address;

    private String taxOffice;

    private String taxRegistrationNumber;

    private String phoneNumber;

    private String email;

    public Organization() {
        this.addRole(Role.ORGANIZATION);
    }
}