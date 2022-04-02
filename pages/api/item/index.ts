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

				const team1 = await prisma.items.create({
					data: {
						userId: session.user_id,
						price: parseInt(price) ?? 0,
						name: name,
						source: {
							connect: {
								id: "cl1hsw3qr0132qse0ndfa8bzv",
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
