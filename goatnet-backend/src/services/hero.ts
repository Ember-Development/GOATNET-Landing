import prisma from "../../prisma/client";

export const heroService = {
  getHero: async () => {
    return prisma.heroSection.findFirst();
  },

  upsertHero: async (desktopVideoUrl: string, mobileVideoUrl: string) => {
    const existing = await prisma.heroSection.findFirst();
    if (existing) {
      return prisma.heroSection.update({
        where: { id: existing.id },
        data: { desktopVideoUrl, mobileVideoUrl },
      });
    }
    return prisma.heroSection.create({
      data: { desktopVideoUrl, mobileVideoUrl },
    });
  },
};
