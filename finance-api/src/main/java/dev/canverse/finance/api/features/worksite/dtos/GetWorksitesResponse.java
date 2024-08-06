package dev.canverse.finance.api.features.worksite.dtos;

import dev.canverse.finance.api.features.worksite.entities.Worksite;

public record GetWorksitesResponse(Long id, String name, WorksiteSupervisorResponse currentSupervisor) {
    private record WorksiteSupervisorResponse(Long id, String name) {
        public static WorksiteSupervisorResponse from(Worksite worksite) {
            if (worksite.getCurrentSupervisor() == null)
                return null;

            return new WorksiteSupervisorResponse(
                    worksite.getCurrentSupervisor().getSupervisor().getId(),
                    worksite.getCurrentSupervisor().getSupervisor().getName());
        }
    }

    public static GetWorksitesResponse from(Worksite worksite) {
        return new GetWorksitesResponse(
                worksite.getId(),
                worksite.getName(),
                WorksiteSupervisorResponse.from(worksite)
        );
    }
}
