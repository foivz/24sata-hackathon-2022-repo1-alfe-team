import * as cheerio from "cheerio";
import { NextApiRequest, NextApiResponse } from "next";
import { returnError } from "../../../lib/middleware/error";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		switch (req.method) {
			case "GET":
				const url = req.query.url as string;

				if (url) {
					const site = await fetch(url, { method: "GET" });
					// get price meta tag from site using cheerio
					const $ = cheerio.load(await site.text());
					// parse the jsonld data

					const r = $("script[type='application/ld+json']");

					// parse each script tag
					for (let i = 0; i < r.length; i++) {
						const json = JSON.parse($(r?.[i]).html() ?? "");
						console.log(json);

						if (json.hasOwnProperty("offers")) {
							res.json({
								price: json.offers.price,
								name: json.name,
								status: "SUCCESS",
							});

							return;
						}
					}

					res.json({
						status: "NONE",
					});
				}

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
