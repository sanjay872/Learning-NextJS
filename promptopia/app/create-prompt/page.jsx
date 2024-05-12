"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import  {useRouter} from "next/navigation"
import Form from "@components/Form"

const CreatePrompt = () => {
  const router = useRouter();
  const {data:session} = useSession()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt:"",
    tag:""
  })

  const createPrompt= async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try{
      // console.log("At createPrompt")
      // console.log(post)
      const res = await fetch('/api/prompt/new',{
        method:"POST",
        // headers:{
        //   'Content-Type':'application/json'
        // },
        body:JSON.stringify({
          prompt:post.prompt,
          tag:post.tag,
          userId:session?.user.id
        })
      })
      if(res.ok){
        //setPost({prompt:'',tag:''})
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
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt