package dev.canverse.finance.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

public class BadRequestException extends ApiException {

    public BadRequestException(String message) {
        super(message);
    }

    @Override
    public HttpStatusCode getHttpStatusCode() {
        return HttpStatus.BAD_REQUEST;
    }
}
