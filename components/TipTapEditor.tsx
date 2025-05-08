"use client";

import {useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function TipTapEditor () {

    const editor = useEditor({
        extensions: [StarterKit],
        content: "<p>Edit this text! 🌱"
    })

  return (
        <div className="border p-4 rounded-md">
      {/* Toolbar */}
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={editor?.isActive('bold') ? 'font-bold text-blue-600' : ''}
        >
          Bold
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={editor?.isActive('italic') ? 'italic text-blue-600' : ''}
        >
          Italic
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={editor?.isActive('bulletList') ? 'text-blue-600' : ''}
        >
          Bullet List
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="prose max-w-none" />
    </div>
  )
}

export default TipTapEditor