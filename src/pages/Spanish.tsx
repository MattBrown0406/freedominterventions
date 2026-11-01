import { Link } from "react-router-dom";
import { AlertTriangle, CalendarCheck, CheckCircle2, Clock, HeartHandshake, MessageCircle, Phone, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import SEOHead from "@/components/SEOHead";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { FAQSchema, WebPageSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { AYUDA_SOBRIA_URL, SPANISH_LINE_DISPLAY, SPANISH_LINE_E164 } from "@/config/spanishLine";
import { trackEvent } from "@/lib/analytics";

const WHATSAPP_URL = "https://wa.me/5038362136";
const PAGE_URL = "https://freedominterventions.com/es";
const TITLE = "Intervención familiar para adicciones, en español | Freedom Interventions";
const DESCRIPTION =
  "Matt Brown habla español con fluidez y ayuda a familias a enfrentar la adicción de un ser querido con un plan claro hacia el tratamiento. Llame al (458) 298-8011.";

const services = [
  {
    name: "Consulta gratuita",
    price: "Gratis",
    length: "15 minutos, por teléfono o Zoom",
    body: "Una conversación confidencial para entender lo que está pasando y cuál es el siguiente paso más sensato para su familia.",
  },
  {
    name: "Sesión de coaching en crisis",
    price: "$150",
    length: "60 minutos",
    body: "Para cuando la situación se está saliendo de control: qué decir, qué límites poner y qué hacer esta semana.",
  },
  {
    name: "Family Readiness Intensive",
    price: "$2,500",
    length: "90 minutos + 7 días de apoyo",
    body: "Un plan completo para la familia: el mensaje, quién participa, opciones de tratamiento y seguimiento por teléfono, texto o Zoom durante una semana.",
  },
  {
    name: "Intervención profesional",
    price: "Normalmente $7,500 a $9,500 + gastos de viaje",
    length: "Preparación, intervención e ingreso a tratamiento",
    body: "Matt prepara a la familia, dirige la intervención y coordina el ingreso a tratamiento y el apoyo después.",
  },
];

const steps = [
  { title: "Primera llamada", body: "Usted cuenta lo que está pasando. Matt hace preguntas directas y le da una opinión honesta." },
  { title: "Preparación de la familia", body: "Se decide quién participa, qué se va a decir y qué límites se van a sostener. Se elige el tratamiento antes de la intervención." },
  { title: "La intervención", body: "Una conversación estructurada, con amor y sin ataques. No es una emboscada: el objetivo es que su ser querido acepte ayuda ese mismo día." },
  { title: "Tratamiento y después", body: "Matt acompaña el ingreso a tratamiento y ayuda a la familia a no volver a los patrones de antes." },
];

const faqs = [
  {
    question: "¿Atienden en español?",
    answer:
      "Sí. Matt Brown habla español con fluidez y puede trabajar con su familia en español: consultas, preparación e intervención. Nuestra línea en español es el (458) 298-8011.",
  },
  {
    question: "¿Mi ser querido tiene que estar de acuerdo antes de empezar?",
    answer:
      "No. La mayoría de las familias llaman precisamente porque su ser querido no acepta ayuda. El trabajo empieza con la familia, y la intervención se prepara para que la persona tenga una oportunidad real de decir que sí.",
  },
  {
    question: "¿Cuánto cuesta una intervención?",
    answer:
      "La consulta inicial es gratuita. Una sesión de coaching en crisis cuesta $150, el Family Readiness Intensive $2,500, y una intervención profesional completa normalmente cuesta entre $7,500 y $9,500 más gastos de viaje. Antes de recomendar una intervención, Matt le explica todas las opciones.",
  },
  {
    question: "¿Trabajan con familias fuera de Oregón?",
    answer: "Sí. Matt tiene su sede en Oregón y trabaja con familias en todo Estados Unidos y en otros países, por teléfono, Zoom y en persona.",
  },
  {
    question: "¿Es confidencial?",
    answer: "Sí. Todo lo que usted comparta queda entre su familia y Matt.",
  },
];

const SpanishPage = () => (
  <div className="min-h-screen bg-background" lang="es">
    <SEOHead
      title={TITLE}
      description={DESCRIPTION}
      canonical={PAGE_URL}
      keywords="intervención familiar, intervención adicciones, ayuda para familias adicción, intervencionista en español, alcoholismo familia, drogadicción familia"
      lang="es"
      aiDescription={`${DESCRIPTION} Matt Brown tiene más de 20 años de experiencia en intervenciones profesionales. Si alguien está en peligro inmediato, llame al 911; en una crisis de suicidio, llame al 988 y marque 2 para español.`}
    />
    <WebPageSchema name={TITLE} description={DESCRIPTION} url={PAGE_URL} />
    <FAQSchema faqs={faqs} />
    <Navbar />
    <BreadcrumbNav items={[{ name: "Español", href: "/es" }]} />

    <main>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-10 md:py-16">
        <div className="container px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Intervención familiar en español</p>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Si la adicción está afectando a su familia, no tiene que enfrentarlo solo
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Matt Brown es intervencionista profesional con más de 20 años de experiencia y habla español con fluidez.
              Ayuda a familias a pasar del miedo y el caos a un plan claro para que su ser querido reciba tratamiento.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <TrackedPhoneLink phoneNumber={SPANISH_LINE_E164} metadata={{ location: "es_page_hero" }}>
                <Button size="xl" variant="hero" className="w-full sm:w-auto">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  Llamar en español: {SPANISH_LINE_DISPLAY}
                </Button>
              </TrackedPhoneLink>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { location: "es_page_hero" })}
              >
                <Button size="xl" className="w-full bg-[#25D366] text-white hover:bg-[#1fb855] sm:w-auto">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Escribir por WhatsApp
                </Button>
              </a>
            </div>
            <div className="mx-auto mt-6 max-w-2xl space-y-2 rounded-xl border border-primary/20 bg-background/80 p-4 text-left text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  Al llamar al {SPANISH_LINE_DISPLAY}, le atiende en español el asistente virtual de{" "}
                  <a href={AYUDA_SOBRIA_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-2">
                    AyudaSobria.com
                  </a>
                  .
                </span>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  Matt responde personalmente a mensajes de voz, WhatsApp y correos en un plazo de 4 horas. Si está con una familia
                  durante una intervención, puede tardar un poco más.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency */}
      <section aria-labelledby="es-emergency" className="border-y border-destructive/20 bg-destructive/5">
        <div className="container px-6 py-6">
          <div className="mx-auto max-w-4xl">
            <h2 id="es-emergency" className="flex items-center gap-2 text-lg font-semibold text-destructive md:text-xl">
              <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />
              ¿Hay alguien en peligro ahora mismo?
            </h2>
            <p className="mt-1 text-sm text-foreground md:text-base">
              Freedom Interventions no es un servicio de emergencias médicas. Primero busque ayuda de emergencia y después llame a Matt.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a href="tel:911" className="flex items-center justify-center gap-2 rounded-lg bg-destructive px-4 py-3 font-semibold text-destructive-foreground hover:bg-destructive/90">
                <Phone className="h-5 w-5" aria-hidden="true" />
                <span className="text-center leading-tight">Llamar al 911<span className="block text-sm font-normal">sobredosis o peligro</span></span>
              </a>
              <a href="tel:988" className="flex items-center justify-center gap-2 rounded-lg border-2 border-destructive bg-background px-4 py-3 font-semibold text-destructive hover:bg-destructive/5">
                <Phone className="h-5 w-5" aria-hidden="true" />
                <span className="text-center leading-tight">Llamar al 988<span className="block text-sm font-normal">marque 2 para español</span></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 md:py-16">
        <div className="container px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center font-serif text-3xl font-bold text-foreground md:text-4xl">Cómo puede ayudar Matt</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
              Precios claros desde el principio. Usted decide el siguiente paso, sin presión.
            </p>
            <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <li key={service.name} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary">{service.price}</p>
                  <h3 className="mt-2 font-serif text-xl font-bold text-foreground">{service.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{service.length}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{service.body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm text-muted-foreground md:p-6">
              <p className="flex items-start gap-2">
                <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <strong className="text-foreground">¿Quiere agendar una consulta gratuita?</strong> El calendario y los formularios de
                  nuestro sitio están en inglés. Lo más fácil es llamar al{" "}
                  <TrackedPhoneLink phoneNumber={SPANISH_LINE_E164} metadata={{ location: "es_page_booking_note" }} className="font-medium text-primary underline underline-offset-2">
                    {SPANISH_LINE_DISPLAY}
                  </TrackedPhoneLink>{" "}
                  o escribir por WhatsApp y le ayudamos en español. Si prefiere usar el calendario,{" "}
                  <Link to="/book?type=consultation#booking" className="font-medium text-primary underline underline-offset-2" lang="en">
                    está aquí
                  </Link>
                  .
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border/50 bg-muted/30 py-12 md:py-16">
        <div className="container px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-serif text-3xl font-bold text-foreground md:text-4xl">Cómo funciona una intervención</h2>
            <ol className="mt-8 grid gap-5 md:grid-cols-2">
              {steps.map((step, index) => (
                <li key={step.title} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {index + 1}
                    </span>
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
            <ul className="mx-auto mt-8 max-w-3xl space-y-2 text-sm text-muted-foreground">
              {[
                "No necesita tener todo resuelto antes de llamar.",
                "Una intervención no es un ataque: es amor con límites claros.",
                "Puede empezar aunque su ser querido no quiera ayuda todavía.",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16">
        <div className="container px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-serif text-3xl font-bold text-foreground md:text-4xl">Preguntas frecuentes</h2>
            <div className="mt-8 space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-xl border border-border bg-card p-4 open:shadow-sm">
                  <summary className="cursor-pointer list-none font-semibold text-foreground marker:hidden">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Free resources */}
      <section aria-labelledby="es-resources" className="border-t border-border/50 bg-muted/20 py-12 md:py-16">
        <div className="container px-6">
          <div className="mx-auto max-w-5xl">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
              <HeartHandshake className="h-4 w-4" aria-hidden="true" />
              Apoyo para usted
            </p>
            <h2 id="es-resources" className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
              Recursos gratuitos en español
            </h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Vivir con la adicción de un ser querido agota. Usted también merece apoyo, esté o no listo para llamar.
            </p>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              <li className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground">AyudaSobria.com</h3>
                <p className="mt-2 text-sm text-muted-foreground">Línea de ayuda en español, atendida por un asistente virtual.</p>
                <a href={AYUDA_SOBRIA_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
                  ayudasobria.com<span className="sr-only"> (se abre en una pestaña nueva)</span>
                </a>
              </li>
              <li className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground">Línea Nacional de Ayuda de SAMHSA</h3>
                <p className="mt-2 text-sm text-muted-foreground">Gratis, confidencial, las 24 horas, en inglés y español. Información y referencias a tratamiento.</p>
                <a href="tel:+18006624357" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">1-800-662-4357</a>
              </li>
              <li className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground">988 Línea de Prevención del Suicidio y Crisis</h3>
                <p className="mt-2 text-sm text-muted-foreground">Llame al 988 y marque 2 para hablar en español, las 24 horas.</p>
                <a href="tel:988" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">988</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-16">
        <div className="container px-6">
          <div className="mx-auto max-w-3xl rounded-2xl bg-primary p-8 text-center text-primary-foreground">
            <Users className="mx-auto h-8 w-8" aria-hidden="true" />
            <h2 className="mt-3 font-serif text-2xl font-bold md:text-3xl">Dé el primer paso hoy</h2>
            <p className="mt-3 text-primary-foreground/90">
              Una llamada confidencial puede cambiar el rumbo de su familia. Sin compromiso y sin juicios.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <TrackedPhoneLink phoneNumber={SPANISH_LINE_E164} metadata={{ location: "es_page_footer_cta" }}>
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  {SPANISH_LINE_DISPLAY}
                </Button>
              </TrackedPhoneLink>
              <a href="mailto:matt@freedominterventions.com" className="inline-flex items-center justify-center rounded-md border border-primary-foreground/40 px-6 py-2 font-medium hover:bg-primary-foreground/10">
                matt@freedominterventions.com
              </a>
            </div>
            <p className="mt-4 text-sm text-primary-foreground/80">Puede escribir en español.</p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default SpanishPage;
