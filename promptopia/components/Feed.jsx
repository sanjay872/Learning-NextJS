"use client"

import { useState,useEffect } from "react"

import PromptCard from "./PromptCard"

const PromptCardList = ({data,handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
        <PromptCard 
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState([]);
  const [searchTimeOut, setSearchTimeOut] = useState(null); // Timeout for search
  
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);
  }

  const handleTagClick = (tag) => {
    tag = tag.replace("#",""); // Remove # from tag
    setSearchText(tag);
  }
  
  const fetchPrompts = async () => {
    const res = await fetch("/api/prompt");
    //console.log("before data");
    const data = await res.json();
    //console.log("after data");
    //console.log(data);
    setPrompts(data);
    //console.log(prompts);
  }

  useEffect(() => {
    if(searchText.length > 0){
      setSearchTimeOut(setTimeout(async () => {
        console.log(searchText);
        const res = await fetch(`/api/prompt/search/${searchText}`);
        const data = await res.json();
        setPrompts(data);
      }, 1000));
    } else {
      fetchPrompts();
    }
  },[searchText])    // Fetch prompts

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or a content....."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList 
        data={prompts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed