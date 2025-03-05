import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom";

export function Header() {
	const navigate = useNavigate();

	const newPost = () => {
    navigate("/post");
  };

  return (
 	 	<div className="header">
    	<h1 className='text-5xl font-bold'>the corkboard.</h1>
      <div className="flex items-end space-x-3">
        <ModeToggle />
        <Button onClick={newPost}>new post.</Button>
      </div>
    </div>
   )
}