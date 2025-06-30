--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9
-- Dumped by pg_dump version 16.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS '';


--
-- Name: Provider; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Provider" AS ENUM (
    'YOUTUBE',
    'TIKTOK',
    'INSTAGRAM',
    'OTHER'
);


--
-- Name: Role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'EDITOR',
    'VIEWER'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: AboutSection; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."AboutSection" (
    id integer NOT NULL,
    title text NOT NULL,
    paragraphs text[],
    "youtubeUrl" text NOT NULL
);


--
-- Name: AboutSection_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."AboutSection_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: AboutSection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."AboutSection_id_seq" OWNED BY public."AboutSection".id;


--
-- Name: Attraction; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Attraction" (
    id text NOT NULL,
    title text NOT NULL,
    description text,
    "imageUrl" text,
    "videoUrl" text,
    type text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "landingOrder" integer,
    "showOnLanding" boolean DEFAULT false NOT NULL
);


--
-- Name: Channel; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Channel" (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: ExternalContent; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ExternalContent" (
    id text NOT NULL,
    "studioId" text NOT NULL,
    provider public."Provider" NOT NULL,
    "providerId" text NOT NULL,
    "embedUrl" text NOT NULL,
    title text,
    description text,
    "thumbnailUrl" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: HeroSection; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."HeroSection" (
    id integer NOT NULL,
    "desktopVideoUrl" text NOT NULL,
    "mobileVideoUrl" text NOT NULL
);


--
-- Name: HeroSection_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."HeroSection_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: HeroSection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."HeroSection_id_seq" OWNED BY public."HeroSection".id;


--
-- Name: NewsletterArticle; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."NewsletterArticle" (
    id text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: NewsletterSubscriber; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."NewsletterSubscriber" (
    id text NOT NULL,
    email text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: PartnerItem; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PartnerItem" (
    id text NOT NULL,
    name text NOT NULL,
    "imageUrl" text NOT NULL,
    link text,
    "order" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: ShowcaseInternal; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ShowcaseInternal" (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    "studioId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: ShowcaseItemRel; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ShowcaseItemRel" (
    id text NOT NULL,
    "showcaseId" text NOT NULL,
    "attractionId" text NOT NULL,
    "order" integer NOT NULL
);


--
-- Name: SolutionItem; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SolutionItem" (
    id integer NOT NULL,
    title text NOT NULL,
    tag text NOT NULL,
    description text NOT NULL,
    "tabId" integer NOT NULL
);


--
-- Name: SolutionItem_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."SolutionItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: SolutionItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."SolutionItem_id_seq" OWNED BY public."SolutionItem".id;


--
-- Name: SolutionTab; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SolutionTab" (
    id integer NOT NULL,
    name text NOT NULL,
    tagline text NOT NULL
);


--
-- Name: SolutionTab_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."SolutionTab_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: SolutionTab_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."SolutionTab_id_seq" OWNED BY public."SolutionTab".id;


--
-- Name: Studio; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Studio" (
    id text NOT NULL,
    "credentialId" text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    name text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "imageUrl" text,
    "landingOrder" integer,
    link text,
    password text NOT NULL,
    role public."Role" DEFAULT 'VIEWER'::public."Role" NOT NULL,
    "showOnLanding" boolean DEFAULT false NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: _AttractionToChannel; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."_AttractionToChannel" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


--
-- Name: _ChannelMembers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."_ChannelMembers" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: AboutSection id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AboutSection" ALTER COLUMN id SET DEFAULT nextval('public."AboutSection_id_seq"'::regclass);


--
-- Name: HeroSection id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."HeroSection" ALTER COLUMN id SET DEFAULT nextval('public."HeroSection_id_seq"'::regclass);


--
-- Name: SolutionItem id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SolutionItem" ALTER COLUMN id SET DEFAULT nextval('public."SolutionItem_id_seq"'::regclass);


