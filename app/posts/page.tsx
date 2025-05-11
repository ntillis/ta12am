export const metadata = {
  title: 'Recent Posts | ta12am',
  description: 'A list of all of my recent posts',
}

import BlogGrid from "@/components/BlogGrid";
import React from "react";

async function page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center m-4">
        <h1>New Posts</h1>
        <BlogGrid />
      </div>
    </>
  );
}

export default page;
