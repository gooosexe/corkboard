import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import './App.css'
import axios from "axios";
import { Post } from "./types/post.ts";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const testMode = true;
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // fetch posts from server
  useEffect(() => {
    axios.get<Post[]>("http://localhost:8080/api/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  const newPost = () => {
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <Card className="p-6 w-96 text-center shadow-lg">
          <CardContent>
            <p className="mb-4">This is a popup!</p>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
    navigate("/post");
  };


  console.log(posts);
  if (!posts) return <p>Loading...</p>;
  else if (testMode) return (
    <>
      <div className="header">
        <h1>the corkboard.</h1>
        <button className="post-button" onClick={newPost}>new post.</button>
      </div>
      <div className="posts-container">
        <div className="post" key={1}>
          <p className="user">{"anonymous"} @ {"jan 1, 00:00"}</p>
          <p className="content">{"test post"}</p>
        </div>
        {/* {posts.map((post) => (
          <div className="post" key={post.id}>
            <p className="user">{post.username || "anonymous"} @ {DateTime.fromISO(post.createdAt).toFormat("LLL dd, h:mm a").toLowerCase()}</p>
            <p className="content">{post.content}</p>
            {post.filePath && <img src={`http://localhost:8080${post.filePath}`} alt="post" style={{ maxWidth: "100%" }} />}
          </div>
        ))} */}
      </div>
    </>
  );
  else if (posts.length === 0) return (
    <>
      <div className="header">
        <h1>the corkboard.</h1>
        <button className="post-button" onClick={newPost}>new post.</button>
      </div>
      <p className="posts-container">no new posts.</p>
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