package dev.canverse.finance.api.features.party.services;

import dev.canverse.finance.api.features.party.entities.Party;
import dev.canverse.finance.api.features.party.repositories.PartyRepository;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PartyService {
    private final PartyRepository partyRepository;

    public List<IdNameProjection> getPartiesSimple(Set<Party.Role> roles) {
        return partyRepository.findPartiesSimple(roles);
    }
}
