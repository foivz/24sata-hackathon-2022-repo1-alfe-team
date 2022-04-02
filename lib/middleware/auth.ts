import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { NotAllowed } from "../const";

export const withAuth = async (req: NextApiRequest, error: boolean = true) => {
	const session = await getSession({ req });
	if (session) {
		return session;
	} else if (error) {
		throw new NotAllowed();
	}
};