--
-- Name: SolutionTab id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SolutionTab" ALTER COLUMN id SET DEFAULT nextval('public."SolutionTab_id_seq"'::regclass);


--
-- Data for Name: AboutSection; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."AboutSection" (id, title, paragraphs, "youtubeUrl") FROM stdin;
1	About Us	{"GOATNET: Your go‐to advantage in the new media game.","Every story begins with purpose. Ours is to serve organizations and individuals who share one: greatness.","We provide scalable social and streaming solutions, leveraging AI production, creator tools, and integrated agency services.","Join the family. Let’s Goat!"}	https://www.youtube.com/embed/tGG_DmkDALQ
\.


--
-- Data for Name: Attraction; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Attraction" (id, title, description, "imageUrl", "videoUrl", type, "createdAt", "updatedAt", "landingOrder", "showOnLanding") FROM stdin;
cmbjtiopw000hv5vkb2cqovml	Admin’s All‐Star Documentary	A deep dive into greatness.	https://cdn.goatnet.com/attractions/admin-doc.jpg	https://www.youtube.com/embed/abcdefghijk	documentary	2025-06-05 20:17:33.861	2025-06-05 20:17:33.861	\N	f
cmbjtiopw000iv5vkoay0yhhd	Admin’s Sports Highlight Reel	Top moments from this season.	https://cdn.goatnet.com/attractions/admin-sports.jpg	https://www.youtube.com/embed/zyxwvutsrqp	highlight	2025-06-05 20:17:33.861	2025-06-05 20:17:33.861	\N	f
cmbjtiopa0004v5vknrjqcptz	How The Waves Were Won	NJ lifeguards compete for history in a legendary summer showdown. Experience the ocean, grit, and glory behind their pursuit of a record-breaking championship.	/uploads/waves-1749155043708.png	https://www.youtube.com/embed/az5TRfOdgQ8	documentary	2025-06-05 20:17:33.806	2025-06-05 20:24:03.769	1	t
cmbjtiooe0002v5vkdc1o2zmn	The Marshalls	The inspiring story of Utah’s Marshall’s Baseball Program—past greatness to future dreams. Follow players guided by discipline, grit, and brotherhood.	/uploads/marshall-poster-1749155833436.jpg	https://www.youtube.com/embed/AitwYmf8g7s	documentary	2025-06-05 20:17:33.806	2025-06-05 20:37:13.459	2	t
cmbjtiop80003v5vk6h7jwjmh	Rad Grandpa	An intimate look at Bo Jackson—beyond the highlights. Personal stories on humility, giving back, and a life of purpose and legacy.	/uploads/bo-2-1749155855355.png	https://www.youtube.com/embed/nw5jCitcsV0	interview	2025-06-05 20:17:33.806	2025-06-05 20:37:35.366	3	t
cmbjtiopa0005v5vkldlfnob7	Three Minutes From Home	The powerful true story of Jose Miqueo—an elite prospect who defied the odds after a devastating accident. A story of faith, family, and unbreakable will.	/uploads/three-minutes-1749155880237.png	https://www.youtube.com/embed/NHPjAVvWTLg	trailer	2025-06-05 20:17:33.806	2025-06-05 20:38:00.248	4	t
cmbjum1yj0000v5xsn7rvul8u	From The Jump	Get to know the man behind the visor beyond the records and rushing titles. From falling in love with football on Texas fields to navigating family, faith, and the pain of losing his father, Dickerson shares his journey with honesty and heart. This is a story about purpose, promise, and the power of building something greater.	/uploads/eric-1749156490552.jpg	https://www.youtube.com/watch?v=4ORfQO1b70Y	trailer	2025-06-05 20:48:10.602	2025-06-05 20:48:10.602	3	t
cmbjunh3v0001v5xs01myiqd2	Choose Hoos	Go beyond the scoreboard and inside one of college baseball’s premier programs in their annual quest for Omaha	/uploads/virginia-1749156556876.png	https://www.youtube.com/watch?v=EnGyBF6GS-Y&embeds_referring_euri=https%3A%2F%2Fwww.goatnet.io%2F&source_ve_path=MjM4NTE	trailer	2025-06-05 20:49:16.891	2025-06-05 20:49:16.891	6	t
cmbjuol140002v5xsymclizj6	Bazuca Bros	Charisma, swagger, and knockout power—Hendri & Euri Cedeno Martinez are rewriting the boxing script. Go behind the scenes with the team that fuels their rise—from trainers to day-ones—and witness the grind, the glory, and the brotherhood driving their path to greatness	/uploads/bazucabros-1749156608617.png	https://www.youtube.com/watch?v=xboEtOLV9RQ&embeds_referring_euri=https%3A%2F%2Fwww.goatnet.io%2F&source_ve_path=MjM4NTE	trailer	2025-06-05 20:50:08.632	2025-06-05 20:50:15.164	7	t
cmbjupzjw0003v5xsqbgw35v9	Team Phung	Amelie & Alexa Phung, not just sisters, but part of a bright future for women’s golf. More than that, the Phungs are members of a delightful family, driven to excel on and off the course and personable in precisely the ways you’d want. Young people, making their way, pursuing dreams purposefully and having fun in the process.	/uploads/phung-1749156674095.jpg	https://www.youtube.com/watch?v=s3eaElShiW0&t=2s	trailer	2025-06-05 20:51:14.108	2025-06-05 20:51:14.108	8	t
\.


