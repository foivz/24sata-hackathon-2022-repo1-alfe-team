import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { BaseError, ReturnServerError, UnknownError } from "../const";

export function returnError(err: Error, req: any, res: any, next: any) {
	if (err instanceof BaseError) {
		res.status(err.statusCode || 500).send({
			name: err.name,
			message: err.message,

			errorData: err?.errorData,
		} as ReturnServerError);
	} else {
		// Unknown error happened
		const internal = new UnknownError();

		res.status(500).send({
			message: internal.message,
			name: internal.name,
		} as ReturnServerError);
	}
}

export const withError =
	(handler: NextApiHandler) =>
	async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			await handler(req, res);
		} catch (error: any) {
			console.log("throw se dog", JSON.stringify(error, null, 2));

			returnError(error, req, res, null);
		}
	};
