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
  const handleSearchChange = (e) => {

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

  useEffect(() => {    // Fetch prompts
    fetchPrompts();
  },[])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or a username....."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList 
        data={prompts}
        handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Feed