--
-- Data for Name: Channel; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Channel" (id, name, slug, description, "createdAt", "updatedAt") FROM stdin;
cmbhjto7a000cv5e0y8p8mx5z	Sports	sports	All sports‐related attractions	2025-06-04 06:10:37.894	2025-06-04 06:10:37.894
cmbhjto7x000dv5e0tas2fg0w	Documentaries	documentaries	Documentary films and shorts	2025-06-04 06:10:37.894	2025-06-04 06:10:37.894
cmbjtfpml0003v5qwdsb3ea6x	History	history	Historical content	2025-06-05 20:15:15.035	2025-06-05 20:15:15.035
cmbjtfpmq0004v5qwvq24kw43	Interview	interview	Interview segments and podcasts	2025-06-05 20:15:15.035	2025-06-05 20:15:15.035
cmbjtionp0001v5vkwjknlcn0	Motivation	motivation	Motivational short films and clips	2025-06-05 20:17:33.781	2025-06-05 20:17:33.781
\.


--
-- Data for Name: ExternalContent; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ExternalContent" (id, "studioId", provider, "providerId", "embedUrl", title, description, "thumbnailUrl", "createdAt", "updatedAt") FROM stdin;
cmbjtioqa000mv5vkmbpmiyij	cmbhjto75000bv5e0a2xo3i6t	YOUTUBE	abcdefghijk	https://www.youtube.com/embed/abcdefghijk	Admin’s Imported YouTube Video	An imported video via YouTube oEmbed	https://img.youtube.com/vi/abcdefghijk/mqdefault.jpg	2025-06-05 20:17:33.875	2025-06-05 20:17:33.875
cmbjtioqa000nv5vkvmnxo27x	cmbhjto75000bv5e0a2xo3i6t	TIKTOK	714159263847	https://www.tiktok.com/embed/714159263847	Admin’s Imported TikTok Clip	An imported TikTok video embed	https://cdn.goatnet.com/external/tik_714159263847.jpg	2025-06-05 20:17:33.875	2025-06-05 20:17:33.875
\.


--
-- Data for Name: HeroSection; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."HeroSection" (id, "desktopVideoUrl", "mobileVideoUrl") FROM stdin;
1	/uploads/goatnetv5-1749158992931.mp4	/uploads/GoatnetMobileV2-1749159105814.mp4
\.


