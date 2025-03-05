import { useEffect, useState } from "react";
import { DateTime } from "luxon";
// import { Card, CardContent } from "@/components/ui/card";
// import { motion } from "framer-motion";
import './App.css'
import axios from "axios";
import { PostData } from "@/types/postdata";
import Post from "@/Post";
import { Header } from './components/header';
import { Masonry } from 'react-masonry-css';

function HomePage() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const testMode = false;

  // fetch posts from server
  useEffect(() => {
    axios.get<PostData[]>("http://192.168.196.195:8080/api/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  

  console.log(posts);
  if (!posts) return <p>Loading...</p>;
  else if (testMode) return (
    <>
      <Header />
      <div className="posts-container">
        <Post 
          author={"anonymous"} 
          date={"jan 1, 00:00"} 
          content={"test post"} 
          postNumber={1}
        />
      </div>
    </>
  );
  else if (posts.length === 0) return (
    <>
      <Header />
      <p className="posts-container">no new posts.</p>
    </>
  );
  else return (
    <>
      <Header />
        <Masonry
          breakpointCols={{default: 3, 1100: 2, 700: 1}}
          className="posts-container"
          columnClassName="my-masonry-grid_column"
        >
        {posts.map((post) => (
          <Post 
            author={post.username || "anonymous"}
            date={DateTime.fromISO(post.createdAt).toFormat("LLL d, h:mm a").toLowerCase()} 
            content={post.content} 
            postNumber={post.id}
          />
        ))}
        </Masonry>
    </>
  );
}

export default HomePage
