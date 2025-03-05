// import { Card, CardContent } from "@/components/ui/card";
// import { motion } from "framer-motion";
import './App.css'
import { Header } from './components/header';
import PostList from "./PostList";

function HomePage() {
  return (
    <>
      <Header />
      <PostList />
    </>
  );
}

export default HomePage
