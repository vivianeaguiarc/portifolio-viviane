export const SITE_CONFIG = {
  name: "Viviane",
  fullName: "Viviane",
  title: "Desenvolvedora Fullstack",
  description:
    "Portfólio profissional de Viviane — Desenvolvedora Fullstack especializada em Next.js, TypeScript, arquitetura de software e soluções escaláveis.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-viviane.vercel.app",
  locale: "pt_BR",
  author: "Viviane",
  profileImage: "/viviane.jpg",
  ogImage: "/og-image.svg",
  keywords: [
    "desenvolvedora fullstack",
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "portfólio",
    "desenvolvedora de software",
    "engenharia de software",
  ],
} as const;

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/vivianeaguiarc/",
  github: "https://github.com/vivianeaguiarc",
  instagram: "https://www.instagram.com/vivianezzt/",
  email: "mailto:contato@viviane.dev",
  resume: "/curriculo-viviane.pdf",
} as const;
