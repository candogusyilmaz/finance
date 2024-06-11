import axios from 'axios';
import { useMutation } from 'react-query';
import type { ApiMutationOptions } from './types/Defaults';
import type {
  CreateAccessTokenRequest,
  CreateAccessTokenResponse
} from './types/TokenTypes';

export function useCreateAccessToken(
  options: ApiMutationOptions<
    CreateAccessTokenRequest,
    CreateAccessTokenResponse
  >
) {
  return useMutation({
    ...options,
    mutationFn: async (data: CreateAccessTokenRequest) => {
      return (await axios.post<CreateAccessTokenResponse>('/token', data)).data;
    }
  });
}
