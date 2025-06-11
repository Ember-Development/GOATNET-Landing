// services/about.ts
import prisma from "../../prisma/client";

export const aboutService = {
  getAbout: async () => {
    return prisma.aboutSection.findFirst();
  },

  upsertAbout: async (
    title: string,
    paragraphs: string[],
    youtubeUrl: string
  ) => {
    const existing = await prisma.aboutSection.findFirst();
    if (existing) {
      return prisma.aboutSection.update({
        where: { id: existing.id },
        data: { title, paragraphs, youtubeUrl },
      });
    }
    return prisma.aboutSection.create({
      data: { title, paragraphs, youtubeUrl },
    });
  },

  updateTitle: async (newTitle: string) => {
    const existing = await prisma.aboutSection.findFirst();
    if (!existing) {
      throw new Error("No AboutSection found.");
    }
    return prisma.aboutSection.update({
      where: { id: existing.id },
      data: { title: newTitle },
    });
  },

  updateYoutubeUrl: async (newUrl: string) => {
    const existing = await prisma.aboutSection.findFirst();
    if (!existing) {
      throw new Error("No AboutSection found.");
    }
    return prisma.aboutSection.update({
      where: { id: existing.id },
      data: { youtubeUrl: newUrl },
    });
  },

  addParagraph: async (text: string) => {
    const existing = await prisma.aboutSection.findFirst();
    if (!existing) {
      throw new Error("No AboutSection found.");
    }

    const newParagraphs = [...existing.paragraphs, text];
    return prisma.aboutSection.update({
      where: { id: existing.id },
      data: { paragraphs: { set: newParagraphs } },
    });
  },

  updateParagraph: async (index: number, text: string) => {
    const existing = await prisma.aboutSection.findFirst();
    if (!existing) {
      throw new Error("No AboutSection found.");
    }

    const currentParas = existing.paragraphs;
    if (index >= currentParas.length) {
      throw new Error("Paragraph index out of bounds.");
    }

    const updatedParas = currentParas.map((p, i) => (i === index ? text : p));

    return prisma.aboutSection.update({
      where: { id: existing.id },
      data: { paragraphs: { set: updatedParas } },
    });
  },

  deleteParagraph: async (index: number) => {
    const existing = await prisma.aboutSection.findFirst();
    if (!existing) {
      throw new Error("No AboutSection found.");
    }

    const currentParas = existing.paragraphs;
    if (index >= currentParas.length) {
      throw new Error("Paragraph index out of bounds.");
    }

    const updatedParas = currentParas.filter((_, i) => i !== index);

    return prisma.aboutSection.update({
      where: { id: existing.id },
      data: { paragraphs: { set: updatedParas } },
    });
  },
};
