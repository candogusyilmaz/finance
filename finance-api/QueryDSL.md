```xml

<dependencies>
    <dependency>
        <groupId>com.querydsl</groupId>
        <artifactId>querydsl-apt</artifactId>
        <version>5.1.0</version>
        <classifier>jakarta</classifier>
    </dependency>
    <dependency>
        <groupId>com.querydsl</groupId>
        <artifactId>querydsl-jpa</artifactId>
        <version>5.1.0</version>
        <classifier>jakarta</classifier>
    </dependency>
</dependencies>
```

```java
public void getPurchases(Pageable page) {
    var p = QPurchase.purchase;
    var pa = QPurchaseAction.purchaseAction;
    var c = QCurrency.currency;
    var pi = QPurchaseItem.purchaseItem;
    var wrk = QWorksite.worksite;
    var s = QParty.party;

    var query = new JPAQuery<>(em);

    var result = query
            .limit(page.getPageSize()).offset(page.getOffset())
            .select(
                    Projections.constructor(GetPurchasesResponse.class,
                            p.id,
                            p.description,
                            p.purchaseDate,
                            p.official,
                            pi.unitPrice.multiply(pi.quantity).sum(),
                            Projections.constructor(GetPurchasesResponse.WorksiteResponse.class, wrk.id, wrk.name),
                            Projections.constructor(GetPurchasesResponse.SupplierResponse.class, s.id, s.name),
                            Projections.constructor(GetPurchasesResponse.CurrencyResponse.class,
                                    c.id,
                                    c.code,
                                    c.exchangeRate),
                            Projections.constructor(GetPurchasesResponse.PurchaseActionResponse.class,
                                    pa.id,
                                    pa.status,
                                    pa.comment,
                                    pa.createdAt)
                    )
            )
            .from(p)
            .innerJoin(pa).on(pa.id.eq(
                    JPAExpressions.select(pa.id.max())
                            .from(pa)
                            .where(pa.purchase.id.eq(p.id))
            ))
            .innerJoin(c).on(c.code.eq(p.currencyCode))
            .innerJoin(p.purchaseItems, pi)
            .innerJoin(p.worksite, wrk)
            .innerJoin(p.supplier, s)
            .groupBy(p.id, p.supplier.id, p.supplier.name, p.description, c.id, c.code, c.exchangeRate,
                    p.purchaseDate, p.official, pa.id, pa.status, pa.comment, pa.createdAt, wrk.id, wrk.name)
            .fetch();
}
```