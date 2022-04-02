import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { NotAllowed } from "../const";

export const withAuth = async (req: NextApiRequest) => {
	const session = await getSession({ req });
	if (session) {
		return session;
	} else {
		throw new NotAllowed();
	}
};
