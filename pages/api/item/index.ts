import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../lib/middleware/auth";
import { returnError } from "../../../lib/middleware/error";
import { prisma } from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const session = (await withAuth(req)) as any;

		switch (req.method) {
			case "GET":
				const team = await prisma.items.findMany({});
				res.json(team);

				break;
			case "POST":
				const { price, name } = req.body;
				console.log(session.user_id);

				const team1 = await prisma.items.create({
					data: {
						price: parseFloat(price) ?? 0,
						name: name,
						User: {
							connect: {
								id: session.user_id,
							},
						},
					},
				});
				res.json(team1);

				break;
			case "PATCH":
				// const spendingEdit = await prisma.spending.({
				// 	data: {
				// 		amount: amount,
				// 		userId: session.user_id,
				// 		teamsId: teamdId,
				// 		itemsId: itemId,
				// 	},
				// });
				// res.json(spendingEdit);

				break;
			default:
				break;
		}
	} catch (error: any) {
		console.log(error);

		returnError(error, req, res, null);
	}
};

export default handler;
