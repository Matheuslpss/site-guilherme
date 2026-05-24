"use client";

import { AnimatePresence, motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowUpRight, Film, Mail, Menu, MoveRight, Play, Send, X } from "lucide-react";
import { useState } from "react";

const navItems = ["Projetos", "Servicos", "Mentoria", "Sobre", "Contato"];

const projects = [
  {
    title: "Casa Horizonte",
    category: "Residencia / Fachada",
    year: "2026",
    image: "/assets/hero-architecture.png",
    video: "/mp_.mp4",
    description: "Estudo de fachada contemporanea, luz de fim de tarde e atmosfera imobiliaria premium."
  },
  {
    title: "Interior Serena",
    category: "Interiores / CGI",
    year: "2026",
    image: "/assets/project-living.png",
    video: "/mp_.mp4",
    description: "Visualizacao de interiores com foco em materiais, conforto visual e direcao de arte."
  },
  {
    title: "Atelier Nobre",
    category: "Comercial / Imagem",
    year: "2025",
    image: "/assets/project-lobby.png",
    video: "/mp_.mp4",
    description: "Imagem editorial para empreendimento comercial com linguagem silenciosa e sofisticada."
  },
  {
    title: "Villa Dusk",
    category: "Resort / Animacao",
    year: "2025",
    image: "/assets/hero-architecture.png",
    video: "/mp_.mp4",
    description: "Preview cinematografico para narrativa de venda, chegada, escala e experiencia espacial."
  }
];

const services = [
  "Visualizacao arquitetonica 3D",
  "Interiores",
  "Fachadas",
  "CGI para empreendimentos",
  "Renderizacao imobiliaria",
  "Design visual arquitetonico",
  "Animacoes 3D",
  "Conceitos visuais para arquitetura"
];

const mentorshipItems = [
  "Videos mentorando",
  "Bastidores e making of",
  "Workflow de producao",
  "Estudos de iluminacao",
  "Processo criativo",
  "Direcao de imagem"
];

const softEase = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: softEase }
  }
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--champagne)]">
      <span className="h-px w-10 bg-[var(--champagne)]" />
      {children}
    </span>
  );
}

