package dev.canverse.finance.api.features.bank.services;

import dev.canverse.finance.api.exceptions.BadRequestException;
import dev.canverse.finance.api.exceptions.NotFoundException;
import dev.canverse.finance.api.features.bank.entities.Card;
import dev.canverse.finance.api.features.bank.entities.CardType;
import dev.canverse.finance.api.features.bank.events.CardTransactionCreatedEvent;
import dev.canverse.finance.api.features.bank.repositories.CreditCardRepository;
import dev.canverse.finance.api.features.bank.repositories.DebitCardRepository;
import dev.canverse.finance.api.features.transaction.entities.Transaction;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CardTransactionService {
    private final DebitCardRepository debitCardRepository;
    private final CreditCardRepository creditCardRepository;

    @TransactionalEventListener
    public void handleCardTransactionCreatedEvent(CardTransactionCreatedEvent event) {
        var sender = event.cardTransaction().getSender();
        var receiver = event.cardTransaction().getReceiver();
        var transaction = event.cardTransaction().getTransaction();

        handleSenderTransaction(sender, transaction);

        handleReceiverTransaction(receiver, transaction);
    }

    private void handleSenderTransaction(Card sender, Transaction transaction) {
        if (sender == null)
            return;

        if (Objects.requireNonNull(sender.getCardType()) == CardType.DEBIT) {
            var debitCard = debitCardRepository.findById(sender.getId()).orElseThrow(() -> new NotFoundException("Kart bulunamadı!"));
            debitCardRepository.decreaseBalance(debitCard.getId(), transaction.getAmount());
        } else if (sender.getCardType() == CardType.CREDIT) {
            var creditCard = creditCardRepository.findById(sender.getId()).orElseThrow(() -> new RuntimeException("Kart bulunamadı!"));

            if (creditCard.getExpense() + transaction.getAmount() > creditCard.getMaxLimit())
                throw new BadRequestException("Harcama kredi kartı limitini aştığından dolayı gerçekleştirilemedi!");

            creditCardRepository.increaseExpense(creditCard.getId(), transaction.getAmount());
        }
    }

    private void handleReceiverTransaction(Card receiver, Transaction transaction) {
        if (receiver == null)
            return;

        if (Objects.requireNonNull(receiver.getCardType()) == CardType.DEBIT) {
            var debitCard = debitCardRepository.findById(receiver.getId()).orElseThrow(() -> new NotFoundException("Kart bulunamadı!"));
            debitCardRepository.increaseBalance(debitCard.getId(), transaction.getAmount());
        } else if (receiver.getCardType() == CardType.CREDIT) {
            var creditCard = creditCardRepository.findById(receiver.getId()).orElseThrow(() -> new RuntimeException("Kart bulunamadı!"));
            creditCardRepository.decreaseExpense(creditCard.getId(), transaction.getAmount());
        }
    }
}
