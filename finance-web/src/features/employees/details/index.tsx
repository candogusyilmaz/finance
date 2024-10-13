import { Grid, Tabs } from '@mantine/core';
import type { ID } from 'src/api/types/Defaults';
import EmployeeAssignmentHistoryTable from './components/employee-assignment-history-table';
import EmployeeEmploymentHistoryTable from './components/employee-employment-history-table';
import EmployeeInfoCard from './components/employee-info-card';
import EmployeePaymentHistoryTable from './components/employee-payment-history-table';
import EmployeeSalaryHistoryTable from './components/employee-salary-history-table';

function EmployeeDetails({ employeeId }: { employeeId: ID }) {
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
            <EmployeeEmploymentHistoryTable employeeId={employeeId} />
          </Tabs.Panel>
          <Tabs.Panel value="assignments">
            <EmployeeAssignmentHistoryTable employeeId={employeeId} />
          </Tabs.Panel>
          <Tabs.Panel value="salaries">
            <EmployeeSalaryHistoryTable employeeId={employeeId} />
          </Tabs.Panel>
          <Tabs.Panel value="payments">
            <EmployeePaymentHistoryTable employeeId={employeeId} />
          </Tabs.Panel>
        </Tabs>
      </Grid.Col>
    </Grid>
  );
}

export default EmployeeDetails;
