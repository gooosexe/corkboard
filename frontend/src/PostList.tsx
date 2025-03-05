import React, { useState, useEffect } from "react"
import axios from "axios"
import { DateTime } from "luxon"
import Post from "./Post" // Assuming the Post component is already created
import Masonry from "react-masonry-css"

interface PostData {
  id: number
  username: string
  createdAt: string
  content: string
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([])
	const breakpointColumnsObj = {
    default: 6,
    1100: 5,
    700: 4,
    500: 3,
    300: 2,
    100: 1
  };

  useEffect(() => {
    // Fetch posts from the server
    axios
      .get<PostData[]>("http://192.168.196.195:8080/api/posts")
      .then((res) => {
        // Reverse the posts array to display in reverse order
        setPosts(res.data.reverse())
      })
      .catch((err) => console.error(err))
  }, [])

	if (posts.length === 0) return <p>no new posts.</p>
  return (
    <div className="posts-container">
			<Masonry
          breakpointCols={breakpointColumnsObj}
          className="posts-container"
          columnClassName="my-masonry-grid_column"
        >
				{posts.map((post) => (
					<Post
						key={post.id}
						author={post.username || "anonymous"}
						date={DateTime.fromISO(post.createdAt).toRelative() || "just now"}
						content={post.content}
						postNumber={post.id}
					/>
				))}
			</Masonry>
    </div>
  )
}

export default PostList