import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../lib/middleware/auth";
import { returnError } from "../../../lib/middleware/error";
import { prisma } from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const session = (await withAuth(req)) as any;

		switch (req.method) {
			case "GET":
				const teamIdQ = req.query.teamId as string;
				if (teamIdQ) {
					const team = await prisma.spending.findMany({
						where: {
							teamsId: teamIdQ,
						},
						include: {
							team: true,
							item: true,
							user: true,
						},
					});
					res.json(team);
				}

				break;
			case "POST":
				const { amount, teamdId, itemId } = req.body;
				const team = await prisma.spending.create({
					data: {
						amount: amount,
						userId: session.user_id,
						teamsId: teamdId,
						itemsId: itemId,
					},
				});
				res.json(team);

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
		returnError(error, req, res, null);
	}
};

export default handler;
