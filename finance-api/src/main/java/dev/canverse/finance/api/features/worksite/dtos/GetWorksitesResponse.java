package dev.canverse.finance.api.features.worksite.dtos;

import dev.canverse.finance.api.features.worksite.entities.Worksite;

public record GetWorksitesResponse(Long id, String name, OrganizationResponse organization,
                                   WorksiteSupervisorResponse supervisor) {
    private record WorksiteSupervisorResponse(Long id, String name) {
        public static WorksiteSupervisorResponse from(Worksite worksite) {
            if (worksite.getCurrentSupervisor() == null)
                return null;

            return new WorksiteSupervisorResponse(
                    worksite.getCurrentSupervisor().getSupervisor().getId(),
                    worksite.getCurrentSupervisor().getSupervisor().getName());
        }
    }

    private record OrganizationResponse(Long id, String name) {
        public static OrganizationResponse from(Worksite worksite) {
            return new OrganizationResponse(
                    worksite.getOrganization().getId(),
                    worksite.getOrganization().getName()
            );
        }
    }

    public static GetWorksitesResponse from(Worksite worksite) {
        return new GetWorksitesResponse(
                worksite.getId(),
                worksite.getName(),
                OrganizationResponse.from(worksite),
                WorksiteSupervisorResponse.from(worksite)
        );
    }
}
