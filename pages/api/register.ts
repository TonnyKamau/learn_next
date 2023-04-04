import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const { email, name, password } = req.body;
    const userExists = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      return res.status(422).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image:'',
        emailVerified: new Date(),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Internal server error" });
  }
}
