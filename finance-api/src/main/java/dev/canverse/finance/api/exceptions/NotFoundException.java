package dev.canverse.finance.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

public class NotFoundException extends ApiException {

    public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException(String message, Object entityKey) {
        super(message);
        this.body.setProperty("id", entityKey);
    }

    @Override
    public HttpStatusCode getHttpStatusCode() {
        return HttpStatus.NOT_FOUND;
    }
}
