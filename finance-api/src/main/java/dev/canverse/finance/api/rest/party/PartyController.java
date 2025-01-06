package dev.canverse.finance.api.rest.party;

import dev.canverse.finance.api.features.party.entities.Party;
import dev.canverse.finance.api.features.party.services.PartyService;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/parties")
@RequiredArgsConstructor
public class PartyController {

    private final PartyService partyService;

    @GetMapping("/simple")
    public List<IdNameProjection> getOrganizationsSimple(@RequestParam(name = "roles") Set<Party.Role> roles) {
        return partyService.getPartiesSimple(roles);
    }
}
