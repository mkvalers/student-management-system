package com.mkv.studentmanagementapi.user.mapper;

import com.mkv.studentmanagementapi.user.dto.RegistrationRequest;
import com.mkv.studentmanagementapi.user.dto.RegistrationResponse;
import com.mkv.studentmanagementapi.student.entity.Student;
import com.mkv.studentmanagementapi.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface RegistrationMapper {

    @Mappings({
        @Mapping(target = "firstName", source = "student.firstName"),
        @Mapping(target = "lastName", source = "student.lastName")
    })
    RegistrationResponse toDto(User user);
    User toUserEntity(RegistrationRequest request);
    Student toStudentEntity(RegistrationRequest request);
}
