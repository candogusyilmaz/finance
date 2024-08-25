package dev.canverse.finance.api.features.purchase.mappers;

import dev.canverse.finance.api.features.purchase.dtos.GetPurchasesResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.Map;

@Mapper
public interface PurchaseMapper {
    PurchaseMapper INSTANCE = Mappers.getMapper(PurchaseMapper.class);

    @Mapping(target = "id", expression = "java((Long) data.get(\"id\"))")
    @Mapping(target = "description", expression = "java((String) data.get(\"description\"))")
    @Mapping(target = "purchaseDate", expression = "java((java.time.LocalDateTime) data.get(\"purchaseDate\"))")
    @Mapping(target = "official", expression = "java((boolean) data.get(\"official\"))")
    @Mapping(target = "total", expression = "java((BigDecimal)data.get(\"total\"))")
    @Mapping(target = "currency", expression = "java(toCurrencyResponse(data))")
    @Mapping(target = "supplier", expression = "java(toSupplierResponse(data))")
    @Mapping(target = "worksite", expression = "java(toWorksiteResponse(data))")
    @Mapping(target = "lastAction", expression = "java(toPurchaseActionResponse(data))")
    GetPurchasesResponse toGetPurchasesResponse(Map<String, Object> data);

    @Mapping(target = "id", expression = "java((Long) data.get(\"currencyId\"))")
    @Mapping(target = "code", expression = "java((String) data.get(\"currencyCode\"))")
    @Mapping(target = "exchangeRate", expression = "java((Double) data.get(\"currencyRate\"))")
    GetPurchasesResponse.CurrencyResponse toCurrencyResponse(Map<String, Object> data);

    @Mapping(target = "id", expression = "java((Long) data.get(\"supplierId\"))")
    @Mapping(target = "name", expression = "java((String) data.get(\"supplierName\"))")
    GetPurchasesResponse.SupplierResponse toSupplierResponse(Map<String, Object> data);

    @Mapping(target = "id", expression = "java((Long) data.get(\"worksiteId\"))")
    @Mapping(target = "name", expression = "java((String) data.get(\"worksiteName\"))")
    GetPurchasesResponse.WorksiteResponse toWorksiteResponse(Map<String, Object> data);

    @Mapping(target = "id", expression = "java((Long) data.get(\"lastActionId\"))")
    @Mapping(target = "status", expression = "java((Purchase.Status) data.get(\"lastActionStatus\"))")
    @Mapping(target = "comment", expression = "java((String) data.get(\"lastActionComment\"))")
    @Mapping(target = "createdAt", expression = "java((java.time.LocalDateTime) data.get(\"lastActionCreatedAt\"))")
    GetPurchasesResponse.PurchaseActionResponse toPurchaseActionResponse(Map<String, Object> data);
}
