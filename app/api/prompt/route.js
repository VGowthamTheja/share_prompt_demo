import Prompt from "@/models/prompt";
import { connectToDatabase } from "@/utils/db";

export const GET = async (req, res) => {
  try {
    await connectToDatabase();
    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(error, {
      status: 500,
    });
  }
};
