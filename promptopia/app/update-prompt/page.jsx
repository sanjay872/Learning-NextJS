"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import  {useRouter,useSearchParams} from "next/navigation"
import Form from "@components/Form"

const UpdatePrompt = () => {
  const router = useRouter();
  const {data:session} = useSession()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt:"",
    tag:""
  })
  const searchParams = useSearchParams();
  const id = searchParams.get('id')


  useEffect(() => {
    const getPromptDetails= async () => {
        const res = await fetch(`/api/prompt/${id}`)
        const data = await res.json()
        setPost(data)
    }
    if(id) getPromptDetails()
  },[id])

  const updatePrompt= async (e) => {
    e.preventDefault()
    setSubmitting(true)
    if(!id){
      return alert("Prompt not found")
    }
    try{
      const res = await fetch(`/api/prompt/${id}`,{
        method:"PATCH",
        body:JSON.stringify({
          prompt:post.prompt,
          tag:post.tag
        })
      })
      if(res.ok){
        router.push('/')
      }
    }
    catch(err){
      console.error(err)
    }
    finally{
      setSubmitting(false)
    }

  }

  return (
    <Form 
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={(e) => updatePrompt(e)}
    />
  )
}

export default UpdatePrompt