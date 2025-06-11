import prisma from "../../prisma/client";

export const partnerService = {
  getAll: async () => {
    return prisma.partnerItem.findMany({ orderBy: { order: "asc" } });
  },
  create: async (
    name: string,
    imageUrl: string,
    link: string,
    order?: number
  ) => {
    return prisma.partnerItem.create({
      data: { name, imageUrl, link, order },
    });
  },
  update: async (
    id: string,
    name: string,
    imageUrl: string,
    link: string,
    order?: number
  ) => {
    return prisma.partnerItem.update({
      where: { id },
      data: { name, imageUrl, link, order },
    });
  },
  delete: async (id: string) => {
    return prisma.partnerItem.delete({ where: { id } });
  },
};
