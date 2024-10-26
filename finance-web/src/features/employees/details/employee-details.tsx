import { Grid, Tabs } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import type { ID } from 'src/api/types/Defaults';
import { AutofetchingTable } from 'src/components/autofetching-table/autofetching-table';
import { EmployeeInfoCard } from './components/employee-info-card';
import {
  EMPLOYEE_ASSIGNMENT_COLUMNS,
  EMPLOYEE_EMPLOYMENT_COLUMNS,
  EMPLOYEE_SALAY_COLUMNS,
  GET_EMPLOYEE_PAYMENT_COLUMNS
} from './components/employee-table-columns';

export function EmployeeDetails({ employeeId }: { employeeId: ID }) {
  const { t } = useTranslation();

  return (
    <Grid>
      <Grid.Col span={{ sm: 12, md: 12 }}>
        <EmployeeInfoCard employeeId={employeeId} />
      </Grid.Col>
      <Grid.Col span={{ sm: 12, md: 12 }}>
        <Tabs keepMounted={false} defaultValue="employments">
          <Tabs.List mb="md">
            <Tabs.Tab value="employments">Organizasyon</Tabs.Tab>
            <Tabs.Tab value="assignments">Çalışma Yeri</Tabs.Tab>
            <Tabs.Tab value="salaries">Ücret</Tabs.Tab>
            <Tabs.Tab value="payments">Ödeme</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="employments">
            <AutofetchingTable columns={EMPLOYEE_EMPLOYMENT_COLUMNS} fetchUrl={`/employees/${employeeId}/employments`} />
          </Tabs.Panel>
          <Tabs.Panel value="assignments">
            <AutofetchingTable columns={EMPLOYEE_ASSIGNMENT_COLUMNS} fetchUrl={`/employees/${employeeId}/assignments`} />
          </Tabs.Panel>
          <Tabs.Panel value="salaries">
            <AutofetchingTable columns={EMPLOYEE_SALAY_COLUMNS} fetchUrl={`/employees/${employeeId}/salaries`} />
          </Tabs.Panel>
          <Tabs.Panel value="payments">
            <AutofetchingTable columns={GET_EMPLOYEE_PAYMENT_COLUMNS(t, employeeId)} fetchUrl={`/employees/${employeeId}/payments`} />
          </Tabs.Panel>
        </Tabs>
      </Grid.Col>
    </Grid>
  );
}
