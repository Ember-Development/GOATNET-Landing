import prisma from "../../prisma/client";

export const newsletterService = {
  subscribe: async (email: string) => {
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });
    if (existing) {
      throw new Error("Email already subscribed");
    }
    return prisma.newsletterSubscriber.create({ data: { email } });
  },
};
