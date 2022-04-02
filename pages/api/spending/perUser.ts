import { Spending } from "@prisma/client";
import { groupBy } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../lib/middleware/auth";
import { returnError } from "../../../lib/middleware/error";
import { prisma } from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = (await withAuth(req)) as any;

    switch (req.method) {
      case "GET":
        const teamId = req.query.teamId as string;
        if (teamId) {
          const te = await prisma.spending.findMany({
            where: {
              teamsId: teamId,
            },
          });

          const t11 = groupBy(te, (t) => t.userId) as any as {
            [key: string]: Spending[];
          };

          // for each t11 reduce to total
          let final = Object.keys(t11).map((k) => {
            return {
              id: k,
              sum: t11[k].reduce((a, b) => a + b.amount * b.price, 0),
            };
          });

          // convert array of objects to one object where id is key and sum is value
          const erer = final.reduce((a: any, b: any) => {
            a[b.id] = b.sum;
            return a;
          }, {});

          res.json(erer);
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
