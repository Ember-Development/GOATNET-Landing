import prisma from "../../prisma/client";

export const solutionService = {
  getAllTabs: async () => {
    return prisma.solutionTab.findMany({ include: { items: true } });
  },
  createTab: async (name: string, tagline: string) => {
    return prisma.solutionTab.create({ data: { name, tagline } });
  },
  updateTab: async (id: number, name: string, tagline: string) => {
    return prisma.solutionTab.update({
      where: { id },
      data: { name, tagline },
      include: { items: true },
    });
  },
  deleteTab: async (id: number) => {
    return prisma.solutionTab.delete({ where: { id } });
  },

  createItem: async (
    tabId: number,
    title: string,
    tag: string,
    description: string
  ) => {
    return prisma.solutionItem.create({
      data: { tabId, title, tag, description },
    });
  },
  updateItem: async (
    id: number,
    title: string,
    tag: string,
    description: string
  ) => {
    return prisma.solutionItem.update({
      where: { id },
      data: { title, tag, description },
    });
  },
  deleteItem: async (id: number) => {
    return prisma.solutionItem.delete({ where: { id } });
  },
};
