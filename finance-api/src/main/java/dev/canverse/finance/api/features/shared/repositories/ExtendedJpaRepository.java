package dev.canverse.finance.api.features.shared.repositories;

import dev.canverse.finance.api.exceptions.NotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.lang.NonNull;

@NoRepositoryBean
public interface ExtendedJpaRepository<T, ID> extends JpaRepository<T, ID>, JpaSpecificationExecutor<T> {
    default T getReference(@NonNull ID id) {
        if (!existsById(id))
            throw new NotFoundException("Entity not found");

        return getReferenceById(id);
    }

    default T getReference(@NonNull ID id, String notFoundMessage) {
        if (!existsById(id))
            throw new NotFoundException(notFoundMessage);

        return getReferenceById(id);
    }

    default T getById(@NonNull ID id) {
        return findById(id).orElseThrow(() -> new NotFoundException("Entity not found"));
    }

    default T getById(ID id, String notFoundMessage) {
        return findById(id).orElseThrow(() -> new NotFoundException(notFoundMessage));
    }
}
