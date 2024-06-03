package dev.canverse.finance.api.features.company.services;

import dev.canverse.finance.api.features.bank.entities.CardTransaction;
import dev.canverse.finance.api.features.bank.repositories.CardRepository;
import dev.canverse.finance.api.features.bank.repositories.CardTransactionRepository;
import dev.canverse.finance.api.features.company.dtos.CreateCompanyPaymentTransactionRequest;
import dev.canverse.finance.api.features.company.entities.CompanyTransaction;
import dev.canverse.finance.api.features.company.repositories.CompanyRepository;
import dev.canverse.finance.api.features.company.repositories.CompanyTransactionRepository;
import dev.canverse.finance.api.features.transaction.entities.Transaction;
import dev.canverse.finance.api.features.transaction.entities.TransactionAction;
import dev.canverse.finance.api.features.transaction.entities.TransactionStatus;
import dev.canverse.finance.api.features.transaction.entities.TransactionType;
import dev.canverse.finance.api.features.transaction.repository.TransactionCategoryRepository;
import dev.canverse.finance.api.features.transaction.repository.TransactionMethodRepository;
import dev.canverse.finance.api.features.transaction.repository.TransactionRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyTransactionService {
    private final CompanyRepository companyRepository;
    private final CompanyTransactionRepository companyTransactionRepository;
    private final CardRepository cardRepository;
    private final CardTransactionRepository cardTransactionRepository;
    private final TransactionRepository transactionRepository;
    private final TransactionCategoryRepository transactionCategoryRepository;
    private final TransactionMethodRepository transactionMethodRepository;

    @Transactional
    public void createPaymentTransaction(CreateCompanyPaymentTransactionRequest request) {
        var transaction = createTransaction(request);

        createCompanyTransaction(request.companyId(), transaction);

        createCardTransaction(request.cardId(), transaction);
    }

    private void createCardTransaction(Long cardId, Transaction transaction) {
        var card = cardRepository.findById(cardId)
                .orElseThrow(() -> new RuntimeException("Kart bulunamadı!"));

        var cardTransaction = new CardTransaction();
        cardTransaction.setSender(card);
        cardTransaction.setTransaction(transaction);

        cardTransactionRepository.save(cardTransaction); // karta - para ekle
    }

    private void createCompanyTransaction(Long companyId, Transaction transaction) {
        var company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Firma bulunamadı!"));

        var companyTransaction = new CompanyTransaction();
        companyTransaction.setCompany(company);
        companyTransaction.setTransaction(transaction);

        companyTransactionRepository.save(companyTransaction);
    }

    private Transaction createTransaction(CreateCompanyPaymentTransactionRequest request) {
        var transactionCategory = transactionCategoryRepository.findById(request.transactionCategoryId())
                .orElse(null);

        var transactionMethod = transactionMethodRepository.findById(request.transactionMethodId())
                .orElse(null);

        var action = new TransactionAction();
        action.setStatus(TransactionStatus.PAID);

        var transaction = new Transaction();
        transaction.setCategory(transactionCategory);
        transaction.setMethod(transactionMethod);
        transaction.setAmount(request.amount());
        transaction.setCurrency(request.currency());
        transaction.setType(TransactionType.PAYMENT);
        transaction.setOfficial(request.official());
        transaction.setDate(request.date());
        transaction.getActions().add(action);

        transactionRepository.save(transaction);

        return transaction;
    }
}
