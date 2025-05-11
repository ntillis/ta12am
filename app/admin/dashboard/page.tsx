export const metadata = {
  title: 'Dashboard | ta12am',
  description: 'Admin dashboard to manage all blog content',
}

import DashBlogGrid from "@/components/admin/DashBlogGrid";
import Create from "@/components/admin/posts/Create";

async function page() {
  return (
    <>
      <div className="w-full max-w-7xl mx-auto p-10 mb-10">
        <h1 className="text-center text-2xl font-extrabold mb-3">Admin Dashboard</h1>
        <Create />
        <DashBlogGrid />
      </div>
    </>
  );
}

export default page;
