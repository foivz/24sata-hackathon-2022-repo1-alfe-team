import { NextApiRequest, NextApiResponse } from "next";
import { ComplaintNotFound } from "../../lib/const";
import { withAuth } from "../../lib/middleware/auth";
import { withError } from "../../lib/middleware/error";

// GET - /api/complaint?id=id - get complaint by id
// GET - /api/complaint?page=page - get all complaints
// POST - /api/complaint - create complaint

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case "GET":
			const id = req.query.id as string;

			const page = parseInt(req.query.page as string) || 1;

			if (id) {
				// const complaint = await prisma.complaint.findUnique({
				// 	where: {
				// 		id: id,
				// 	},
				// });

				if (!true) {
					throw new ComplaintNotFound();
				} else {
					res.status(200).json({});
				}
			} else {
				// const dd = await prisma.complaint.findMany({
				// 	take: 20,
				// 	skip: page * 20 - 20,
				// });
				// res.json(dd);
			}
		case "POST":
			const session = await withAuth(req);
			const { description, title } = req.body;

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
};

export default withError(handler);
