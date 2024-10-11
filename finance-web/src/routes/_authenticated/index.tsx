import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/')({
  component: () => <div>Burasina biseler ekleyecegiz artik</div>
});
