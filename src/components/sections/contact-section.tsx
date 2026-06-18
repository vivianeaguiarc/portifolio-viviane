"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/shared/brand-icons";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SOCIAL_LINKS } from "@/constants/site";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),
  email: z.string().email("E-mail inválido"),
  message: z
    .string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(1000, "Mensagem muito longa"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const socialItems = [
  {
    label: "LinkedIn",
    href: SOCIAL_LINKS.linkedin,
    icon: LinkedinIcon,
    description: "Conecte-se profissionalmente",
  },
  {
    label: "GitHub",
    href: SOCIAL_LINKS.github,
    icon: GithubIcon,
    description: "Veja meus repositórios",
  },
  {
    label: "Instagram",
    href: SOCIAL_LINKS.instagram,
    icon: InstagramIcon,
    description: "Acompanhe meu dia a dia",
  },
  {
    label: "E-mail",
    href: SOCIAL_LINKS.email,
    icon: Mail,
    description: "contato@viviane.dev",
  },
];

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simula envio — integrar com API ou serviço de e-mail em produção
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.info("Formulário enviado:", data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <AnimatedSection id="contato" className="bg-muted/30 py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Contato"
          title="Vamos conversar?"
          description="Estou aberta a oportunidades, projetos e parcerias. Entre em contato!"
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {socialItems.map(({ label, href, icon: Icon, description }) => (
              <Link
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="group"
              >
                <Card className="glass h-full transition-all hover:border-primary/50 hover:shadow-md">
                  <CardHeader className="pb-2">
                    <Icon
                      className="h-6 w-6 text-primary transition-transform group-hover:scale-110"
                      aria-hidden
                    />
                    <CardTitle className="text-base">{label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Envie uma mensagem</CardTitle>
              <CardDescription>
                Preencha o formulário e retornarei o mais breve possível.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      className="text-sm text-destructive"
                      role="alert"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="text-sm text-destructive"
                      role="alert"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    placeholder="Como posso ajudar?"
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    {...register("message")}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="text-sm text-destructive"
                      role="alert"
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Enviando..." : "Enviar mensagem"}
                </Button>

                {isSubmitted && (
                  <p
                    className="text-center text-sm text-emerald-600 dark:text-emerald-400"
                    role="status"
                  >
                    Mensagem enviada com sucesso! Entrarei em contato em breve.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AnimatedSection>
  );
}
