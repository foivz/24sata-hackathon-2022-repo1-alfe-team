import pick from "lodash.pickby";
import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../lib/middleware/auth";
import { returnError } from "../../../lib/middleware/error";
import { prisma } from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const session = (await withAuth(req)) as any;

		switch (req.method) {
			case "GET":
				const user = await prisma.user.findFirst({
					where: {
						id: session.user_id,
					},
				});
				res.json(user);

				break;

			case "PATCH":
				const d = pick(req.body, (v) => v !== undefined);

				const useredit = await prisma.user.update({
					where: {
						id: session.user_id,
					},
					data: d,
				});
				res.json(useredit);

				break;
			default:
				break;
		}
	} catch (error: any) {
		returnError(error, req, res, null);
	}
};

export default handler;
