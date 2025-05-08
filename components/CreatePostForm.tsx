"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import MenuBar from "./MenuBar";

export default function CreatePostForm() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3 m-10",
      },
    },
  });
  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent 
        editor={editor} />
    </div>
  );
}
