package dev.canverse.finance.api.features.purchase.repositories;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import dev.canverse.finance.api.features.currency.entities.QCurrency;
import dev.canverse.finance.api.features.party.entities.QParty;
import dev.canverse.finance.api.features.purchase.dtos.GetPurchasesRequest;
import dev.canverse.finance.api.features.purchase.dtos.GetPurchasesResponse;
import dev.canverse.finance.api.features.purchase.entities.QPurchase;
import dev.canverse.finance.api.features.purchase.entities.QPurchaseAction;
import dev.canverse.finance.api.features.purchase.entities.QPurchaseItem;
import dev.canverse.finance.api.features.worksite.entities.QWorksite;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.ArrayList;

@RequiredArgsConstructor
public class QueryDslPurchaseRepositoryImpl implements QueryDslPurchaseRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public Page<GetPurchasesResponse> getPurchases(GetPurchasesRequest req, Pageable pageable) {
        QPurchase p = QPurchase.purchase;
        QPurchaseAction pa = QPurchaseAction.purchaseAction;
        QCurrency c = QCurrency.currency;
        QPurchaseItem pi = QPurchaseItem.purchaseItem;
        QWorksite w = QWorksite.worksite;
        QParty s = QParty.party;

        // Subquery for latest purchase action
        var latestActionSubquery = JPAExpressions
                .select(pa.id.max())
                .from(pa)
                .where(pa.purchase.id.eq(p.id));

        // Main query
        var query = queryFactory
                .select(Projections.constructor(GetPurchasesResponse.class,
                        p.id,
                        p.description,
                        p.purchaseDate,
                        p.official,
                        pi.quantity.multiply(pi.unitPrice).sumBigDecimal(),
                        Projections.constructor(GetPurchasesResponse.WorksiteResponse.class,
                                w.id,
                                w.name),
                        Projections.constructor(GetPurchasesResponse.SupplierResponse.class,
                                s.id,
                                s.name),
                        Projections.constructor(GetPurchasesResponse.CurrencyResponse.class,
                                c.id,
                                c.code,
                                c.exchangeRate),
                        Projections.constructor(GetPurchasesResponse.PurchaseActionResponse.class,
                                pa.id,
                                pa.status,
                                pa.comment,
                                pa.createdAt)))
                .from(p)
                .join(pa).on(pa.id.eq(latestActionSubquery))
                .join(c).on(c.code.eq(p.currencyCode))
                .join(pi).on(pi.purchase.eq(p))
                .join(w).on(w.eq(p.worksite))
                .join(s).on(s.eq(p.supplier))
                .where(req.supplierId().isEmpty() ? null : s.id.eq(req.supplierId().get()))
                .groupBy(
                        p.id, p.description, p.purchaseDate, p.official,
                        w.id, w.name,
                        s.id, s.name,
                        c.id, c.code, c.exchangeRate,
                        pa.id, pa.status, pa.comment, pa.createdAt
                );

        if (pageable.getSort().isSorted()) {
            var orders = new ArrayList<OrderSpecifier<?>>();

            pageable.getSort().forEach(order -> {
                OrderSpecifier<?> orderSpecifier = switch (order.getProperty()) {
                    case "id" -> order.isAscending() ? p.id.asc() : p.id.desc();
                    case "supplier" -> order.isAscending() ? s.name.asc() : s.name.desc();
                    case "worksite" -> order.isAscending() ? w.name.asc() : w.name.desc();
                    case "status" -> order.isAscending() ? pa.status.asc() : pa.status.desc();
                    default -> p.id.desc(); // default sort
                };
                orders.add(orderSpecifier);
            });

            query.orderBy(orders.toArray(new OrderSpecifier[0]));
        } else {
            // Default sorting if none specified
            query.orderBy(p.id.desc());
        }
        // Execute paginated query
        var results = query
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        // Count query for pagination
        var countQuery = queryFactory
                .select(p.countDistinct())
                .from(p)
                .join(p.supplier, s)
                .where(req.supplierId().isEmpty() ? null : s.id.eq(req.supplierId().get()));

        return PageableExecutionUtils.getPage(results, pageable, countQuery::fetchOne);
    }
}