--
-- Data for Name: NewsletterArticle; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."NewsletterArticle" (id, title, content, "createdAt", "updatedAt") FROM stdin;
cmbjtioqd000ov5vk0ap3z55e	Welcome to Goatnet News	Hello everyone! This is our first newsletter article. Stay tuned for more updates.	2025-06-05 20:17:33.877	2025-06-05 20:17:33.877
cmbjtioqd000pv5vkxc5wis42	Feature Spotlight: AI Tools	In this edition, we explore how Goatnet’s AI production tools help storytellers shine.	2025-06-05 20:17:33.877	2025-06-05 20:17:33.877
\.


--
-- Data for Name: NewsletterSubscriber; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."NewsletterSubscriber" (id, email, "createdAt") FROM stdin;
cmbjtioqg000qv5vka6lbtzum	subscriber@goatnet.com	2025-06-05 20:17:33.88
\.


--
-- Data for Name: PartnerItem; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."PartnerItem" (id, name, "imageUrl", link, "order", "createdAt", "updatedAt") FROM stdin;
cmbjtiopo0009v5vk2gklpwb9	HBCU Icon Exchange	/uploads/hbcu-1749157715956.jpeg	https://hbcuiconexchange.org	4	2025-06-05 20:17:33.853	2025-06-05 21:08:35.962
cmbjtiopo000bv5vk9ylmgx1w	Sports Health In The City	/uploads/sport-health-1749157744888.png	https://www.sportsandhealthnyc.org	6	2025-06-05 20:17:33.853	2025-06-05 21:09:04.895
cmbjtiopo000cv5vks1w4ks9m	Five Tool Player Development	/uploads/5TP-1749157763345.png	https://5tool.com/player-development/	7	2025-06-05 20:17:33.853	2025-06-05 21:09:23.356
cmbjtiopo0008v5vkvv33myl7	Metropolitan Oval Academy	/uploads/oval-1749676143372.png	https://metropolitanoval.org	3	2025-06-05 20:17:33.853	2025-06-11 21:09:03.401
cmbjtiopo0007v5vkogn7gg5h	Rise 2 Greatness Foundation	/uploads/r2g-1749676977643.png	https://rise2greatness.org	2	2025-06-05 20:17:33.853	2025-06-11 21:22:57.65
cmbjtiopo0006v5vk409e1goz	MGF Marshalls Baseball	/uploads/marshalls-1749677024718.png	https://www.mgfmarshalls.com	1	2025-06-05 20:17:33.853	2025-06-11 21:23:44.726
cmbjtiopo000av5vk13xx5lmb	Harvey Cedars Beach Patrol	/uploads/harvey-1749157616594.jpg	https://www.harveycedars.org/cn/webpage.cfm?tpid=14966	5	2025-06-05 20:17:33.853	2025-06-05 21:06:56.6
\.


--
-- Data for Name: ShowcaseInternal; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ShowcaseInternal" (id, name, description, "studioId", "createdAt", "updatedAt") FROM stdin;
cmbjtioq5000jv5vkl8qthipk	Admin Featured	Featured content in the Admin’s dashboard	cmbhjto75000bv5e0a2xo3i6t	2025-06-05 20:17:33.869	2025-06-05 20:17:33.869
\.


--
-- Data for Name: ShowcaseItemRel; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ShowcaseItemRel" (id, "showcaseId", "attractionId", "order") FROM stdin;
cmbjtioq5000lv5vkkor0pcto	cmbjtioq5000jv5vkl8qthipk	cmbjtiopw000iv5vkoay0yhhd	2
cmbjtioq5000kv5vkcir3dzyp	cmbjtioq5000jv5vkl8qthipk	cmbjtiopw000hv5vkb2cqovml	1
\.


