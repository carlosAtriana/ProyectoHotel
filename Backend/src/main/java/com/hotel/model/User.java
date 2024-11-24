package com.hotel.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String userName;
    private String password;
    private String name;
    private String lastName;
    private String fullName;
    private String email;
    private Boolean active;
    private String rol;
}
