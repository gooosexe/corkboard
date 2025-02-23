import { useState } from "react";
import './App.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PostForm() {
  const [username, setUsername] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("content", content);
    
    if (image) formData.append("image", image);
    
    try {
      // sent POST request to the server
      await axios.post("http://localhost:8080/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      navigate("/");
      alert('Post created');
    } catch (err) {
      console.error(err);
      if (err instanceof Error) alert(`Failed to create post: ${err.message}`);
      else alert('Failed to create post');
    }
    // add discreet notification that post was created
  };

  // TODO: Add title field
  return (
    <>
      <nav>
        <a href="/">Back</a>
      </nav>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username (optional)" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <textarea placeholder="Write something..." value={content} onChange={(e) => setContent(e.target.value)} required />
        <br />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        <button type="submit">Post</button>
      </form>
    </>
  );
}