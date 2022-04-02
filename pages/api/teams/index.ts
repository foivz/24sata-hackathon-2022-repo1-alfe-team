import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../lib/middleware/auth";
import { returnError } from "../../../lib/middleware/error";
import { prisma } from "../../../lib/prisma";

// GET - /api/complaint?id=id - get complaint by id
// GET - /api/complaint?page=page - get all complaints
// POST - /api/complaint - create complaint

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		switch (req.method) {
			case "GET":
				const session1 = (await withAuth(req, false)) as any;

				const complaint = await prisma.teams.findMany({
					where: {
						TeamsAndUser: {
							some: {
								userId: session1?.user_id,
							},
						},
					},
					include: {
						TeamsAndUser: true,
					},
				});

				res.status(200).json(complaint);

				break;
			case "POST":
				const session = (await withAuth(req)) as any;
				const { name } = req.body;
				const create = await prisma.teams.create({
					data: {
						name: name,
						ownerId: session.user_id,
					},
				});

				res.json({
					success: true,
				});
			// const complaint = await prisma.complaint.create({
			// 	data: {
			// 		description: description,
			// 		userId: (session as any).user_id,
			// 		title: title,
			// 	},
			// });

			// res.status(200).json(complaint);

			default:
				break;
		}
	} catch (error: any) {
		returnError(error, req, res, null);
	}
};

export default handler;
