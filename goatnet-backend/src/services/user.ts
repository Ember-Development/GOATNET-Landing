import prisma from "../../prisma/client";

export const userService = {
  getAll: () => prisma.user.findMany(),
  getById: (id: string) => prisma.user.findUnique({ where: { id } }),
  update: (
    id: string,
    data: Partial<{
      name: string;
      imageUrl: string;
      link: string;
      showOnLanding: boolean;
      landingOrder: number;
    }>
  ) => prisma.user.update({ where: { id }, data }),
  delete: (id: string) => prisma.user.delete({ where: { id } }),
};
