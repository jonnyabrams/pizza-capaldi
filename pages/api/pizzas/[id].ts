// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../utils/mongo";
import Pizza from "../../../models/Pizza";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { id },
    cookies,
  } = req;

  const token = cookies.token;

  await dbConnect();

  if (method === "GET") {
    try {
      const pizza = await Pizza.findById(id);
      res.status(200).json(pizza);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "PUT") {
    if (!token || token !== process.env.token) {
      return res.status(401).json("You are not authenticated");
    }
    try {
      const pizza = await Pizza.create(req.body);
      res.status(201).json(pizza);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "DELETE") {
    if (!token || token !== process.env.token) {
      return res.status(401).json("You are not authenticated");
    }
    try {
      await Pizza.findByIdAndDelete(id);
      res.status(201).json("Product deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export default handler;
