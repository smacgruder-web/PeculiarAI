import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peculiar AI Labs — Veterans",
  description:
    "Built by Veterans. Powered by AI. Mission-focused AI solutions from those who served. Veteran-owned AI operating system for healthcare, legal, and government ops.",
};

export default function VetsLanding() {
  return (
    <main style={styles.body}>
      {/* HERO */}
      <header style={styles.hero}>
        <div style={styles.heroWash} aria-hidden />
        <div style={styles.topbar}>
          <a href="/" style={styles.brand} aria-label="Peculiar AI Labs home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-wordmark.png"
              alt="Peculiar AI Labs"
              width={200}
              height={129}
              style={styles.brandLogo}
            />
            <span style={styles.brandDivider} aria-hidden />
            <span style={styles.vt}>Veterans</span>
          </a>
          <nav style={styles.nav} aria-label="Veterans page">
            <a href="#who" style={styles.navLink}>Mission</a>
            <a href="#blog" style={styles.navLink}>Stories</a>
            <a href="#resources" style={styles.navLink}>Resources</a>
            <a href="#contact" style={styles.navLink}>Contact</a>
          </nav>
        </div>
        <div style={styles.heroCenter}>
          <p style={styles.heroEyebrow}>Veteran-owned · Mission-ready</p>
          <h1 style={styles.heroH1}>
            Built by <span style={styles.gold}>Veterans.</span>
            <br />
            Powered by AI.
          </h1>
          <p style={styles.heroSub}>
            Mission-focused AI solutions from those who served.
          </p>
          <div style={styles.heroCtas}>
            <a href="#who" style={styles.btn}>
              Learn More
            </a>
            <a href="#blog" style={{ ...styles.btn, ...styles.btnGhost }}>
              Read Day 6
            </a>
          </div>
        </div>
      </header>

      {/* WHO ARE WE */}
      <section id="who" style={styles.section}>
        <h2 style={styles.secTitle}>Who Are We</h2>
        <p style={styles.secSub}>
          Not a logo with a chatbot bolted on — a vet who couldn&apos;t find the
          tool, so he built the operating system.
        </p>
        <div style={{ ...styles.card, maxWidth: 820 }}>
          <p style={styles.whoText}>
            We run AI like an operation, not a prototype: objectives, rules of
            engagement, after-action on every deploy. The founder — Lester Lee
            (S. Macgruder), U.S. Army Transportation Corps — treats your data
            and your model the way he was trained to treat a convoy: right
            thing, right place, intact.
          </p>
          <p style={styles.whoText}>
            &quot;Peculiar&quot; isn&apos;t a gimmick. It&apos;s the part of us
            that does the unobvious thing: private-by-default, local-first,
            mission-ready before market-ready. We build for the quiet wars too
            — the same discipline that holds comms on a bad day holds a
            veteran&apos;s mental-health toolkit on a worse one.
          </p>
          <div style={styles.badge}>
            <span style={{ color: "#ff5555" }}>VETERAN</span>
            <span style={{ color: "#fff" }}>OWNED</span>
            <span style={{ color: "#6699ff" }}>USA</span>
          </div>
        </div>
        <div style={styles.cards}>
          <div style={styles.card}>
            <h3 style={styles.cardH}>The Founder</h3>
            <p style={styles.cardP}>
              Veteran. AI builder. PTSD survivor who turned his own stand-down
              protocol into product. You&apos;re talking to the person who
              ships the code.
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardH}>The Company</h3>
            <p style={styles.cardP}>
              Peculiar AI Labs — veteran-owned, led, and staffed. We build a
              Behavioral Health AI OS and agentic platform on &quot;Peculiar
              One.&quot; Private, reliable, mission-ready.
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardH}>The Method</h3>
            <p style={styles.cardP}>
              Discipline over hype. We don&apos;t demo fairy dust. We deploy
              tools that hold when the bandwidth, budget, or day doesn&apos;t.
            </p>
          </div>
        </div>
      </section>

      {/* WELLNESS */}
      <section id="wellness" style={styles.section}>
        <h2 style={styles.secTitle}>Wellness &amp; Positive AI</h2>
        <p style={styles.secSub}>
          How we use AI as a force multiplier for the mind — private, local, no
          one reading it but you.
        </p>
        <div style={styles.cards}>
          <div style={styles.card}>
            <h3 style={styles.cardH}>Stand-Down Protocol</h3>
            <p style={styles.cardP}>
              A local model that reflects your 3AM spiral without judgment and
              walks you to a breathing drill. No cloud. No audience.
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardH}>Pattern Ledger</h3>
            <p style={styles.cardP}>
              Three fixed questions each morning — sleep, triggers, one good
              thing. The machine sees the pattern before you do.
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardH}>After-Action Self</h3>
            <p style={styles.cardP}>
              Run an AAR on yourself: what happened, what triggered it, what&apos;s
              the plan. Structured, private, ends with a plan — not a spiral.
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardH}>The Hard Line</h3>
            <p style={styles.cardP}>
              AI reflects, it does not prescribe. No diagnosis, no meds. If it
              detects real trouble, it tells you to call a person.
            </p>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" style={styles.section}>
        <h2 style={styles.secTitle}>The Daily Blog — AI &amp; My PTSD</h2>
        <p style={styles.secSub}>
          One vet&apos;s operating system for the quiet wars. Not therapy. Not a
          cure. Just what helps.
        </p>
        <div style={styles.post}>
          <div style={styles.day}>DAY 1</div>
          <h4 style={styles.postH}>Why I&apos;m writing this</h4>
          <p style={styles.postP}>
            They told me to &quot;manage&quot; it. I built something instead.
            Daily, I&apos;ll show you what actually helps — a veteran and AI
            founder using the tools he builds to keep his own head in the fight.
          </p>
        </div>
        <div style={styles.post}>
          <div style={styles.day}>DAY 2</div>
          <h4 style={styles.postH}>The 3AM loop</h4>
          <p style={styles.postP}>
            I taught a local AI to be a stand-down protocol: dump the spiral,
            it reflects it back without flinching and walks me to a breathing
            drill. A mirror that doesn&apos;t blink.
          </p>
        </div>
        <div style={styles.post}>
          <div style={styles.day}>DAY 3</div>
          <h4 style={styles.postH}>Journaling without the blank page</h4>
          <p style={styles.postP}>
            Three fixed questions every morning. Six months in, the pattern is
            obvious: my worst days follow three bad nights. The machine saw it
            before I did.
          </p>
        </div>
        <div style={styles.post}>
          <div style={styles.day}>DAY 4</div>
          <h4 style={styles.postH}>Grounding that travels</h4>
          <p style={styles.postP}>
            One-tap &quot;ground&quot; command with haptics. 5-4-3-2-1 when the
            world goes loud. The point isn&apos;t the AI — it&apos;s removing the
            friction between the tool and the moment.
          </p>
        </div>
        <div style={styles.post}>
          <div style={styles.day}>DAY 5</div>
          <h4 style={styles.postH}>Debrieﬁng myself</h4>
          <p style={styles.postP}>
            In the field we ran after-action reviews. At home, nobody debriefs
            you. So I do — with a local model as a battle buddy. Ends with a
            plan, not a spiral.
          </p>
        </div>
        <div style={styles.post} id="day-6">
          <div style={styles.day}>DAY 6</div>
          <h4 style={styles.postH}>The tool that didn&apos;t make me feel weak</h4>
          <p style={styles.postP}>
            I did not need a smarter lecture. I needed a place to talk that did
            not put an audience on me. Local stand-down: I dump the loop, it
            reflects it, then it walks me to one next action. No cloud. No
            scoreboard. If the night is bigger than a tool, I call a person —
            988, press 1.
          </p>
        </div>
        <a href="#contact" style={{ ...styles.btn, ...styles.btnGhost, marginTop: 14 }}>
          Read the series
        </a>
      </section>

      {/* STORIES */}
      <section id="stories" style={styles.section}>
        <h2 style={styles.secTitle}>Positive AI in the Military — Stories</h2>
        <p style={styles.secSub}>
          Real, permission-based accounts of AI used right by those who served.
        </p>
        <div style={styles.story}>
          &quot;I&apos;m a logistics NCO. We pointed the Peculiar One platform at
          our supply spreadsheets and it caught three duplicate orders in the
          first ten minutes — the kind of thing used to cost us a weekend of
          manual reconciliation. Discipline, augmented.&quot; — submitted by a
          peer, with permission.
        </div>
        <div style={styles.story}>
          &quot;My buddy uses the local stand-down tool on rough nights. He says
          it&apos;s the first thing that didn&apos;t make him feel weak for
          talking. That&apos;s a win worth building for.&quot; — from the daily
          blog, Day 6.
        </div>
        <div style={styles.story}>
          &quot;We&apos;re a small vet-serving clinic. The records RAG finds the
          right document in seconds instead of the resident digging for an hour.
          More time with vets, less time with folders.&quot; — partner org,
          anonymized.
        </div>
        <p style={{ ...styles.secSub, marginTop: 16 }}>
          Have a story? <a href="#contact">Send it in.</a> We publish only with
          your OK.
        </p>
      </section>

      {/* RESOURCES / CRISIS CTAs */}
      <section id="resources" style={styles.section}>
        <h2 style={styles.secTitle}>If You&apos;re Hurting — Reach Out</h2>
        <p style={styles.secSub}>
          AI is a tool, not a replacement for the squad. These are real people,
          right now.
        </p>
        <div style={styles.ctaBlock}>
          <div style={{ ...styles.cta, background: "#1a1414", borderColor: "#b22222" }}>
            <h3 style={{ color: "#ff6b6b", margin: "0 0 8px" }}>
              Veterans Crisis Line
            </h3>
            <p style={{ margin: "0 0 8px" }}>
              Confidential. 24/7. Press 1 for Veterans.
            </p>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: "8px 0" }}>
              988
            </div>
            <a href="tel:988" style={styles.btn}>
              Call 988
            </a>
            <p style={{ fontSize: 11, marginTop: 8 }}>
              <a href="https://www.veteranscrisisline.net" style={{ color: "#ff6b6b" }}>
                veteranscrisisline.net
              </a>
            </p>
          </div>
          <div style={{ ...styles.cta, background: "#141a14", borderColor: "#5a8f5a" }}>
            <h3 style={{ color: "#8fd18f", margin: "0 0 8px" }}>
              Veteran Homelessness
            </h3>
            <p style={{ margin: "0 0 8px" }}>
              VA homeless assistance &amp; local coalitions can help with
              housing now.
            </p>
            <a
              href="https://www.va.gov/homeless/"
              style={styles.btn}
              target="_blank"
              rel="noopener noreferrer"
            >
              Find Help
            </a>
          </div>
          <div style={{ ...styles.cta, background: "#1a1714", borderColor: "#c9a44c" }}>
            <h3 style={{ color: "#e3c574", margin: "0 0 8px" }}>Service Dogs</h3>
            <p style={{ margin: "0 0 8px" }}>
              Task-trained dogs for PTSD, mobility, and alert. Start with
              accredited orgs.
            </p>
            <a
              href="https://www.va.gov/health-care/about-va-health-benefits/service-dog-program/"
              style={styles.btn}
              target="_blank"
              rel="noopener noreferrer"
            >
              VA Service Dog Program
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ ...styles.section, textAlign: "center" }}>
        <h2 style={styles.secTitle}>Stand the Post With Us</h2>
        <p style={styles.secSub}>
          We&apos;re peculiar on purpose. Built by Veterans. Powered by AI.
        </p>
        <a
          href="mailto:caio@peculiarailabs.com?subject=Peculiar%20Vets%20Briefing"
          style={styles.btn}
        >
          Get the Briefing
        </a>
        <a href="#who" style={{ ...styles.btn, ...styles.btnGhost, marginLeft: 10 }}>
          Learn More
        </a>
      </section>

      <footer style={styles.footer}>
        <div style={styles.patches}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/vets/patch1.png" alt="Army patch" style={styles.patchImg} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/vets/patch2.png" alt="Army patch" style={styles.patchImg} />
        </div>
        Peculiar AI Labs is a veteran-owned and led company. U.S. Army service
        reflected by the Transportation Corps and sustainment-command insignia
        shown.
        <br />
        These pages share personal anecdotes, not medical advice. If you are in
        crisis, call 988 (press 1).
      </footer>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    margin: 0,
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: "#f4f1e8",
    background: "#1a1c14",
    lineHeight: 1.65,
    // brand tokens (used via styles.gold; kept here for clarity)
    ["--gold" as string]: "#d4b56a",
    ["--gold-soft" as string]: "#e3c574",
    ["--olive" as string]: "#2d3a1f",
  } as React.CSSProperties,
  hero: {
    position: "relative",
    overflow: "hidden",
    background:
      "radial-gradient(1200px 520px at 50% -10%, rgba(212,181,106,.16), transparent 55%), linear-gradient(165deg, #2f3c22 0%, #1a1c14 58%, #12130f 100%)",
    minHeight: "72vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  } as React.CSSProperties,
  heroWash: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
    maskImage: "linear-gradient(180deg, rgba(0,0,0,.55), transparent 75%)",
    pointerEvents: "none",
  } as React.CSSProperties,
  topbar: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    margin: "16px 18px 0",
    padding: "12px 18px",
    borderRadius: 16,
    border: "1px solid rgba(212,181,106,.22)",
    background: "rgba(12,13,10,.55)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    boxShadow: "0 10px 40px rgba(0,0,0,.28)",
  } as React.CSSProperties,
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    textDecoration: "none",
    color: "inherit",
    minWidth: 0,
  } as React.CSSProperties,
  brandLogo: {
    display: "block",
    height: 48,
    width: "auto",
    maxWidth: 200,
    objectFit: "contain",
    // Universal wordmark: PECULIAR + hex AI + LABS (never spell “AI” as letters)
    filter: "drop-shadow(0 2px 10px rgba(0,0,0,.35))",
  } as React.CSSProperties,
  brandDivider: {
    width: 1,
    height: 28,
    background: "rgba(212,181,106,.35)",
    flexShrink: 0,
  } as React.CSSProperties,
  vt: {
    fontSize: 11,
    letterSpacing: "0.28em",
    textTransform: "uppercase",
    color: "#e3c574",
    fontWeight: 700,
  },
  nav: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: "4px 6px",
  },
  navLink: {
    marginLeft: 0,
    padding: "8px 12px",
    fontSize: 13,
    color: "#f4f1e8",
    opacity: 0.88,
    textDecoration: "none",
    borderRadius: 999,
    letterSpacing: "0.02em",
  } as React.CSSProperties,
  heroCenter: {
    position: "relative",
    zIndex: 1,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "48px 20px 56px",
  },
  heroEyebrow: {
    margin: "0 0 14px",
    fontSize: 12,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "rgba(227,197,116,.9)",
    fontWeight: 600,
  },
  heroH1: {
    fontSize: "clamp(32px,6.2vw,60px)",
    margin: 0,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    lineHeight: 1.08,
    textShadow: "0 2px 18px rgba(0,0,0,.45)",
  },
  gold: { color: "#d4b56a" },
  heroSub: {
    fontSize: "clamp(15px,2.4vw,20px)",
    color: "#e3c574",
    margin: "14px 0 28px",
    fontStyle: "italic",
    maxWidth: 520,
    textShadow: "0 2px 12px rgba(0,0,0,.45)",
  },
  heroCtas: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
  },
  btn: {
    display: "inline-block",
    background: "linear-gradient(180deg,#e0c57a 0%,#c9a44c 100%)",
    color: "#1c1d16",
    fontWeight: 800,
    padding: "12px 26px",
    borderRadius: 999,
    fontSize: 14,
    letterSpacing: "0.04em",
    cursor: "pointer",
    border: "none",
    textDecoration: "none",
    boxShadow: "0 8px 24px rgba(0,0,0,.28)",
  } as React.CSSProperties,
  btnGhost: {
    background: "transparent",
    border: "1px solid rgba(212,181,106,.55)",
    color: "#e3c574",
    boxShadow: "none",
  } as React.CSSProperties,
  section: { padding: "64px 24px", maxWidth: 980, margin: "0 auto" },
  secTitle: {
    fontSize: 28,
    fontWeight: 800,
    color: "#d4b56a",
    margin: "0 0 8px",
    letterSpacing: "-0.01em",
  },
  secSub: { color: "#cfcabb", margin: "0 0 26px", fontSize: 15, maxWidth: 640 },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: 18,
  },
  card: {
    background: "linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.025))",
    border: "1px solid rgba(212,181,106,.22)",
    borderRadius: 16,
    padding: 22,
    boxShadow: "0 12px 32px rgba(0,0,0,.18)",
  },
  cardH: { margin: "0 0 8px", color: "#e3c574", fontSize: 17 },
  cardP: { margin: 0, fontSize: 14, color: "#e7e3d6" },
  whoText: { fontSize: 15, color: "#ece8db", margin: "0 0 12px" },
  badge: {
    display: "inline-flex",
    gap: 8,
    alignItems: "center",
    background: "#111",
    borderRadius: 6,
    padding: "6px 12px",
    fontWeight: 800,
    fontSize: 12,
    letterSpacing: 1,
    marginTop: 14,
  },
  post: {
    background: "rgba(255,255,255,.04)",
    borderLeft: "3px solid #c9a44c",
    padding: "16px 18px",
    borderRadius: "0 10px 10px 0",
    marginBottom: 14,
  },
  day: { fontSize: 11, color: "#e3c574", letterSpacing: 1 },
  postH: { margin: "4px 0 6px", fontSize: 16, color: "#f4f1e8" },
  postP: { margin: 0, fontSize: 14, color: "#ddd9cc" },
  story: {
    fontStyle: "italic",
    color: "#ece8db",
    fontSize: 15,
    borderTop: "1px solid rgba(201,164,76,.2)",
    borderBottom: "1px solid rgba(201,164,76,.2)",
    padding: "18px 0",
  },
  ctaBlock: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: 18,
    marginTop: 8,
  },
  cta: {
    border: "1px solid",
    borderRadius: 12,
    padding: 22,
    textAlign: "center",
  } as React.CSSProperties,
  patches: { display: "flex", gap: 10, justifyContent: "center", margin: "14px 0" },
  patchImg: {
    width: 46,
    height: 46,
    objectFit: "contain",
    border: "1px solid #555",
    borderRadius: 6,
    background: "#fff",
    padding: 2,
  },
  footer: {
    padding: "34px 24px",
    textAlign: "center",
    fontSize: 12,
    color: "#9a967f",
    borderTop: "1px solid rgba(201,164,76,.2)",
  },
};
