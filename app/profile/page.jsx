"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@/components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    // fetch data
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    if (session?.user?.id) {
      fetchPosts();
    }
  }, []);

  const handleEdit = (post) => {
    // redirect to edit page
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (confirm) {
      // delete post
      try {
        const res = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const json = await res.json();
        if (!res.ok) throw Error(json.message);
        alert("Prompt deleted successfully");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <Profile
      name="My Profile"
      desc="Welcome to your profile page!"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
