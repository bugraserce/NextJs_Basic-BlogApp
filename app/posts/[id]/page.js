"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const ReadPost = () => {
  const { id } = useParams(); // Get dynamic parameter
  const searchParamQuery = useSearchParams();
  const mode = searchParamQuery.get('mode')

  const [post, setPost] = useState(null);
  const [edit, setEdit] = useState(mode === 'edit');
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter(); // Router for programmatic navigation

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${id}`);
        setPost(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error('Error fetching post:', error);
        // Optionally handle error or redirect
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  useEffect(() => {
    setEdit(mode === 'edit') //if the mode is edit that means edit is true

  },[mode])

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/posts/${id}`, { title, content });
      setPost(response.data); // Update post with new data
      setEdit(false); // Switch back to view mode
    } catch (error) {
      console.error('Error saving post:', error);
      // Optionally handle error
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`);
      router.push('/'); // Redirect to homepage or any other page after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
      // Optionally handle error
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      {edit ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Edit Post</h1>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">Title</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 text-sm font-semibold mb-2">Content</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="6"
              placeholder="Enter post content"
            ></textarea>
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Save
            </button>
            <button
              onClick={handleEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {post ? (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
              <p className="text-lg text-gray-700 mb-4">{post.content}</p>
              <div className="flex gap-4">
                <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                  Home
                </Link>
                <button
                  onClick={handleEdit}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-600">Post not found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReadPost;
