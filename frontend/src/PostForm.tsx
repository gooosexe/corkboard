"use client"

import axios from "axios";
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import "./App.css"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "./components/ui/textarea"

const maxCharacters = 500;
const maxUsername = 20;

const formSchema = z.object({
  username: z.string().max(maxUsername, {
    message: "keep it short and sweet.",
  }),
	content: z.string().min(1, {
		message: "no point in saying nothing.",
	}).max(maxCharacters, {
    message: "keep it short and sweet.",
  }),
})

export function PostForm() {
	const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
 
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    if (values.username.length == 0) {
      values.username = "anonymous";
    }
    formData.append("username", values.username);
    formData.append("content", values.content);
    
    // if (image) formData.append("image", image);
    
    try {
      // sent POST request to the server
      const response = await axios.post("http://localhost:8080/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
			console.log(response);
      navigate("/");
    } catch (err) {
      console.error(err);
      if (err instanceof Error) alert(`Failed to create post: ${err.message}`);
      else alert('Failed to create post');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-16 max-w-2xl mx-auto">

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>username</FormLabel>
              <FormControl>
                <Input placeholder="your username. leave blank for anonymous." className="placeholder:text-muted-foreground" {...field} 
                  onChange={(e) => {
                    if (e.target.value.length <= maxUsername) {
                      field.onChange(e);
                    }
                  }}
                />
              </FormControl>
              <div className="text-right text-sm text-muted-foreground">
                {(field.value ?? "").length} / {20}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>content</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="the content of your post. play nice." className="placeholder:text-muted-foreground"{...field} 
                  onChange={(e) => {
                    if (e.target.value.length <= maxCharacters) {
                      field.onChange(e);
                    }
                  }}
                />
              </FormControl>
              <div className="text-right text-sm text-muted-foreground">
                {(field.value ?? "").length} / {500}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default PostForm;