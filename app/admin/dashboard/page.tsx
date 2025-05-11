import DashBlogGrid from "@/components/admin/DashBlogGrid"
import Create from "@/components/admin/posts/Create"

async function page() {
  return (
    <div className='w-4/5 mx-auto p-10 mb-10'>
        <h1 className="text-center text-2xl font-extrabold">Admin Dashboard</h1>
        <Create />
        <DashBlogGrid />
    </div>
  )
}

export default page