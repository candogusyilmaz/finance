package dev.canverse.finance.api.features.product.entities;

import dev.canverse.finance.api.features.shared.embeddable.Timestamp;
import dev.canverse.finance.api.features.user.entities.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Entity
@Table(name = "products")
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@SQLDelete(sql = "UPDATE products SET deleted = true WHERE id = ?")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductType type;

    @Column(nullable = false)
    private String name;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    private ProductUnit unit;

    @ManyToOne(fetch = FetchType.LAZY)
    private ProductCategory category;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @CreatedBy
    @Setter(AccessLevel.NONE)
    private User createdBy;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @LastModifiedBy
    @Setter(AccessLevel.NONE)
    private User updatedBy;

    @Setter(lombok.AccessLevel.NONE)
    private Timestamp timestamp;

    @Column(nullable = false)
    private boolean deleted = false;
}
