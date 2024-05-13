import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

// GET
export const GET= async (req,{params}) => {
    try{
           await connectToDatabase();
           const prompt = await Prompt.findById( params.id)
           .populate('creator');
           if(!prompt){
               return new Response("Prompt not found", { status: 404 });
           }
           //console.log(prompts);
           return new Response(JSON.stringify(prompt), { status: 200 });
    }  
    catch(err){
       console.log(err);
       return new Response("Failed to get prompt", { status: 500 });
    } 
}

// PATCH
export const PATCH= async (req,{params}) => {
    const {prompt,tag} = await req.json();

    try{
        await connectToDatabase();
        const updatedPrompt = await Prompt.findByIdAndUpdate(params.id,{
            prompt,
            tag
        },{new:true});
        if(!updatedPrompt){
            return new Response("Prompt not found", { status: 404 });
        }
        return new Response(JSON.stringify(updatedPrompt), { status: 200 });
    }
    catch(err){
        console.log(err);
        return new Response("Failed to update prompt", { status: 500 });
    }
}

// DELETE
export const DELETE= async (req,{params}) => {
    try{
        await connectToDatabase();
        const deletedPrompt = await Prompt.findByIdAndDelete(params.id);
        if(!deletedPrompt){
            return new Response("Prompt not found", { status: 404 });
        }
        return new Response(JSON.stringify(deletedPrompt), { status: 200 });
    }
    catch(err){
        console.log(err);
        return new Response("Failed to delete prompt", { status: 500 });
    }
}