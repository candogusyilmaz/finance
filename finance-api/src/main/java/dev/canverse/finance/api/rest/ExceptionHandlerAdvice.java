package dev.canverse.finance.api.rest;

import dev.canverse.finance.api.exceptions.ApiException;
import org.springframework.http.*;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ExceptionHandlerAdvice extends ResponseEntityExceptionHandler {
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        ex.getBody().setProperty("invalid-params", getValidationErrors(ex));
        return ResponseEntity.status(status).body(ex.getBody());
    }

    @ExceptionHandler({IllegalArgumentException.class, IllegalStateException.class, NullPointerException.class, IndexOutOfBoundsException.class})
    public ResponseEntity<Object> handlePreconditions(RuntimeException ex, ServletWebRequest request) {
        var detail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, ex.getMessage());
        detail.setInstance(URI.create(request.getRequest().getRequestURI()));
        return ResponseEntity.status(detail.getStatus()).body(detail);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> handleRuntimeException(RuntimeException ex, ServletWebRequest request) {
        var detail = ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        detail.setTitle(ex.getClass().getSimpleName());
        detail.setInstance(URI.create(request.getRequest().getRequestURI()));
        this.logger.error("An unexpected error occurred.", ex);
        return ResponseEntity.status(detail.getStatus()).body(detail);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Object> handleAccessDeniedException() {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Object> handleBadCredentialsException(BadCredentialsException ex, ServletWebRequest request) {
        var detail = ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, "Kullanıcı adı veya şifre hatalı.");
        detail.setInstance(URI.create(request.getRequest().getRequestURI()));

        return ResponseEntity.status(detail.getStatus()).body(detail);
    }

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<Object> handleApiException(ApiException ex, ServletWebRequest request) {
        ex.getBody().setInstance(URI.create(request.getRequest().getRequestURI()));
        return ResponseEntity.status(ex.getHttpStatusCode()).body(ex.getBody());
    }

    private static Map<String, ArrayList<String>> getValidationErrors(MethodArgumentNotValidException ex) {
        var result = new HashMap<String, ArrayList<String>>();

        ex.getFieldErrors().forEach(error -> {
            var field = error.getField();
            var message = error.getDefaultMessage() != null ? error.getDefaultMessage() : "";

            if (result.containsKey(field)) {
                result.get(field).add(message);
            } else {
                var messages = new ArrayList<String>();
                messages.add(message);
                result.put(field, messages);
            }
        });

        return result;
    }
}
