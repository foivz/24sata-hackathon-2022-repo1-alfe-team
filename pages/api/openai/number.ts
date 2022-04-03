import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { withAuth } from "../../../lib/middleware/auth";
import { prisma } from "../../../lib/prisma";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = req.query;
  const session = (await withAuth(req)) as any;
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: `Predict the next number in the sequence, answer with only a number: ${data}`,
    max_tokens: 4,
    temperature: 0.7,
  });
  const GPT3Response = completion.data;
  const recommendedItems = (GPT3Response as any).choices[0].text.trim()
  res.json({
    recommendedItems,
  })
};

export default handler;
