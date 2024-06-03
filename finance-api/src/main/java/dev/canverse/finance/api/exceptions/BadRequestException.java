package dev.canverse.finance.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

public class BadRequestException extends ApiException {

    public BadRequestException(String message) {
        super(message);
    }

    @Override
    protected HttpStatusCode getHttpStatusCode() {
        return HttpStatus.BAD_REQUEST;
    }
}
