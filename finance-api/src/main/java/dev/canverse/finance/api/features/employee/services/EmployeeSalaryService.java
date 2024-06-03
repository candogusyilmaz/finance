package dev.canverse.finance.api.features.employee.services;

import dev.canverse.finance.api.exceptions.NotFoundException;
import dev.canverse.finance.api.features.employee.dtos.CreateEmployeeSalaryRequest;
import dev.canverse.finance.api.features.employee.entities.EmployeeSalary;
import dev.canverse.finance.api.features.employee.repositories.EmployeeRepository;
import dev.canverse.finance.api.features.employee.repositories.EmployeeSalaryRepository;
import dev.canverse.finance.api.features.transaction.entities.Transaction;
import dev.canverse.finance.api.features.transaction.entities.TransactionAction;
import dev.canverse.finance.api.features.transaction.entities.TransactionStatus;
import dev.canverse.finance.api.features.transaction.entities.TransactionType;
import dev.canverse.finance.api.features.transaction.repository.TransactionRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeSalaryService {
    private final EmployeeRepository employeeRepository;
    private final EmployeeSalaryRepository employeeSalaryRepository;
    private final TransactionRepository transactionRepository;

    @Transactional
    public void createEmployeSalaries(CreateEmployeeSalaryRequest request) {
        var employee = employeeRepository.findById(request.employeeId()).orElseThrow(() -> new NotFoundException("Employee not found"));

        request.dueDates().forEach(dueDate -> {
            TransactionAction action = new TransactionAction();
            action.setStatus(TransactionStatus.UNPAID);

            var transaction = new Transaction();
            transaction.setAmount(employee.getJobDetail().getSalary());
            transaction.setCurrency("TRY");
            transaction.setType(TransactionType.PAYMENT);
            transaction.setOfficial(true);
            transaction.getActions().add(action);

            transactionRepository.save(transaction);

            var salary = new EmployeeSalary();
            salary.setEmployee(employee);
            salary.setTransaction(transaction);
            salary.setDueDate(dueDate);

            employeeSalaryRepository.save(salary);
        });
    }
}
