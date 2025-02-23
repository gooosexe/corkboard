package com.corkboard.backend;

import com.corkboard.backend.exceptions.PostNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RestController // defines a REST api
@RequestMapping("/api/posts") // set base path
@CrossOrigin(originPatterns = "*") // allow requests from any origin
@RequiredArgsConstructor
public class PostController {

    private final PostRepository postRepository;

    @GetMapping
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPost(Long id) {
        return postRepository.findById(id).orElseThrow(() -> new PostNotFoundException(id));
    }

    @PostMapping
    public Post createPost(@RequestParam("content") String content,
                           @RequestParam("username") String username,
                           @RequestParam(value="file", required = false) MultipartFile file) throws IOException {
        String filePath;
        if (file != null && !file.isEmpty()) {
            filePath = "uploads/" + file.getOriginalFilename();
            file.transferTo(new java.io.File(filePath));
        } else {
            filePath = null;
        }

        Post post = new Post(content, username, filePath, LocalDateTime.now());
        return postRepository.save(post);
    }

    @Scheduled(fixedRate = 300000)
    public void deleteExpiredPosts() {
        List<Post> posts = postRepository.findByCreatedAtBefore(LocalDateTime.now().minusDays(1));
        postRepository.deleteAll(posts);
    }
}
