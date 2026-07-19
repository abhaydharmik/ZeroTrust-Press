import React, { useEffect, useState } from 'react'
import { getBlogs } from '../../services/adminService'
import toast from 'react-hot-toast'
import Loader from '../../components/common/Loader'
import BlogTable from '../../components/admin/BlogTable'
import Pagination from '../../components/admin/Pagination'

const Blogs = () => {

  const [blogs, setBlogs] = useState([])
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const fetchBlogs = async ( )=> {
    try {
      setLoading(true)

      const {data} = await getBlogs(page, 10, search)

      setBlogs(data.blogs)
      setPagination(data.pagination)
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load blogs.")
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBlogs()
    }, 400);
  
    return () => 
      clearTimeout(timer)
    
  }, [page, search])
  

  if(loading){
    return <Loader />
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Blogs</h1>

        <input type="text"
        placeholder='Search blogs....'
        value={search}
        onChange={(e)=> {
          setSearch(e.target.value)
          setPage(1)
        }}
       className='w-72 rounded-xl border px-4 py-3 outline-none focus:border-black'
       />
       </div>

      <BlogTable 
        blogs={blogs}
        refreshBlogs={fetchBlogs}
      />

      <Pagination currentPage={pagination.currentPage}
      totalPages={pagination.totalPages}
      onPageChange={setPage}
      />

      </div>
  )
}

export default Blogs