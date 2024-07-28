package dev.canverse.finance.api.features.worksite.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JoinFormula;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "worksites")
@NoArgsConstructor
public class Worksite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "worksite", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<WorksiteSupervisor> worksiteSupervisors = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinFormula("(SELECT ws.id FROM worksite_supervisors ws WHERE " +
            "ws.active = true and " +
            "ws.worksite_id = id and " +
            "ws.start_date <= now() and (ws.end_date IS NULL OR now() <= ws.end_date) ORDER BY ws.id DESC LIMIT 1)")
    @Setter(AccessLevel.NONE)
    private WorksiteSupervisor currentSupervisor;
}
