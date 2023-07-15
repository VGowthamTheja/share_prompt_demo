"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((prompt) => (
        <PromptCard
          key={prompt._id}
          post={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // fetch data
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleSearch = (e) => {};
  return (
    <section className="feed">
      <form className="relative w-full flex-center" action="">
        <input
          className="search_input peer w-full"
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearch}
          required
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
