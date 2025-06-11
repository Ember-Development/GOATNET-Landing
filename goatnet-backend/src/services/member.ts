// src/services/member.service.ts
import prisma from "../../prisma/client";

export type LandingCredentialInput = {
  name: string;
  link?: string;
  imageUrl?: string;
  landingOrder: number;
};

export const credentialService = {
  getAllLandingCredentials: async () => {
    return prisma.user.findMany({
      where: { showOnLanding: true },
      orderBy: { landingOrder: "asc" },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        link: true,
        landingOrder: true,
      },
    });
  },

  createLandingCredential: async (data: LandingCredentialInput) => {
    // NEED TO COME BACK TO THIS/ MIGHT BE EASIER TO SPLIT CREDENTIAL INTO ITS OWN TABLE AND JUST OPTIONALLY CONNECT USER ID?
    // HOW THAT CONNECTION HAPPENS NEEDS TO BE WEEDED OUT
    // RUN INTO A BASEBALLCLOUD ISSUE WITH HOW DO WE ACCURATELY CONNECT USER TO CRED WITH OUT IT BEING A FREE FOR ALL/ WHATS THE IDENTIFIER

    const placeholderEmail = `landing_${Date.now()}@example.com`;
    const placeholderPassword = "CHANGE_ME"; // ideally hash one

    const created = await prisma.user.create({
      data: {
        email: placeholderEmail,
        password: placeholderPassword,
        role: "VIEWER",
        name: data.name,
        link: data.link,
        imageUrl: data.imageUrl,
        showOnLanding: true,
        landingOrder: data.landingOrder,
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        link: true,
        landingOrder: true,
      },
    });

    return created;
  },

  updateLandingCredential: async (args: {
    id: number;
    name: string;
    link?: string;
    imageUrl?: string;
    landingOrder: number;
  }) => {
    const { id, name, link, imageUrl, landingOrder } = args;
    return prisma.user.update({
      where: { id: String(id) },
      data: {
        name,
        link,
        imageUrl,
        landingOrder,
        showOnLanding: true,
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        link: true,
        landingOrder: true,
      },
    });
  },

  deleteLandingCredential: async (id: number) => {
    // We’ll simply delete the user record entirely. If you prefer to only toggle
    return prisma.user.delete({ where: { id: String(id) } });
  },
};
