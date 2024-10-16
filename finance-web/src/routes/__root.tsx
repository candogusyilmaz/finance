import { createRootRouteWithContext } from '@tanstack/react-router';

import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import NotFound from 'src/components/Shared/NotFound/NotFound';
import type { AuthContext } from '../utils/auth';

dayjs.extend(customParseFormat);

export const Route = createRootRouteWithContext<{
  auth: AuthContext;
}>()({
  notFoundComponent: NotFound
});
