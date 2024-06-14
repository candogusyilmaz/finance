package dev.canverse.finance.api.features.product.entities;

import dev.canverse.finance.api.features.shared.embeddable.Timestamp;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SoftDelete;

@Getter
@Setter
@Entity
@Table(name = "products")
@NoArgsConstructor
@SoftDelete
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

    private Timestamp timestamp;

    @ManyToOne
    private ProductUnit unit;

    @ManyToOne
    private ProductCategory category;
}
