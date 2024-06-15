package dev.canverse.finance.api.features.product.entities;

import dev.canverse.finance.api.features.shared.embeddable.Timestamp;
import dev.canverse.finance.api.features.user.entities.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SoftDelete;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Entity
@Table(name = "products")
@NoArgsConstructor
@SoftDelete
@EntityListeners(AuditingEntityListener.class)
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

    @ManyToOne
    private ProductUnit unit;

    @ManyToOne
    private ProductCategory category;

    @ManyToOne(optional = false)
    @CreatedBy
    private User createdBy;

    @ManyToOne(optional = false)
    @LastModifiedBy
    private User updatedBy;

    private Timestamp timestamp;
}
