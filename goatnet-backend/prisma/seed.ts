// prisma/seed.ts

import { PrismaClient, Role, Provider } from "@prisma/client";

const prisma = new PrismaClient();

// Helper: find or create a Channel by slug or name
async function getOrCreateChannel(
  slug: string,
  name: string,
  description: string
) {
  // 1) Try by slug
  let channel = await prisma.channel.findUnique({
    where: { slug },
  });
  if (channel) return channel;

  // 2) If not found, try by name (in case a previous run created it with a different slug)
  channel = await prisma.channel.findUnique({
    where: { name },
  });
  if (channel) return channel;

  // 3) Otherwise, create fresh
  return prisma.channel.create({
    data: { slug, name, description },
  });
}

async function main() {
  console.log("🌱 Starting database seeding...");

  // 1. Create an initial Admin user (internal CMS)
  const hashedAdminPassword =
    "$2b$10$WVV8IcobIOZoctW9bJU3Tu./5UCmi8R42ltCcBTrWjY9crmBy/3pW";

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@goatnet.com" },
    update: { password: hashedAdminPassword },
    create: {
      email: "admin@goatnet.com",
      password: hashedAdminPassword,
      role: Role.ADMIN,
      name: null,
      imageUrl: null,
      link: null,
      showOnLanding: false,
    },
  });
  console.log(`  ✔️  Created or fetched Admin user: ${adminUser.email}`);

  // 2. Seed HeroSection (landing)
  await prisma.heroSection.upsert({
    where: { id: 1 },
    update: {
      desktopVideoUrl: "https://cdn.goatnet.com/videos/hero-desktop.mp4",
      mobileVideoUrl: "https://cdn.goatnet.com/videos/hero-mobile.mp4",
    },
    create: {
      desktopVideoUrl: "https://cdn.goatnet.com/videos/hero-desktop.mp4",
      mobileVideoUrl: "https://cdn.goatnet.com/videos/hero-mobile.mp4",
    },
  });
  console.log("  ✔️  Seeded HeroSection");

  // 3. Seed AboutSection (landing)
  await prisma.aboutSection.upsert({
    where: { id: 1 },
    update: {
      title: "About Goatnet",
      paragraphs: [
        "GOATNET: Your go‐to advantage in the new media game.",
        "Every story begins with purpose. Ours is to serve organizations and individuals who share one: greatness.",
        "We provide scalable social and streaming solutions, leveraging AI production, creator tools, and integrated agency services.",
        "Join the family. Let’s Goat!",
      ],
      youtubeUrl: "https://www.youtube.com/embed/tGG_DmkDALQ",
    },
    create: {
      title: "About Goatnet",
      paragraphs: [
        "GOATNET: Your go‐to advantage in the new media game.",
        "Every story begins with purpose. Ours is to serve organizations and individuals who share one: greatness.",
        "We provide scalable social and streaming solutions, leveraging AI production, creator tools, and integrated agency services.",
        "Join the family. Let’s Goat!",
      ],
      youtubeUrl: "https://www.youtube.com/embed/tGG_DmkDALQ",
    },
  });
  console.log("  ✔️  Seeded AboutSection");

  // 4. Seed SolutionTabs & SolutionItems (landing)
  await prisma.solutionItem.deleteMany();
  await prisma.solutionTab.deleteMany();
  console.log("  🗑  Cleared existing SolutionTabs and SolutionItems");

  await prisma.solutionTab.create({
    data: {
      name: "Storytelling",
      tagline: "Share your why & celebrate others like never before.",
      items: {
        create: [
          {
            title: "Narrative",
            tag: "Your Legacy in Motion",
            description:
              "Because storytelling is about how it started, how it’s going, and how it’s received. We help you convey narratives that are relevant, capturing pivotal highlights and framing desired updates and ambitions.",
          },
          {
            title: "Social Media",
            tag: "Keep Creative Control",
            description:
              "Amplify your existing channels. Export, distribute, and maintain creative control—building a premium digital footprint and a first‐class search presence.",
          },
          {
            title: "Newsletter",
            tag: "Stay Connected",
            description:
              "Tailored, opted‐in, and consistently engaging. Our newsletter tools keep your audience informed—solo or as part of a team—through curated updates and announcements.",
          },
          {
            title: "Studio & IP",
            tag: "Your Virtual Director’s Chair",
            description:
              "Shape and edit video, graphics, and soundtracks with intuitive studio tools. Seed original IP—podcasts, films, written works—and control how and when it’s released.",
          },
        ],
      },
    },
  });
  console.log("  ✔️  Created Storytelling SolutionTab with items");

  await prisma.solutionTab.create({
    data: {
      name: "Innovation",
      tagline:
        "Your online presence should impress. As tech evolves, so do we.",
      items: {
        create: [
          {
            title: "Command Post",
            tag: "Your Credential",
            description:
              "An interactive digital HQ—your living, dynamic dashboard to showcase work, signal achievements, and share your narrative.",
          },
          {
            title: "Tech Stack",
            tag: "Adaptive & Custom",
            description:
              "Built for performance and flexibility: we leverage A.I. and community‐building solutions to keep you cutting‐edge.",
          },
          {
            title: "A.I. Tools & Data",
            tag: "AI‐Powered Insights",
            description:
              "Advanced A.I. production array, thoughtful data collection, and a professional hub to keep your content comprehensive and impressive.",
          },
          {
            title: "Web Development",
            tag: "Build & Maintain Online",
            description:
              "Custom web development and ongoing maintenance—map your presence strategically and optimize continuously.",
          },
        ],
      },
    },
  });
  console.log("  ✔️  Created Innovation SolutionTab with items");

  await prisma.solutionTab.create({
    data: {
      name: "Community",
      tagline: "Elevate experiences and leave lasting impressions.",
      items: {
        create: [
          {
            title: "Activations & Pipeline",
            tag: "Elevated Experiences",
            description:
              "Onboarding and metadata‐driven activations prioritize a network effect—amplifying reach, relevance, and appreciation.",
          },
          {
            title: "Commerce",
            tag: "Create. Sell. Grow",
            description:
              "Built‐in commerce tools let you create and sell your own or affiliated products. Promote subscriptions, land sponsorships, and benefit from partner discounts.",
          },
          {
            title: "Empowerment",
            tag: "Goat Giving",
            description:
              "Leverage your influence to promote causes. Introduce members to foundations to collaborate on advocacy and increase impact.",
          },
          {
            title: "Gatekeeper",
            tag: "Goodbye, Bots",
            description:
              "Maintain a bot‐free environment. Courtesy wins—trolls lose. On Goatnet, quality interactions reign supreme.",
          },
        ],
      },
    },
  });
  console.log("  ✔️  Created Community SolutionTab with items");

  // 5. Seed Attractions (landing‐page “showcase”), instead of the old ShowcaseItems

  // 5a. Delete any existing ShowcaseItemRel rows, since they reference Attraction
  await prisma.showcaseItemRel.deleteMany();
  console.log("  🗑  Cleared existing ShowcaseItemRel rows");

  // 5b. Now delete all Attractions
  await prisma.attraction.deleteMany();
  console.log("  🗑  Cleared existing Attractions");

  // 5c. Ensure the needed channels exist via helper
  const sportsChannel = await getOrCreateChannel(
    "sports",
    "Sports",
    "All sports‐related attractions"
  );
  const docChannel = await getOrCreateChannel(
    "documentary",
    "Documentaries",
    "Documentary films and shorts"
  );
  const historyChannel = await getOrCreateChannel(
    "history",
    "History",
    "Historical content"
  );
  const interviewChannel = await getOrCreateChannel(
    "interview",
    "Interview",
    "Interview segments and podcasts"
  );
  const motivationChannel = await getOrCreateChannel(
    "motivation",
    "Motivation",
    "Motivational short films and clips"
  );
  console.log(
    `  ✔️  Ensured channels: sports(${sportsChannel.id}), documentary(${docChannel.id}), history(${historyChannel.id}), interview(${interviewChannel.id}), motivation(${motivationChannel.id})`
  );

  // 5d. Locate the Admin’s Studio ID (must exist from step 8 below)
  const adminStudioForAttractions = await prisma.studio.findFirst({
    where: { credentialId: adminUser.id },
  });
  if (!adminStudioForAttractions) {
    throw new Error("Admin's Studio must exist before seeding Attractions");
  }
  const studioIdForAttractions = adminStudioForAttractions.id;

  // 5e. Create each Attraction (using nested connect to channels)
  const seededAttractions = await Promise.all([
    prisma.attraction.create({
      data: {
        title: "How The Waves Were Won",
        description:
          "NJ lifeguards compete for history in a legendary summer showdown. Experience the ocean, grit, and glory behind their pursuit of a record-breaking championship.",
        imageUrl: "https://cdn.goatnet.com/images/waves.jpg",
        videoUrl: "https://www.youtube.com/embed/az5TRfOdgQ8",
        type: "documentary",
        showOnLanding: true,
        landingOrder: 1,
        studio: { connect: { id: studioIdForAttractions } },
        channels: {
          connect: [{ id: sportsChannel.id }, { id: docChannel.id }],
        },
      },
    }),
    prisma.attraction.create({
      data: {
        title: "The Marshalls",
        description:
          "The inspiring story of Utah’s Marshall’s Baseball Program—past greatness to future dreams. Follow players guided by discipline, grit, and brotherhood.",
        imageUrl: "https://cdn.goatnet.com/images/marshall.jpg",
        videoUrl: "https://www.youtube.com/embed/AitwYmf8g7s",
        type: "documentary",
        showOnLanding: true,
        landingOrder: 2,
        studio: { connect: { id: studioIdForAttractions } },
        channels: {
          connect: [{ id: sportsChannel.id }, { id: historyChannel.id }],
        },
      },
    }),
    prisma.attraction.create({
      data: {
        title: "Rad Grandpa",
        description:
          "An intimate look at Bo Jackson—beyond the highlights. Personal stories on humility, giving back, and a life of purpose and legacy.",
        imageUrl: "https://cdn.goatnet.com/images/rad-grandpa.jpg",
        videoUrl: "https://www.youtube.com/embed/nw5jCitcsV0",
        type: "interview",
        showOnLanding: true,
        landingOrder: 3,
        studio: { connect: { id: studioIdForAttractions } },
        channels: {
          connect: [{ id: sportsChannel.id }, { id: interviewChannel.id }],
        },
      },
    }),
    prisma.attraction.create({
      data: {
        title: "Three Minutes From Home",
        description:
          "The powerful true story of Jose Miqueo—an elite prospect who defied the odds after a devastating accident. A story of faith, family, and unbreakable will.",
        imageUrl: "https://cdn.goatnet.com/images/three-minutes.jpg",
        videoUrl: "https://www.youtube.com/embed/NHPjAVvWTLg",
        type: "trailer",
        showOnLanding: true,
        landingOrder: 4,
        studio: { connect: { id: studioIdForAttractions } },
        channels: {
          connect: [{ id: sportsChannel.id }, { id: motivationChannel.id }],
        },
      },
    }),
  ]);
  console.log(
    `  ✔️  Created ${seededAttractions.length} Attractions for the landing carousel`
  );

  // 6. Seed PartnerItems (landing)
  await prisma.partnerItem.deleteMany();
  console.log("  🗑  Cleared existing PartnerItems");

  await prisma.partnerItem.createMany({
    data: [
      {
        name: "MGF Marshalls Baseball",
        imageUrl:
          "https://static.wixstatic.com/media/69e627_4b0475a463f2442d93e51aa6b325be4f~mv2.png",
        link: "https://www.mgfmarshalls.com",
        order: 1,
      },
      {
        name: "Rise 2 Greatness Foundation",
        imageUrl:
          "https://rise2greatness.org/wp-content/uploads/2022/05/Rise-2-Greatness-PG-Cares-1024x1024-1.png",
        link: "https://rise2greatness.org",
        order: 2,
      },
      {
        name: "Metropolitan Oval Academy",
        imageUrl:
          "https://metropolitanoval.org/wp-content/uploads/2019/03/Met-Oval-White-Trans1k.png",
        link: "https://metropolitanoval.org",
        order: 3,
      },
      {
        name: "HBCU Icon Exchange",
        imageUrl: "https://cdn.goatnet.com/images/hbcu-icon.png",
        link: "https://hbcuiconexchange.org",
        order: 4,
      },
      {
        name: "Harvey Cedars Beach Patrol",
        imageUrl: "https://cdn.goatnet.com/images/harvey-beach.png",
        link: "https://www.harveycedars.org/cn/webpage.cfm?tpid=14966",
        order: 5,
      },
      {
        name: "Sports Health In The City",
        imageUrl: "https://cdn.goatnet.com/images/sports-health.png",
        link: "https://www.sportsandhealthnyc.org",
        order: 6,
      },
      {
        name: "Five Tool Player Development",
        imageUrl: "https://cdn.goatnet.com/images/5tool.png",
        link: "https://5tool.com/player-development/",
        order: 7,
      },
    ],
  });
  console.log("  ✔️  Created PartnerItems");

  // 7. Seed a few sample Users as landing‐page credentials
  const usersData = [
    {
      email: "alice@goatnet.com",
      password: "$2a$10$WzRg3KtqjU/AgbEY3cMPXO4IYjqoI7u/VE0FUPJLNldhNZ.KQkgAe", // “alice123”
      role: Role.EDITOR,
      name: "Alice Smith",
      imageUrl: "https://cdn.goatnet.com/creds/alice.jpg",
      link: "https://alice.goatnet.com",
      showOnLanding: true,
      landingOrder: 1,
    },
    {
      email: "bob@goatnet.com",
      password: "$2a$10$2b9.Z8Ft5FkOW9R3.5LhwepS5AZu.8gG3dBtjDgFubPqKcDFS6xUa", // “bob123”
      role: Role.EDITOR,
      name: "Bob Johnson",
      imageUrl: "https://cdn.goatnet.com/creds/bob.jpg",
      link: "https://bob.goatnet.com",
      showOnLanding: true,
      landingOrder: 2,
    },
    {
      email: "carol@goatnet.com",
      password: "$2a$10$3cA/UEE2lccnTy2H1RmmduVXGLRjRfFjF0uLZpThiFBo0vCj46E5.", // “carol123”
      role: Role.EDITOR,
      name: "Carol Lee",
      imageUrl: "https://cdn.goatnet.com/creds/carol.jpg",
      link: "https://carol.goatnet.com",
      showOnLanding: true,
      landingOrder: 3,
    },
  ];

  for (const u of usersData) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {
        role: u.role,
        name: u.name,
        imageUrl: u.imageUrl!,
        link: u.link!,
        showOnLanding: u.showOnLanding,
        landingOrder: u.landingOrder,
      },
      create: {
        email: u.email,
        password: u.password,
        role: u.role,
        name: u.name,
        imageUrl: u.imageUrl!,
        link: u.link!,
        showOnLanding: u.showOnLanding,
        landingOrder: u.landingOrder,
      },
    });
    console.log(`  ✔️  Upserted user: ${u.email} (landing credential)`);
  }

  // 8. Ensure the Admin’s Studio exists, then seed internal Showcase
  const adminStudio = await prisma.studio.upsert({
    where: { credentialId: adminUser.id },
    update: {},
    create: {
      credential: { connect: { id: adminUser.id } },
      name: "Admin’s Studio",
      slug: "admin-studio",
      description: "Tenant studio for the Admin user",
    },
  });
  console.log(`  ✔️  Upserted Admin’s Studio: ${adminStudio.name}`);

  // Create two Attractions under Admin’s Studio, assign to channels
  const [attraction1, attraction2] = await Promise.all([
    prisma.attraction.create({
      data: {
        title: "Admin’s All‐Star Documentary",
        description: "A deep dive into greatness.",
        imageUrl: "https://cdn.goatnet.com/attractions/admin-doc.jpg",
        videoUrl: "https://www.youtube.com/embed/abcdefghijk",
        type: "documentary",
        studio: { connect: { id: adminStudio.id } },
        channels: {
          connect: [{ id: sportsChannel.id }, { id: docChannel.id }],
        },
      },
    }),
    prisma.attraction.create({
      data: {
        title: "Admin’s Sports Highlight Reel",
        description: "Top moments from this season.",
        imageUrl: "https://cdn.goatnet.com/attractions/admin-sports.jpg",
        videoUrl: "https://www.youtube.com/embed/zyxwvutsrqp",
        type: "highlight",
        studio: { connect: { id: adminStudio.id } },
        channels: { connect: [{ id: sportsChannel.id }] },
      },
    }),
  ]);
  console.log(
    `  ✔️  Created Attractions: "${attraction1.title}", "${attraction2.title}"`
  );

  // 9. Seed an internal Showcase under Admin’s Studio
  await prisma.showcaseItemRel.deleteMany({
    where: {
      showcase: { studioId: adminStudio.id },
    },
  });
  console.log("  🗑  Cleared existing ShowcaseItemRel rows for Admin’s Studio");

  await prisma.showcaseInternal.deleteMany({
    where: { studioId: adminStudio.id },
  });
  console.log("  🗑  Cleared existing internal Showcases for Admin’s Studio");

  await prisma.showcaseInternal.create({
    data: {
      name: "Admin Featured",
      description: "Featured content in the Admin’s dashboard",
      studio: { connect: { id: adminStudio.id } },
      items: {
        create: [
          { attraction: { connect: { id: attraction1.id } }, order: 1 },
          { attraction: { connect: { id: attraction2.id } }, order: 2 },
        ],
      },
    },
  });
  console.log('  ✔️  Created internal Showcase: "Admin Featured"');

  // 10. Seed ExternalContent entries for Admin’s Studio
  await prisma.externalContent.deleteMany({
    where: { studioId: adminStudio.id },
  });
  console.log("  🗑  Cleared existing ExternalContent for Admin’s Studio");

  await prisma.externalContent.createMany({
    data: [
      {
        studioId: adminStudio.id,
        provider: Provider.YOUTUBE,
        providerId: "abcdefghijk",
        embedUrl: "https://www.youtube.com/embed/abcdefghijk",
        title: "Admin’s Imported YouTube Video",
        description: "An imported video via YouTube oEmbed",
        thumbnailUrl: "https://img.youtube.com/vi/abcdefghijk/mqdefault.jpg",
      },
      {
        studioId: adminStudio.id,
        provider: Provider.TIKTOK,
        providerId: "714159263847",
        embedUrl: "https://www.tiktok.com/embed/714159263847",
        title: "Admin’s Imported TikTok Clip",
        description: "An imported TikTok video embed",
        thumbnailUrl: "https://cdn.goatnet.com/external/tik_714159263847.jpg",
      },
    ],
  });
  console.log(`  ✔️  Created ExternalContent for Admin’s Studio`);

  // 11. Seed NewsletterArticles (CMS)
  await prisma.newsletterArticle.deleteMany();
  console.log("  🗑  Cleared existing NewsletterArticles");

  await prisma.newsletterArticle.createMany({
    data: [
      {
        title: "Welcome to Goatnet News",
        content:
          "Hello everyone! This is our first newsletter article. Stay tuned for more updates.",
      },
      {
        title: "Feature Spotlight: AI Tools",
        content:
          "In this edition, we explore how Goatnet’s AI production tools help storytellers shine.",
      },
    ],
  });
  console.log(`  ✔️  Created NewsletterArticles`);

  // 12. Seed a NewsletterSubscriber
  await prisma.newsletterSubscriber.deleteMany();
  console.log("  🗑  Cleared existing NewsletterSubscribers");

  await prisma.newsletterSubscriber.create({
    data: { email: "subscriber@goatnet.com" },
  });
  console.log(`  ✔️  Created NewsletterSubscriber: subscriber@goatnet.com`);

  console.log("🏁 Database seeding complete!");
}

main()
  .catch((e) => {
    console.error("💥 Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
