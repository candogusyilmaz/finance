package dev.canverse.finance.api.features.company.repositories;

import dev.canverse.finance.api.features.company.entities.CompanyBalance;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyBalanceRepository extends JpaRepository<CompanyBalance, Long>, JpaSpecificationExecutor<CompanyBalance> {
    @Modifying
    @Transactional
    @Query("update CompanyBalance cb set cb.totalOfficialPurchaseAmount = cb.totalOfficialPurchaseAmount + :amount where cb.company.id = :companyId")
    void increaseTotalOfficialPurchaseAmount(Long companyId, Double amount);

    @Modifying
    @Transactional
    @Query("update CompanyBalance cb set cb.totalUnofficialPurchaseAmount = cb.totalUnofficialPurchaseAmount + :amount where cb.company.id = :companyId")
    void increaseTotalUnofficialPurchaseAmount(Long companyId, Double amount);

    @Modifying
    @Transactional
    @Query("update CompanyBalance cb set cb.totalUnofficialReceivedAmount = cb.totalUnofficialReceivedAmount + :amount where cb.company.id = :companyId")
    void increaseTotalUnofficialReceivedAmount(Long companyId, Double amount);

    @Modifying
    @Transactional
    @Query("update CompanyBalance cb set cb.totalOfficialReceivedAmount = cb.totalOfficialReceivedAmount + :amount where cb.company.id = :companyId")
    void increaseTotalOfficialReceivedAmount(Long companyId, Double amount);

    @Modifying
    @Transactional
    @Query("update CompanyBalance cb set cb.totalOfficialGivenAmount = cb.totalOfficialGivenAmount + :amount where cb.company.id = :companyId")
    void increaseOfficialTotalGivenAmount(Long companyId, Double amount);

    @Modifying
    @Transactional
    @Query("update CompanyBalance cb set cb.totalUnofficialGivenAmount = cb.totalUnofficialGivenAmount + :amount where cb.company.id = :companyId")
    void increaseUnofficialTotalGivenAmount(Long companyId, Double amount);
}