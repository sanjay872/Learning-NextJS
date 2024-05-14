"use client";

import {useState,useEffect} from "react";

import Profile from "@components/Profile";
  
const OtherProfile = ({params}) => {

  const [name,setName] = useState("");
  const [posts,setPosts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      console.log(params);
      const userDetail= await fetch(`/api/users/${params.id}`);
      const userData = await userDetail.json();
      // console.log(userData);
      setName(userData.username);
      const res = await fetch(`/api/users/${params.id}/posts`);
      const data = await res.json();
      setPosts(data);
    }
    if(params) {
      fetchData();
    }
  },[])

  return (
    <Profile
      name={name}
      desc=""
      data={posts}
    />
  )
}

export default OtherProfile