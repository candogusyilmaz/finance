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

    protected Organization() {
    }

    public Organization(String name, String address, String taxOffice, String taxRegistrationNumber, String phoneNumber, String email) {
        super.setName(name);
        super.setType(Type.ORGANIZATION);
        this.address = address;
        this.taxOffice = taxOffice;
        this.taxRegistrationNumber = taxRegistrationNumber;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}