"use client";
import { useState } from "react";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "./ui/input";
import Loading from "./ui/loading";
import { Button } from "./ui/button";
import RichTextEditor from "./editor/RichTextEditor";

export default function NewPostForm() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/posts/${data.slug}`);
        toast("Post created successfully! :D");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error("Error creating post: ", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-full max-w-md p-4 mx-auto bg-white rounded-lg shadow-md"
    >
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Post title"
        />
      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <RichTextEditor content={content} setContent={setContent} />
      </div>

      <Button type="submit" disabled={loading} className="mt-4">
        Create Post
      </Button>
    </form>
  );
}