function PrimaryButton({
  href,
  children,
  variant = "dark"
}: {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light";
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-sm font-semibold transition ${
        variant === "dark"
          ? "bg-[var(--ink)] text-[var(--chalk)] hover:bg-[var(--soft-black)]"
          : "border border-white/45 bg-white/10 text-white backdrop-blur-md hover:bg-white/18"
      }`}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </motion.a>
  );
}

function FullscreenMenu({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[var(--ink)] text-[var(--chalk)]"
        >
          <div className="mx-auto flex h-full max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
            <div className="flex items-center justify-between">
              <a href="#" className="font-display text-3xl font-semibold tracking-tight">
                GUILHERME
              </a>
              <button
                aria-label="Fechar menu"
                onClick={onClose}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/18 transition hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid flex-1 items-end gap-10 py-14 lg:grid-cols-[1.08fr_0.92fr]">
              <motion.nav variants={stagger} initial="hidden" animate="visible">
                {navItems.map((item) => (
                  <motion.a
                    variants={fadeUp}
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={onClose}
                    className="group flex items-center justify-between border-b border-white/12 py-5 font-display text-5xl leading-none tracking-tight text-white/90 transition hover:text-white sm:text-7xl lg:text-8xl"
                  >
                    {item}
                    <MoveRight className="h-7 w-7 opacity-35 transition group-hover:translate-x-2 group-hover:opacity-100" />
                  </motion.a>
                ))}
              </motion.nav>
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.8, ease: softEase }}
                className="max-w-md justify-self-end text-white/58"
              >
                <p className="text-xs uppercase tracking-[0.32em] text-white/34">Archviz studio</p>
                <p className="mt-5 text-lg leading-8">
                  Imagens, filmes e direcao visual para arquitetura, interiores e empreendimentos
                  que precisam comunicar valor antes da obra existir.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.24], [0, 90]);
  const heroScale = useTransform(scrollYProgress, [0, 0.24], [1, 1.09]);

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--porcelain)] text-[var(--ink)]">
      <div className="noise" />
      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <header className="fixed left-0 right-0 top-0 z-40 px-4 pt-4 sm:px-6">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/40 bg-[rgba(247,244,238,0.78)] px-4 py-3 shadow-sm backdrop-blur-xl lg:hidden">
          <a href="#" className="font-display text-2xl font-semibold">
            GUILHERME
          </a>
          <button
            aria-label="Abrir menu"
            onClick={() => setMenuOpen(true)}
            className="inline-flex h-10 items-center gap-3 rounded-full border border-black/10 px-4 text-sm font-medium"
          >
            Menu
            <Menu className="h-4 w-4" />
          </button>
        </nav>
      </header>

      <section className="relative min-h-screen px-3 pb-3 pt-3">
        <div className="relative min-h-[calc(100vh-24px)] overflow-hidden rounded-[28px] bg-black text-white sm:rounded-[38px]">
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8, ease: softEase }}
            className="absolute left-6 right-6 top-5 z-20 hidden items-center justify-between border-b border-white/26 pb-4 opacity-0 lg:flex"
          >
            <a href="#" className="font-display text-3xl font-semibold tracking-tight">
              GUILHERME
            </a>
            <div className="flex items-center gap-10 text-sm font-medium text-white/82">
              {navItems.slice(0, 4).map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-white">
                  {item}
                </a>
              ))}
            </div>
            <button
              aria-label="Abrir menu"
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center gap-3 text-sm font-medium text-white"
            >
              Menu
              <Menu className="h-5 w-5" />
            </button>
          </motion.div>

          <motion.video
            style={{ y: heroY, scale: heroScale }}
            className="absolute inset-0 h-full w-full object-cover opacity-88"
            src="/assets/hero-archviz-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <motion.div
            initial={{ opacity: 0.24 }}
            animate={{ opacity: [0.22, 0.3, 0.22] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(255,250,241,0.14),transparent_35%)]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,11,10,0.22)_0%,rgba(12,11,10,0.06)_45%,rgba(12,11,10,0.56)_100%)]" />
          <div className="absolute right-8 top-24 z-20 hidden rounded-full bg-black/20 px-5 py-3 text-xs font-semibold text-white/62 backdrop-blur-md lg:block">
            Cinematic loop
          </div>

          <div className="relative z-10 mx-auto flex min-h-[calc(100vh-24px)] max-w-7xl flex-col justify-end px-5 pb-8 pt-28 sm:px-8 sm:pb-10 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[1.06fr_0.56fr] lg:items-end">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.82, ease: softEase }}
                  className="mb-6 text-xs font-semibold uppercase tracking-[0.34em] text-white/68 opacity-0"
                >
                  Archviz / CGI / Interiors
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.32, duration: 0.9, ease: softEase }}
                  className="max-w-5xl font-display text-[13.2vw] font-medium leading-[0.9] tracking-tight text-balance opacity-0 sm:text-[9.5vw] sm:leading-[0.86] lg:text-[6.8vw]"
                >
                  Visualizacao arquitetonica e experiencias visuais em 3D.
                </motion.h1>
              </div>
              <div className="max-w-md lg:justify-self-end">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.55, duration: 0.82, ease: softEase }}
                  className="text-base leading-7 text-white/76 opacity-0 sm:text-lg"
                >
                  Arquitetura, interiores e renderizacoes realistas para projetos premium.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.75, duration: 0.82, ease: softEase }}
                  className="mt-7 flex flex-wrap gap-3 opacity-0"
                >
                  <PrimaryButton href="#projetos" variant="light">
                    Ver Projetos
                  </PrimaryButton>
                  <PrimaryButton href="#contato" variant="light">
                    Solicitar Projeto
                  </PrimaryButton>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="mx-auto grid max-w-7xl gap-10 border-b border-black/10 pb-20 lg:grid-cols-[0.72fr_1.28fr]"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Estudio de visualizacao</SectionLabel>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="font-display text-4xl font-medium leading-[1.02] tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            Criamos imagens e filmes que transformam projetos arquitetonicos em desejo,
            percepcao de valor e narrativa visual.
          </motion.p>
        </motion.div>
      </section>

      <section id="projetos" className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.28 }}
            className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Projetos</SectionLabel>
            </motion.div>
            <motion.div variants={fadeUp}>
              <h2 className="font-display text-5xl font-medium leading-none tracking-tight text-balance sm:text-7xl">
                Cases premium para arquitetura, interiores e empreendimentos.
              </h2>
              <p className="mt-7 max-w-2xl leading-8 text-[var(--graphite)]">
                Cada imagem nasce como uma peca editorial: luz, escala, materialidade e
                enquadramento trabalhando para vender uma atmosfera realista.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="mt-16 grid gap-4 lg:grid-cols-2"
          >
            {projects.map((project, index) => (
              <motion.article
                variants={fadeUp}
                key={project.title}
                onMouseEnter={() => setActivePreview(project.title)}
                onMouseLeave={() => setActivePreview(null)}
                onClick={() => setActivePreview(activePreview === project.title ? null : project.title)}
                className={`group cursor-pointer overflow-hidden rounded-[8px] bg-[var(--chalk)] ${
                  index === 1 ? "lg:mt-20" : index === 2 ? "lg:-mt-10" : ""
                }`}
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-[var(--stone)]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 ${
                      activePreview === project.title ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <video
                    src={project.video}
                    className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${
                      activePreview === project.title ? "opacity-100" : "opacity-0"
                    }`}
                    muted
                    loop
                    playsInline
                    autoPlay={activePreview === project.title}
                    poster={project.image}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.48)_100%)]" />
                  <div className="absolute bottom-5 left-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/78">
                    <Film className="h-4 w-4" />
                    Hover preview
                  </div>
                </div>
                <div className="grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:p-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[var(--champagne)]">
                      {project.category} / {project.year}
                    </p>
                    <h3 className="mt-3 font-display text-4xl font-medium leading-none">
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-xl leading-7 text-[var(--graphite)]">
                      {project.description}
                    </p>
                  </div>
                  <ArrowUpRight className="h-6 w-6 text-[var(--graphite)] transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="servicos" className="bg-[var(--chalk)] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.75fr_1.25fr]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Servicos</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-8 font-display text-5xl font-medium leading-none tracking-tight sm:text-6xl"
            >
              CGI para arquitetura com direcao artistica e precisao comercial.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            className="grid sm:grid-cols-2"
          >
            {services.map((service, index) => (
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -4 }}
                key={service}
                className="border-b border-black/10 px-0 py-7 sm:px-6"
              >
                <span className="font-display text-2xl text-[var(--champagne)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 font-display text-3xl font-medium leading-tight">
                  {service}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="mentoria" className="px-3 py-3">
        <motion.div
          initial={{ opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.9, ease: softEase }}
          className="relative mx-auto max-w-[1520px] overflow-hidden rounded-[26px] bg-[var(--ink)] text-[var(--chalk)] sm:rounded-[36px]"
        >
          <div className="grid min-h-[760px] lg:grid-cols-[0.95fr_1.05fr]">
            <div className="flex flex-col justify-between px-6 py-10 sm:px-10 lg:px-14">
              <SectionLabel>Cursos e mentoria</SectionLabel>
              <div className="mt-24 max-w-xl">
                <h2 className="font-display text-5xl font-medium leading-none tracking-tight sm:text-7xl">
                  Ensino o que vivo na pratica.
                </h2>
                <p className="mt-8 text-lg leading-8 text-white/62">
                  Formacao criativa para artistas que querem elevar imagem, luz, narrativa e
                  producao com mentalidade de estudio internacional.
                </p>
                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  {mentorshipItems.map((item) => (
                    <div
                      key={item}
                      className="border-b border-white/12 py-3 text-sm font-semibold text-white/76"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative min-h-[480px] overflow-hidden">
              <video
                src="/mp_.mp4"
                poster="/assets/project-lobby.png"
                className="h-full w-full object-cover opacity-82"
                muted
                loop
                autoPlay
                playsInline
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.42))]" />
              <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between border-t border-white/20 pt-5 text-sm text-white/70">
                <span>Workflow / Lighting / Making of</span>
                <Play className="h-5 w-5 fill-white" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="sobre" className="px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.85, ease: softEase }}
            className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[var(--stone)] lg:max-w-lg"
          >
            <img
              src="/assets/artist-guilherme.jpeg"
              alt="Retrato cinematografico de Guilherme"
              className="h-full w-full object-cover object-[50%_22%]"
            />
            <div className="absolute inset-0 bg-black/18" />
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl lg:justify-self-end"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Sobre</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-8 font-display text-5xl font-medium leading-none tracking-tight sm:text-7xl"
            >
              Imagens para arquitetura antes dela existir.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-8 text-xl leading-9 text-[var(--graphite)]">
              Especialista em visualizacao arquitetonica, interiores e criacao de imagens 3D
              realistas para arquitetura e empreendimentos premium.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <footer id="contato" className="bg-[var(--ink)] px-5 py-16 text-[var(--chalk)] sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 border-b border-white/12 pb-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <SectionLabel>Contato</SectionLabel>
              <h2 className="mt-8 font-display text-6xl font-medium leading-none tracking-tight sm:text-8xl lg:text-9xl">
                Vamos visualizar o projeto.
              </h2>
            </div>
            <div className="lg:justify-self-end">
              <p className="max-w-md text-lg leading-8 text-white/62">
                Renderizacoes, filmes e direcao visual para arquitetura, interiores e
                empreendimentos imobiliarios de alto padrao.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PrimaryButton href="mailto:contato@guilhermestudio.com" variant="light">
                  Solicitar Projeto
                </PrimaryButton>
                <a
                  href="mailto:contato@guilhermestudio.com"
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/20 transition hover:bg-white/10"
                  aria-label="Enviar email"
                >
                  <Mail className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/20 transition hover:bg-white/10"
                  aria-label="Abrir Instagram"
                >
                  <Send className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-8 text-sm text-white/42 sm:flex-row sm:items-center sm:justify-between">
            <p>Guilherme Studio 2026</p>
            <p>Archviz / CGI / Interiors / Real estate visualization</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
