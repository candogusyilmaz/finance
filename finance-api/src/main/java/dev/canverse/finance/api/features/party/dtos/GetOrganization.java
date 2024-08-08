package dev.canverse.finance.api.features.party.dtos;

import dev.canverse.finance.api.features.party.entities.Organization;
import dev.canverse.finance.api.features.party.entities.Party;

public final class GetOrganization {
    public record Response(
            Long id,
            String name,
            String address,
            String taxOffice,
            String taxRegistrationNumber,
            String phoneNumber,
            String email
    ) {

        public static Response from(Organization entity) {
            return new Response(
                    entity.getId(),
                    entity.getName(),
                    entity.getAddress(),
                    entity.getTaxOffice(),
                    entity.getTaxRegistrationNumber(),
                    entity.getPhoneNumber(),
                    entity.getEmail()
            );
        }
    }

    public record Filter(Party.Role role) {
    }
}
