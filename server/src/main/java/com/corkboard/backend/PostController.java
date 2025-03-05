package com.corkboard.backend;

import com.corkboard.backend.exceptions.PostNotFoundException;
import lombok.RequiredArgsConstructor;
import jakarta.servlet.http.HttpServletRequest;
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
    public List<Post> getAllPosts(HttpServletRequest request) {
        logGetRequest(request);
        return postRepository.findAll();
    }

    @PostMapping
    public Post createPost(@RequestParam("content") String content,
                           @RequestParam("username") String username,
                           @RequestParam(value="file", required = false) MultipartFile file,
                           HttpServletRequest request) throws IOException {
        logPostRequest(request, username);
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

    public void logPostRequest(HttpServletRequest request, String username) {
        System.out.println("Post request received from " + request.getRemoteAddr() + " under username " + username);
    }

    public void transferFile(MultipartFile file) throws IOException {
        file.transferTo(new java.io.File("uploads/" + file.getOriginalFilename()));
    }

    public void logGetRequest(HttpServletRequest request) {
        System.out.println("Get request received from " + request.getRemoteAddr());
    }
}
