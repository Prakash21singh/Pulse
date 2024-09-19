import prisma from "@repo/prisma/client";

async function createUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const existedUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existedUser) throw new Error("User already has been created");

    //Hash password and return it
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  } catch (error) {}
}
