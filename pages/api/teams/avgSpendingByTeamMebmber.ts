import { TeamsAndUser, User } from "@prisma/client";
import { groupBy } from "lodash";
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
        const teamId = req.query.teamId as string;
        const spendingByMember = await prisma.spending.groupBy({
          by: ["userId"],
          where: {
            teamsId: teamId,
          },
          
        });
        spendingByMember.forEach((el) => {
          el.userId
          // el.sum = el.reduce((acc, cur) => {
          //   return acc + cur.price * cur.amount;
          // }, 0);
        });

        res.json({});
        break;

      default:
        break;
    }
  } catch (error: any) {
    returnError(error, req, res, null);
  }
};

export default handler;
