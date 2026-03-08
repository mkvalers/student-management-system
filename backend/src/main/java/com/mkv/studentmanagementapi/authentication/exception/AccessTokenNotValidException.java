package com.mkv.studentmanagementapi.authentication.exception;

public class AccessTokenNotValidException extends RuntimeException {
    public AccessTokenNotValidException() {
        super("Access token is null or not valid anymore.");
    }
}
