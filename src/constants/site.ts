export const SITE_CONFIG = {
  name: "Viviane",
  fullName: "Viviane Aguiar Silva Simões",
  title: "Desenvolvedora Fullstack Júnior",
  description:
    "Portfólio de Viviane Aguiar Silva Simões — Desenvolvedora Fullstack Júnior com foco em backend, TypeScript, Node.js, Java, Spring Boot, APIs REST e arquitetura de software.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-viviane.vercel.app",
  locale: "pt_BR",
  author: "Viviane Aguiar Silva Simões",
  profileImage: "/profile/viviane-2.jpg",
  ogImage: "/og-image.svg",
  keywords: [
    "Viviane Aguiar Silva Simões",
    "desenvolvedora fullstack júnior",
    "desenvolvedora backend júnior",
    "Node.js",
    "TypeScript",
    "React",
    "Next.js",
    "Java",
    "Spring Boot",
    "APIs REST",
    "Backend",
    "Fullstack",
    "Software Architecture",
    "arquitetura de software",
    "engenharia de software",
    "portfólio",
  ],
} as const;

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/vivianeaguiarc/",
  github: "https://github.com/vivianeaguiarc",
  instagram: "https://www.instagram.com/vivianezzt/",
  email: "vivianeaguiarc@outlook.com",
} as const;
