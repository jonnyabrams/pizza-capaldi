// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../utils/mongo";
import Pizza from "../../../models/Pizza";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const pizzas = await Pizza.find();
      res.status(200).json(pizzas);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "POST") {
    try {
      const pizza = await Pizza.create(req.body);
      res.status(201).json(pizza);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export default handler;