--
-- Data for Name: SolutionItem; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SolutionItem" (id, title, tag, description, "tabId") FROM stdin;
136	Narrative	Your Legacy in Motion	Because storytelling is about how it started, how it’s going, and how it’s received. We help you convey narratives that are relevant, capturing pivotal highlights and framing desired updates and ambitions.	35
137	Social Media	Keep Creative Control	Amplify your existing channels. Export, distribute, and maintain creative control—building a premium digital footprint and a first‐class search presence.	35
138	Newsletter	Stay Connected	Tailored, opted‐in, and consistently engaging. Our newsletter tools keep your audience informed—solo or as part of a team—through curated updates and announcements.	35
139	Studio & IP	Your Virtual Director’s Chair	Shape and edit video, graphics, and soundtracks with intuitive studio tools. Seed original IP—podcasts, films, written works—and control how and when it’s released.	35
140	Command Post	Your Credential	An interactive digital HQ—your living, dynamic dashboard to showcase work, signal achievements, and share your narrative.	36
141	Tech Stack	Adaptive & Custom	Built for performance and flexibility: we leverage A.I. and community‐building solutions to keep you cutting‐edge.	36
142	A.I. Tools & Data	AI‐Powered Insights	Advanced A.I. production array, thoughtful data collection, and a professional hub to keep your content comprehensive and impressive.	36
143	Web Development	Build & Maintain Online	Custom web development and ongoing maintenance—map your presence strategically and optimize continuously.	36
144	Activations & Pipeline	Elevated Experiences	Onboarding and metadata‐driven activations prioritize a network effect—amplifying reach, relevance, and appreciation.	37
145	Commerce	Create. Sell. Grow	Built‐in commerce tools let you create and sell your own or affiliated products. Promote subscriptions, land sponsorships, and benefit from partner discounts.	37
146	Empowerment	Goat Giving	Leverage your influence to promote causes. Introduce members to foundations to collaborate on advocacy and increase impact.	37
147	Gatekeeper	Goodbye, Bots	Maintain a bot‐free environment. Courtesy wins—trolls lose. On Goatnet, quality interactions reign supreme.	37
\.


--
-- Data for Name: SolutionTab; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SolutionTab" (id, name, tagline) FROM stdin;
35	Storytelling	Share your why & celebrate others like never before.
36	Innovation	Your online presence should impress. As tech evolves, so do we.
37	Community	Elevate experiences and leave lasting impressions.
\.


