import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  const { prompt, tag, userId } = await req.json();
//   console.log("At post request");
//   console.log(prompt, tag, userId);
  try {
    await connectToDatabase();
    const newPrompt = await Prompt({
      creator: userId,
      prompt:prompt,
      tag:tag,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to create prompt", { status: 500 });
  }
}