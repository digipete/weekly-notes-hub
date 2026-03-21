import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config/site";

export default function About() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: siteConfig.author,
      description:
        "A grey haired technologist working across strategy, architecture, delivery, design and development.",
      url: siteConfig.url + "/about",
      sameAs: [
        "https://linkedin.com/in/petehallett",
        "https://github.com/petehallett",
      ],
      jobTitle: "Technologist",
      knowsAbout: [
        "Strategy",
        "Architecture",
        "Delivery",
        "Design",
        "Development",
        "Digital transformation",
        "Product management",
      ],
    },
  };

  return (
    <>
      <Helmet>
        <title>About — {siteConfig.name}</title>
        <meta
          name="description"
          content={`About ${siteConfig.author} — a grey haired technologist working across strategy, architecture, delivery, design and development.`}
        />
        <link rel="canonical" href={`${siteConfig.url}/about`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <article className="mx-auto max-w-reading px-6 py-12">
        <h1 className="font-display text-3xl font-bold tracking-tight mb-8">
          About
        </h1>

        <div className="prose-weeknote">
          <p>
            Hello, I'm {siteConfig.author}. I'm a grey haired technologist with
            a passion for building things that matter. I've spent my career
            working across strategy, architecture, delivery, design and
            development — helping organisations make better use of technology.
          </p>

          <p>
            I believe in pragmatic approaches to complex problems, working in the
            open, and building teams that deliver. My work sits at the
            intersection of technology leadership and hands-on delivery, which
            means I'm as comfortable shaping strategy as I am writing code.
          </p>

          <p>
            These weeknotes are a place for me to think out loud — sharing what
            I'm working on, what I'm learning, and what's catching my attention.
            They're part reflection, part accountability, and part an attempt to
            connect with others working on similar things.
          </p>

          <h2>What I do</h2>

          <p>
            I work on digital strategy, technical architecture, and delivery. I'm
            interested in how organisations can use technology to genuinely
            improve outcomes — not just digitise existing processes, but rethink
            them entirely.
          </p>

          <p>
            My areas of focus include:
          </p>

          <ul>
            <li>Technology strategy and architecture</li>
            <li>Digital delivery and agile ways of working</li>
            <li>Design systems and frontend development</li>
            <li>Team building and leadership</li>
            <li>Open source and working in the open</li>
          </ul>

          <h2>Elsewhere on the web</h2>

          <ul>
            <li>
              <a href="https://linkedin.com/in/petehallett">LinkedIn</a>
            </li>
            <li>
              <a href="https://github.com/petehallett">GitHub</a>
            </li>
          </ul>

          <h2>Get in touch</h2>

          <p>
            If you'd like to chat about any of the topics I write about, or if
            you think we could work together, feel free to reach out via{" "}
            <a href="https://linkedin.com/in/petehallett">LinkedIn</a>.
          </p>
        </div>
      </article>
    </>
  );
}
