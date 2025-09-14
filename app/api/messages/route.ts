import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });
  return Response.json(messages);
}

export async function POST(req: Request) {
  const body = await req.json();
  const message = await prisma.message.create({
    data: { text: body.text },
  });
  return Response.json(message);
}
