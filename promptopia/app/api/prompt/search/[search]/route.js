import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

// GET
export const GET= async (req,{params}) => {
    try{
        await connectToDatabase();
        const { search } = params;
        console.log(search);
        const prompts = await Prompt.find({
            $or: [
                { prompt: { $regex: search, $options: "i" } },
                { tag: { $regex: search, $options: "i" } }
            ]
        }).populate('creator').exec();
        console.log(prompts);
        return new Response(JSON.stringify(prompts), { status: 200 });
    }  
    catch(err){
       console.log(err);
       return new Response("Failed to get prompt", { status: 500 });
    } 
}