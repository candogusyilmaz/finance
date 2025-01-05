package dev.canverse.finance.api.features.party.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "individuals")
public class Individual extends Party {

    private String firstName;

    private String lastName;

    private String socialSecurityNumber;

    private LocalDate birthDate;

    protected Individual() {
    }

    public Individual(String firstname, String lastname, String socialSecurityNumber, LocalDate birthDate) {
        super.setName(firstname + " " + lastname);
        super.setType(Type.INDIVIDUAL);
        this.firstName = firstname;
        this.lastName = lastname;
        this.socialSecurityNumber = socialSecurityNumber;
        this.birthDate = birthDate;
    }
}
