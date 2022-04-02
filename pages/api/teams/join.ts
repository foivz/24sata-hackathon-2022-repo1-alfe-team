import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../lib/middleware/auth";
import { returnError } from "../../../lib/middleware/error";
import { prisma } from "../../../lib/prisma";

// GET - /api/complaint?id=id - get complaint by id
// GET - /api/complaint?page=page - get all complaints
// POST - /api/complaint - create complaint

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const session = (await withAuth(req)) as any;

		switch (req.method) {
			case "GET":
				const teamIdQ = req.query.teamId as string;
				if (teamIdQ) {
					const team = await prisma.teamsAndUser.create({
						data: {
							teamsId: teamIdQ,
							userId: session.user_id,
						},
					});

					res.json(team);
				}

				break;
			default:
				break;
		}
	} catch (error: any) {
		returnError(error, req, res, null);
	}
};

export default handler;