--
-- Data for Name: Studio; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Studio" (id, "credentialId", name, slug, description, "createdAt", "updatedAt") FROM stdin;
cmbhjto75000bv5e0a2xo3i6t	cmbhjto5q0000v5e0xbda5hbg	Admin’s Studio	admin-studio	Tenant studio for the Admin user	2025-06-04 06:10:37.89	2025-06-04 06:10:37.89
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (id, email, name, "createdAt", "imageUrl", "landingOrder", link, password, role, "showOnLanding", "updatedAt") FROM stdin;
cmbhjto5q0000v5e0xbda5hbg	admin@goatnet.com	\N	2025-06-04 06:10:37.837	\N	\N	\N	$2b$10$WVV8IcobIOZoctW9bJU3Tu./5UCmi8R42ltCcBTrWjY9crmBy/3pW	ADMIN	f	2025-06-05 20:17:33.751
cmbkccwfd0000v5jcgknty21p	landing_1749186296485@example.com	Adam Jones	2025-06-06 05:04:56.617	/uploads/adam-1749186296470.png	1	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 05:04:56.617
cmbkckijv0001v5jcvphxue6l	landing_1749186651881@example.com	Ahman Green	2025-06-06 05:10:51.883	/uploads/ahmangreen-1749186651874.jpg	2	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 05:10:51.883
cmbkcl7ru0002v5jc1y62rhaj	landing_1749186684569@example.com	Alanna Arrington	2025-06-06 05:11:24.571	/uploads/alanna-1749186684563.png	3	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 05:11:24.571
cmbkclnug0003v5jcshsmw3fp	landing_1749186705398@example.com	Amelie Phung	2025-06-06 05:11:45.4	/uploads/amelie-1749186705389.png	4	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 05:11:45.4
cmbkcm7zo0004v5jcj2pkxsp6	landing_1749186731507@example.com	Billy Wagner	2025-06-06 05:12:11.508	/uploads/billy-1749186731505.png	5	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 05:12:11.508
cmbkcmlrb0005v5jckbozmsfz	landing_1749186749350@example.com	CC Sabathia	2025-06-06 05:12:29.351	/uploads/cc-1749186749346.png	6	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 05:12:29.351
cmbkcnhh20006v5jcc6l27ohg	landing_1749186790453@example.com	Claressa Shields	2025-06-06 05:13:10.455	/uploads/claressasheilds-1749186790446.jpeg	7	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 05:13:10.455
cmbkco0ik0007v5jclcjtk8b8	landing_1749186815130@example.com	Darnell McDonald	2025-06-06 05:13:35.132	/uploads/darnell-1749186815122.png	8	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 05:13:35.132
cmbkcoo0z0008v5jcsro2mkqh	landing_1749186845602@example.com	Dean Moss	2025-06-06 05:14:05.603	/uploads/dean-1749186845597.png	9	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 05:14:05.603
cmbkcp5b50009v5jc87wacuss	landing_1749186867999@example.com	Dusty Baker	2025-06-06 05:14:28.001	/uploads/dusty-1749186867991.png	10	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 05:14:28.001
cmbkcpj9i000av5jcbi9naucd	landing_1749186886086@example.com	Eric Dickerson	2025-06-06 05:14:46.087	/uploads/eric-1749186886082.png	11	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 05:14:46.087
cmbkcru2k000bv5jcjrqg27wc	landing_1749186993377@example.com	Hendri Cedeno Martinez	2025-06-06 05:16:33.378	/uploads/hendri-1749186993374.jpg	12	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 05:16:33.378
cmbkcsakk000cv5jcmf8iv5ug	landing_1749187014787@example.com	Jake Jackson	2025-06-06 05:16:54.789	/uploads/jake-1749187014784.png	13	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 05:16:54.789
cmbkcstmr000dv5jcgmwze13d	landing_1749187039490@example.com	Jason Heyward	2025-06-06 05:17:19.491	/uploads/jasonhey-1749187039482.png	14	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 05:17:19.491
cmbkctg42000ev5jcj0kpq488	landing_1749187068625@example.com	Jennifer Ford	2025-06-06 05:17:48.626	/uploads/jennfierford-1749187068622.png	15	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 05:17:48.626
cmbkcu10l000fv5jcbso8y5gc	landing_1749187095715@example.com	John Buck	2025-06-06 05:18:15.717	/uploads/john-1749187095705.png	15	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 05:18:15.717
cmbkcvbir000gv5jct5wysxrx	landing_1749187155986@example.com	Keon Johnson	2025-06-06 05:19:15.987	/uploads/keonjohnson-1749187155983.png	17	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 05:19:15.987
cmbkcw9rt000hv5jcnjes7jkh	landing_1749187200375@example.com	Laura Mitchell Wilde	2025-06-06 05:20:00.377	/uploads/lauramithchell-1749187200364.png	18	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 05:20:00.377
cmbkcxjd6000iv5jcy2nn97l6	landing_1749187259465@example.com	Milan Rane	2025-06-06 05:20:59.466	/uploads/milanrane-1749187259459.png	19	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 05:20:59.466
cmbkcy1ua000jv5jczxv4elew	landing_1749187283409@example.com	Noah Franco	2025-06-06 05:21:23.41	/uploads/noahfranco-1749187283406.png	20	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 05:21:23.41
cmbkcyq58000kv5jce1q6zyn9	landing_1749187314883@example.com	Ray Crone	2025-06-06 05:21:54.884	/uploads/ray-1749187314880.jpeg	21	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 05:21:54.884
cmbl1bxjw0000v53wp32fenq9	landing_1749228241792@example.com	Termarr Johnson 	2025-06-06 16:44:01.794	/uploads/temarr-1749228241778.png	22	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 16:44:01.794
cmbl1eeae0001v53wuss90y3s	landing_1749228356820@example.com	Baron Davis	2025-06-06 16:45:56.822	/uploads/baron-1749228356819.jpg	23	https://www.goatnet.io/	CHANGE_ME	VIEWER	t	2025-06-06 16:45:56.822
\.


