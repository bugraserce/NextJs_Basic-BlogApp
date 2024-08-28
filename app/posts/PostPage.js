"use client"
import axios from 'axios'
import Link from 'next/link';
import React, { useState, useEffect } from 'react'

const PostPage = () => {
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/posts');
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${postId}`);
      const filteredData = posts.filter((post) => post.id !== postId )
      setPosts(filteredData)
    } catch (error) {
      console.error('Error deleting post:', error);
      // Optionally handle error
    }
  };



  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Blog Posts</h1>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl text-gray-600">Posts</h2>
        <Link href="/posts/create" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          Create New Post
        </Link>

      </div>
      {posts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Title</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Content</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700">{post.id}</td>
                  <td className="py-3 px-4 text-gray-700">{post.title}</td>
                  <td className="py-3 px-4 text-gray-700">{post.content}</td>
                  <td className="py-3 px-4 text-gray-700">
                    <Link href={`/posts/${post.id}?mode=read`}>
                      <button className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600 transition duration-300">Read</button>
                    </Link>

                    <Link href={`/posts/${post.id}?mode=edit`}>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition duration-300">Edit</button>                    
                    </Link>
                    <button onClick={() => handleDelete(post.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No posts available.</p>
      )}
    </div>
  )
}

export default PostPage;
