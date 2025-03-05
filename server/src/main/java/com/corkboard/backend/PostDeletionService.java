package com.corkboard.backend;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PostDeletionService {

    private final PostRepository postRepository;

    @Scheduled(fixedRate = 300000)
    @Transactional // ensures that the method is executed within a transaction, rolls back if exception
    public void deleteExpiredPosts() {
        postRepository.deleteByCreatedAtBefore(LocalDateTime.now().minusDays(1));
    }
}
