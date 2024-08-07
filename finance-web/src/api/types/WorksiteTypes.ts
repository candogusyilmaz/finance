type GetWorksitesResponse = {
  id: number;
  name: string;
  supervisor?: {
    id: number;
    name: string;
  };
  organization: {
    id: number;
    name: string;
  };
};

type CreateWorksiteRequest = {
  name: string;
  supervisorId?: number | string;
  organizationId: number | string;
};
