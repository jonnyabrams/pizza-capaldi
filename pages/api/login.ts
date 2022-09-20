import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

import dbConnect from "../../utils/mongo";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { username, password } = req.body;
    if (
      username === process.env.USERNAME &&
      password === process.env.PASSWORD
    ) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", process.env.TOKEN!, {
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json("Successful");
    } else {
      res.status(400).json("Wrong credentials");
    }
  }
};

export default handler;
