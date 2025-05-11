export const metadata = {
  title: 'Create New Post | ta12am',
  description: 'Create a new blog post',
}

import NewPostForm from "@/components/NewPostForm";
import React from "react";

const page = () => {
  return (
    <>
      <NewPostForm />
    </>
  );
};

export default page;
