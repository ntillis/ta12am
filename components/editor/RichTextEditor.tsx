"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import MenuBar from "./MenuBar";
import TextAlign from "@tiptap/extension-text-align";
import CustomTabIndent from "./extensions/TabIndent";

interface RTEProps {
  content: string;
  setContent: (value: string) => void;
}

export default function RichTextEditor({ content, setContent }: RTEProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CustomTabIndent,
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "min-h-[256px] border rounded-md bg-slate-50 py-2 px-3",
      },
    },
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    // Optional: Sync initial content (if editing existing posts)
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return (
    <div className="w-full mx-auto border shadow-sm">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="prose" />
    </div>
  );
}
