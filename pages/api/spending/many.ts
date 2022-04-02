import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../lib/middleware/auth";
import { returnError } from "../../../lib/middleware/error";
import { prisma } from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const session = (await withAuth(req)) as any;

		switch (req.method) {
			case "POST":
				const { items, teamsId } = req.body;
				console.log(teamsId);

				const itemsM = items.items.map((t: any) => {
					return {
						amount: t.amount,
						userId: session.user_id,
						teamsId: teamsId,
						price: t.price,
						itemsId: t.itemId,
					};
				});

				const team = await prisma.spending.createMany({
					data: itemsM,
				});
				res.json(team);

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
