import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../utils/mongo";
import Order from "../../../models/Order";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method === "GET") {
  }
  if (method === "PUT") {
  }
  if (method === "DELETE") {
  }
};

export default handler;