--
-- Data for Name: _AttractionToChannel; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."_AttractionToChannel" ("A", "B") FROM stdin;
cmbjtiopw000hv5vkb2cqovml	cmbhjto7a000cv5e0y8p8mx5z
cmbjtiopw000hv5vkb2cqovml	cmbhjto7x000dv5e0tas2fg0w
cmbjtiopw000iv5vkoay0yhhd	cmbhjto7a000cv5e0y8p8mx5z
\.


--
-- Data for Name: _ChannelMembers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."_ChannelMembers" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
f51a3568-8d51-441e-81e0-f519390ff8f8	7fbc3d7e3457bfbf20e86ef57dfe8f68a2e825f5250f3bc4da7ff43cf3495ffd	2025-06-03 23:05:35.814316-05	20250604040535_init_admin	\N	\N	2025-06-03 23:05:35.763183-05	1
735fce45-eb4f-49d1-806a-1b8d25798705	ac93fc6666d84056e593a094ba11d034fdf237586d13d15b732793c397642100	2025-06-04 00:30:45.122621-05	20250604053044_init_enterprise_schema	\N	\N	2025-06-04 00:30:45.050093-05	1
5c52b257-10f5-47eb-8383-5b0bfd63750e	1752a834695470879f0fbe57601581cf1e7402f3977c93b9c06d2c084a51c1b3	2025-06-05 14:41:59.629506-05	20250605194015_add_show_on_landing_to_attraction	\N	\N	2025-06-05 14:41:59.611884-05	1
1abf90ab-46b6-4bc8-91af-c41b8e4e9346	b30578dc76f034c26aeea7e7dec6b8fdd07b1f97139c59839e893edfd9c91470	2025-06-05 15:44:43.271765-05	20250605204437_drop_attraction_studio_relation	\N	\N	2025-06-05 15:44:43.268625-05	1
\.


--
-- Name: AboutSection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."AboutSection_id_seq"', 1, true);


--
-- Name: HeroSection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."HeroSection_id_seq"', 1, true);


--
-- Name: SolutionItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."SolutionItem_id_seq"', 147, true);


--
-- Name: SolutionTab_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."SolutionTab_id_seq"', 37, true);


--
-- Name: AboutSection AboutSection_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AboutSection"
    ADD CONSTRAINT "AboutSection_pkey" PRIMARY KEY (id);


--
-- Name: Attraction Attraction_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Attraction"
    ADD CONSTRAINT "Attraction_pkey" PRIMARY KEY (id);


--
-- Name: Channel Channel_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Channel"
    ADD CONSTRAINT "Channel_pkey" PRIMARY KEY (id);


--
-- Name: ExternalContent ExternalContent_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ExternalContent"
    ADD CONSTRAINT "ExternalContent_pkey" PRIMARY KEY (id);


--
-- Name: HeroSection HeroSection_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."HeroSection"
    ADD CONSTRAINT "HeroSection_pkey" PRIMARY KEY (id);


--
-- Name: NewsletterArticle NewsletterArticle_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."NewsletterArticle"
    ADD CONSTRAINT "NewsletterArticle_pkey" PRIMARY KEY (id);


--
-- Name: NewsletterSubscriber NewsletterSubscriber_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."NewsletterSubscriber"
    ADD CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY (id);


--
-- Name: PartnerItem PartnerItem_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PartnerItem"
    ADD CONSTRAINT "PartnerItem_pkey" PRIMARY KEY (id);


