import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { data } = req.query;
    try{
        const completion = await openai.createCompletion("text-davinci-002", {
            prompt: "Create a shopping list with comma separated values using the following prompt: " + data,
            temperature: 0.7,
        });
        res.status(200).json({ result: (completion as any).data.choices[0].text.replace(/\n/g, "").split(",") });
    }catch(err){
        res.status(500).json({ error: err });
    }
};

export default handler;
