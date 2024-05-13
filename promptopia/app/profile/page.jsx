"use client";

import {useState,useEffect} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

import Profile from "@components/Profile";
  
const MyProfile = () => {
  const router = useRouter();
  const {data: session} = useSession();
  const [posts,setPosts] = useState([]);

  const handleEdit = async (data) => {
    router.push(`/update-prompt?id=${data._id}`);
  }
  
  const handleDelete = async (data) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    if(hasConfirmed){
      try{
        const res = await fetch(`/api/prompt/${data._id}`,{
          method:"DELETE"
        })
        if(res.ok){
          const updatedPosts = posts.filter((post) => post._id !== data._id);
          setPosts(updatedPosts);
        }
      
      }
      catch(err){
        console.error(err)
      }
    }
  } 

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
    }
    if(session?.user.id) {
      fetchData();
    }
  },[])

  return (
    <Profile
      name={session?.user.name}
      desc=""
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile