import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import './App.css'
import axios from "axios";
import { Post } from "./types/post.ts";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const testMode = false;
  const navigate = useNavigate();

  // fetch posts from server
  useEffect(() => {
    axios.get<Post[]>("http://localhost:8080/api/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  const newPost = () => {
    navigate("/post");
  };


  console.log(posts);
  if (!posts) return <p>Loading...</p>;
  else if (posts.length === 0) return (
    <>
      <div className="header">
        <h1>the corkboard.</h1>
        <button className="post-button" onClick={newPost}>new post.</button>
      </div>
      <p className="posts-container">no new posts.</p>
    </>
  );
  else if (testMode) return (
    <>
      <div className="header">
        <h1>the corkboard.</h1>
        <button className="post-button" onClick={newPost}>new post.</button>
      </div>
      <div className="posts-container">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <p className="user">{post.username || "anonymous"} @ {DateTime.fromISO(post.createdAt).toFormat("LLL dd, h:mm a").toLowerCase()}</p>
            <p className="content">{post.content}</p>
            {post.filePath && <img src={`http://localhost:8080${post.filePath}`} alt="post" style={{ maxWidth: "100%" }} />}
          </div>
        ))}
      </div>
    </>
  );
  else return (
    <>
      <div className="header">
        <h1>the corkboard.</h1>
        <button className="post-button" onClick={newPost}>new post.</button>
      </div>
      <div className="posts-container">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <p className="user">{post.username || "anonymous"} @ {DateTime.fromISO(post.createdAt).toFormat("LLL dd, h:mm a").toLowerCase()}</p>
            <p className="content">{post.content}</p>
            {post.filePath && <img src={`http://localhost:8080${post.filePath}`} alt="post" style={{ maxWidth: "100%" }} />}
          </div>
        ))}
      </div>
    </>
  );
}