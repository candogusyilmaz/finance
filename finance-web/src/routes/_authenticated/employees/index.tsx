import { createFileRoute } from '@tanstack/react-router';
import { Helmet } from 'react-helmet-async';
import { PageSchema } from 'src/api/types/Defaults';
import { EmployeeList } from 'src/features/employees/list/employee-list';

export const Route = createFileRoute('/_authenticated/employees/')({
  component: Employees,
  validateSearch: PageSchema
});

function Employees() {
  return (
    <>
      <Helmet>
        <title>Personeller | Canverse</title>
      </Helmet>
      <EmployeeList />
    </>
  );
}