--
-- Name: ShowcaseInternal ShowcaseInternal_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ShowcaseInternal"
    ADD CONSTRAINT "ShowcaseInternal_pkey" PRIMARY KEY (id);


--
-- Name: ShowcaseItemRel ShowcaseItemRel_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ShowcaseItemRel"
    ADD CONSTRAINT "ShowcaseItemRel_pkey" PRIMARY KEY (id);


--
-- Name: SolutionItem SolutionItem_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SolutionItem"
    ADD CONSTRAINT "SolutionItem_pkey" PRIMARY KEY (id);


--
-- Name: SolutionTab SolutionTab_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SolutionTab"
    ADD CONSTRAINT "SolutionTab_pkey" PRIMARY KEY (id);


--
-- Name: Studio Studio_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Studio"
    ADD CONSTRAINT "Studio_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _AttractionToChannel _AttractionToChannel_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_AttractionToChannel"
    ADD CONSTRAINT "_AttractionToChannel_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _ChannelMembers _ChannelMembers_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_ChannelMembers"
    ADD CONSTRAINT "_ChannelMembers_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Channel_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Channel_name_key" ON public."Channel" USING btree (name);


--
-- Name: Channel_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Channel_slug_key" ON public."Channel" USING btree (slug);


--
-- Name: ExternalContent_providerId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "ExternalContent_providerId_key" ON public."ExternalContent" USING btree ("providerId");


--
-- Name: NewsletterSubscriber_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON public."NewsletterSubscriber" USING btree (email);


--
-- Name: Studio_credentialId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Studio_credentialId_key" ON public."Studio" USING btree ("credentialId");


--
-- Name: Studio_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Studio_name_key" ON public."Studio" USING btree (name);


--
-- Name: Studio_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Studio_slug_key" ON public."Studio" USING btree (slug);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: _AttractionToChannel_B_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "_AttractionToChannel_B_index" ON public."_AttractionToChannel" USING btree ("B");


--
-- Name: _ChannelMembers_B_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "_ChannelMembers_B_index" ON public."_ChannelMembers" USING btree ("B");


--
-- Name: ExternalContent ExternalContent_studioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ExternalContent"
    ADD CONSTRAINT "ExternalContent_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES public."Studio"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ShowcaseInternal ShowcaseInternal_studioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ShowcaseInternal"
    ADD CONSTRAINT "ShowcaseInternal_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES public."Studio"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ShowcaseItemRel ShowcaseItemRel_attractionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ShowcaseItemRel"
    ADD CONSTRAINT "ShowcaseItemRel_attractionId_fkey" FOREIGN KEY ("attractionId") REFERENCES public."Attraction"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ShowcaseItemRel ShowcaseItemRel_showcaseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ShowcaseItemRel"
    ADD CONSTRAINT "ShowcaseItemRel_showcaseId_fkey" FOREIGN KEY ("showcaseId") REFERENCES public."ShowcaseInternal"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SolutionItem SolutionItem_tabId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SolutionItem"
    ADD CONSTRAINT "SolutionItem_tabId_fkey" FOREIGN KEY ("tabId") REFERENCES public."SolutionTab"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Studio Studio_credentialId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Studio"
    ADD CONSTRAINT "Studio_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _AttractionToChannel _AttractionToChannel_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_AttractionToChannel"
    ADD CONSTRAINT "_AttractionToChannel_A_fkey" FOREIGN KEY ("A") REFERENCES public."Attraction"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _AttractionToChannel _AttractionToChannel_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_AttractionToChannel"
    ADD CONSTRAINT "_AttractionToChannel_B_fkey" FOREIGN KEY ("B") REFERENCES public."Channel"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ChannelMembers _ChannelMembers_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_ChannelMembers"
    ADD CONSTRAINT "_ChannelMembers_A_fkey" FOREIGN KEY ("A") REFERENCES public."Channel"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ChannelMembers _ChannelMembers_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_ChannelMembers"
    ADD CONSTRAINT "_ChannelMembers_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

