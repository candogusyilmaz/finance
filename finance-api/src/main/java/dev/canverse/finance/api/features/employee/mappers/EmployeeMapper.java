package dev.canverse.finance.api.features.employee.mappers;

import dev.canverse.finance.api.features.employee.dtos.GetEmployeesResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.Map;

@Mapper
public interface EmployeeMapper {
    EmployeeMapper INSTANCE = Mappers.getMapper(EmployeeMapper.class);

    @Mapping(target = "id", expression = "java((Long)data.get(\"id\"))")
    @Mapping(target = "name", expression = "java((String)data.get(\"name\"))")
    @Mapping(target = "socialSecurityNumber", expression = "java((String)data.get(\"ssn\"))")
    @Mapping(target = "currentWorksite", expression = "java(toGetEmployeesResponseWorksite(data))")
    @Mapping(target = "currentOrganization", expression = "java(toGetEmployeesResponseOrganization(data))")
    GetEmployeesResponse toGetEmployeesResponse(Map<String, Object> data);

    @Mapping(target = "id", expression = "java((Long)data.get(\"worksiteId\"))")
    @Mapping(target = "name", expression = "java((String)data.get(\"worksiteName\"))")
    GetEmployeesResponse.Worksite toGetEmployeesResponseWorksite(Map<String, Object> data);

    @Mapping(target = "id", expression = "java((Long)data.get(\"organizationId\"))")
    @Mapping(target = "name", expression = "java((String)data.get(\"organizationName\"))")
    @Mapping(target = "formalEmploymentPeriod", expression = "java((DatePeriod)data.get(\"fep\"))")
    @Mapping(target = "actualEmploymentPeriod", expression = "java((DatePeriod)data.get(\"aep\"))")
    GetEmployeesResponse.Organization toGetEmployeesResponseOrganization(Map<String, Object> data);
}
