import { createFileRoute } from '@tanstack/react-router';
import { Helmet } from 'react-helmet-async';
import EmployeeDetails from 'src/features/employees/details';

export const Route = createFileRoute('/_authenticated/employees/$employeeId')({
  component: Employee
});

function Employee() {
  const { employeeId } = Route.useParams();

  return (
    <>
      <Helmet>
        <title>Personel Bilgileri | Canverse</title>
      </Helmet>
      <EmployeeDetails employeeId={employeeId} />
    </>
  );
}
