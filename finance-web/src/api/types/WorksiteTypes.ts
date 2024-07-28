type GetWorksitesResponse = {
  id: number;
  name: string;
  currentSupervisor?: {
    id: number;
    name: string;
  };
};

type CreateWorksiteRequest = {
  name: string;
  supervisorId?: number | string;
};
