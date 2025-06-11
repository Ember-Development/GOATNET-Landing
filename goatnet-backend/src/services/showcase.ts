import prisma from "../../prisma/client";

export const attractionService = {
  getAllShowcase: async () => {
    return prisma.attraction.findMany({
      where: { showOnLanding: true },
      orderBy: { landingOrder: "asc" },
    });
  },

  createAttraction: async (
    title: string,
    caption: string,
    imageUrl: string,
    videoUrl: string,
    type: string,
    channels: string[],
    showOnLanding: boolean,
    landingOrder?: number
  ) => {
    return prisma.attraction.create({
      data: {
        title,
        description: caption,
        imageUrl,
        videoUrl,
        type,
        channels: {
          connect: channels.map((channelId) => ({ id: channelId })),
        },
        showOnLanding,
        landingOrder,
      },
      include: {
        channels: true,
      },
    });
  },

  updateAttraction: async (
    id: string,
    title: string,
    caption: string,
    imageUrl: string,
    videoUrl: string,
    type: string,
    channels: string[],
    showOnLanding: boolean,
    landingOrder?: number
  ) => {
    return prisma.attraction.update({
      where: { id },
      data: {
        title,
        description: caption,
        imageUrl,
        videoUrl,
        type,
        channels: {
          set: channels.map((channelId) => ({ id: channelId })),
        },
        showOnLanding,
        landingOrder,
      },
      include: {
        channels: true,
      },
    });
  },

  deleteAttraction: async (id: string) => {
    return prisma.attraction.delete({ where: { id } });
  },
};
