package com.corkboard.backend;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Entity // specifies that the class is an entity and is mapped to a database table
@Table(name = "posts") // specifies the name of the database table to be used for mapping
@Getter @Setter // generates getters and setters for all fields
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    @Column(nullable = false, length=500)
    private String content;

    private String filePath;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Post(String content, String username, String filePath, LocalDateTime now) {
        this.content = content;
        this.username = username;
        this.filePath = filePath;
        this.createdAt = now;
    }
}
