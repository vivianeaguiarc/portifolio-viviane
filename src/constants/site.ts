export const SITE_CONFIG = {
  name: "Viviane",
  fullName: "Viviane Aguiar",
  title: "Desenvolvedora Backend",
  description:
    "Portfólio profissional de Viviane Aguiar, desenvolvedora backend com foco em Node.js, TypeScript, APIs REST, arquitetura de software e boas práticas de engenharia.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-viviane.vercel.app",
  locale: "pt_BR",
  author: "Viviane Aguiar",
  profileImage: "/profile/viviane-2.jpg",
  ogImage: "/og-image.svg",
  keywords: [
    "Viviane Aguiar",
    "Node.js",
    "TypeScript",
    "Backend",
    "APIs REST",
    "NestJS",
    "Express",
    "PostgreSQL",
    "MySQL",
    "Docker",
    "Software Architecture",
    "desenvolvedora backend",
    "portfólio",
  ],
} as const;

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/vivianeaguiarc/",
  github: "https://github.com/vivianeaguiarc",
  instagram: "https://www.instagram.com/vivianezzt/",
  email: "vivianeaguiarc@outlook.com",
} as const;
