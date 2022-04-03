import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { withAuth } from "../../../lib/middleware/auth";
import { prisma } from "../../../lib/prisma";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, type } = req.query;
  const session = (await withAuth(req)) as any;
  switch (type) {
    case "items_recommend_for_user":
      const itemsThatPersonBought = await prisma.spending.findMany({
        where: {
          userId: session.userId,
        },
        include: {
          item: true,
        },
      });
      const itemsThatPersonBoughtIds = itemsThatPersonBought
        .map(
          (el) => `User bought ${el.amount} ${el.item.name} on ${el.createdAt}`
        )
        .reduce((acc, cur) => acc + `\n${cur}`, "");
      const completion = await openai.createCompletion("text-davinci-002", {
        prompt: `${itemsThatPersonBoughtIds}\nRecommend items for Roko based on shopping habits. Display only item names, separated with commas.`,
        max_tokens: 200,
        temperature: 0.7,
      });
      const GPT3Response = completion.data;
      const recommendedItems = (GPT3Response as any).choices[0].text
        .trim()
        .split(",")
        .map((el: any) => el.trim());
      //   const recommendedItemsIds = recommendedItems;
      console.log((GPT3Response as any).choices[0].text.trim());
      console.log(completion.data);
      res.json({
        recommendedItems,
      });
      break;
    case "items_recommend_for_team":
      const { teamId } = req.query;

      const itemsBoughtByTeam = await prisma.spending.findMany({
        where: {
          teamsId: String(teamId),
        },
        include: {
          item: true,
        },
      });
      const GPT3InputText = itemsBoughtByTeam
        .map(
          (el) => `User bought ${el.amount} ${el.item.name} on ${el.createdAt}`
        )
        .reduce((acc, cur) => acc + `\n${cur}`, "");
      const completionTeams = await openai.createCompletion(
        "text-davinci-002",
        {
          prompt: `${GPT3InputText}\nRecommend items for Roko based on shopping habits. Display only item names, separated with commas.`,
          max_tokens: 200,
          temperature: 0.7,
        }
      );
      const GPT3ResponseTeams = completionTeams.data;
      console.log(GPT3ResponseTeams);
      const recommendedItemsTeams = (GPT3ResponseTeams as any).choices[0].text
        .trim()
        .split(",")
        .map((el: any) => el.trim());
      //   const recommendedItemsIds = recommendedItems;
      console.log((GPT3ResponseTeams as any).choices[0].text.trim());
      console.log(completionTeams.data);
      res.json({
        recommendedItems: recommendedItemsTeams,
      });
      return;
    case "items_recommend_for_event":
      const { event, manual_add } = req.query;
      //   const itemsInDB = await prisma.items.findMany({});
      //   if (event) {
      const completionEvent = await openai.createCompletion(
        "text-davinci-002",
        {
          prompt: event
            ? `Preporuči namjernica za ${event} na hrvatskom, napiši samo nazive artikala odvojene zarezom.\n${manual_add}`
            : `Nastavi niz s sličnim namjernica.\n${manual_add}`,
          max_tokens: 200,
          temperature: 0.7,
          frequency_penalty: 0.5,
        }
      );
      //   }
      const GPT3ResponseEvents = completionEvent.data;
      console.log(GPT3ResponseEvents);
      const recommendedItemsEvents = (GPT3ResponseEvents as any).choices[0].text
        .trim()
        .split(",")
        .map((el: any) => el.trim());

      res.json({
        recommendedItems: recommendedItemsEvents,
      });
    default:
      break;
  }
  //   try {
  //     const completion = await openai.createCompletion("text-davinci-002", {
  //       prompt:
  //         "Create a shopping list with comma separated values using the following prompt: " +
  //         data,
  //       temperature: 0.7,
  //     });
  //     res.status(200).json({
  //       result: (completion as any).data.choices[0].text
  //         .replace(/\n/g, "")
  //         .split(", "),
  //     });
  //   } catch (err) {
  //     res.status(500).json({ error: err });
  //   }
};

export default handler;
