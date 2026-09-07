import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import logo from "@/assets/logo.jpeg";
import "./NextStep.css";
import NextStepFollowUp from "@/components/NextStepFollowUp";

const safety = "In the US or Canada, call 911 for immediate danger or a suspected overdose. Call or text 988 for a suicide crisis. Elsewhere, use your local emergency or crisis service. This guide is not monitored and cannot assess safety or replace urgent help.";
const paths = [
  {
    label: "Understanding options",
    question: "What would help you get oriented?",
    choices: ["Compare kinds of support", "Choose one manageable first step"],
    title: "Understand the options without deciding everything today",
    steps: [
      "Write down two specific things you have observed, without labels or guesses about a diagnosis. Note how they affect daily life and what you want help understanding.",
      "A licensed clinician can assess medical and treatment needs. Family counseling or a support group can help you look after yourself. An intervention professional can help prepare a coordinated family conversation; an intervention is not the only option.",
      "Before choosing a provider, ask about credentials, their approach to consent, fees, any referral payments, and how they match care to clinical needs. Ask what happens if your loved one declines help.",
    ],
    tailored: [
      "Make a short comparison on paper: clinical assessment, family support, and intervention planning. For each, write one question and the likely cost or time commitment you need clarified. You can gather information without committing to a service.",
      "Pick one action you control: write down a question for a clinician, ask a trusted person to sit with you, or identify a family support meeting. Choose a realistic time to revisit it; you do not need your loved one's agreement to seek support for yourself.",
    ],
  },
  {
    label: "Preparing a family conversation",
    question: "What part of the conversation feels hardest?",
    choices: ["Finding words that do not blame", "Setting a boundary I can keep"],
    title: "Prepare a conversation built on care and clear limits",
    steps: [
      "Choose a calm time when no one is intoxicated and a setting where everyone can leave safely. Do not stage a confrontation. If you fear violence or retaliation, seek individual safety advice before approaching them.",
      "Keep the opening short: ‘I care about you. I noticed [specific observation], and I feel worried. Would you be willing to talk about getting support?’ Listen to their response rather than arguing over a label.",
      "Agree on one concrete offer, such as helping find a licensed clinician if they want that help. If they say no, pause. You can continue caring and seek your own support without forcing a decision.",
    ],
    tailored: [
      "Practice two sentences aloud with a trusted person. Describe what you saw rather than saying ‘you always’ or ‘you never.’ Try: ‘I was worried when you missed work twice. What has this week been like for you?’ Leave room for an answer.",
      "A boundary describes your own action, not a punishment: ‘I will not ride in a car when the driver has been drinking. I can help arrange a safe ride.’ Choose something realistic, explain it calmly, and plan how to follow through safely. Avoid threats or using basic needs as leverage.",
    ],
  },
  {
    label: "Immediate concern",
    question: "Urgent help comes first. What information do you need?",
    choices: ["Emergency and crisis steps", "Support after urgent help is arranged"],
    title: "Put immediate safety ahead of planning",
    steps: [
      "For immediate danger, suspected overdose, unresponsiveness, or trouble breathing, call 911 now in the US or Canada. Tell the dispatcher your location and what you observe; follow their instructions. Do not wait for a website reply.",
      "For a suicide crisis, call or text 988 in the US or Canada. If someone is in immediate physical danger, call 911. You can contact a crisis service when you are worried about someone else, too.",
      "Move yourself and children away from danger if you can do so safely. Do not physically confront, restrain, or attempt to manage a dangerous situation alone. Ask emergency responders or a qualified clinician for next steps.",
    ],
    tailored: [
      "If an opioid overdose is suspected and naloxone is available, use it according to its instructions while emergency help is on the way. Follow the dispatcher's instructions. Do not leave the person alone if it is safe to remain, and do not assume improvement means emergency care is unnecessary.",
      "Once urgent help is in place, write down the professional's instructions, who to contact next, and who can support you tonight. Withdrawal can be medically dangerous, especially with alcohol or benzodiazepines. Do not force abrupt stopping or attempt an unsupervised home detox; seek medical guidance.",
    ],
  },
];

export default function NextStep() {
  const [path, setPath] = useState<number | null>(null);
  const [choice, setChoice] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const current = path === null ? null : paths[path];
  const complete = current !== null && choice !== null;
  useEffect(() => { heading.current?.focus(); }, [path, choice]);
  // Drop in-memory choices when leaving, including back/forward cache restores.
  useEffect(() => {
    const clear = () => { setPath(null); setChoice(null); setStatus(""); };
    window.addEventListener("pagehide", clear);
    return () => window.removeEventListener("pagehide", clear);
  }, []);
  const reset = () => { setChoice(null); setPath(null); setStatus("Choices cleared. Choose where to start."); };
  const download = () => {
    if (!current || choice === null) return;
    const text = ["Freedom Interventions — Your next-step guide", current.title, ...current.steps.map((step, i) => `${i + 1}. ${step}`), "Your next action", current.tailored[choice], safety, "General education, not a diagnosis or treatment recommendation. Contact is optional: https://freedominterventions.com/contact"].join("\n\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = "my-next-step-guide.txt";
    document.body.appendChild(link); link.click(); link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("Download requested. On a shared device, remove the file when you no longer need it.");
  };
  return <div className="next-step">
    <Helmet>
      <title>Not ready to call? | Freedom Interventions</title>
      <meta name="description" content="Make a private next-step plan for understanding addiction support, preparing a family conversation, or finding urgent help. No sign-up required." />
      <link rel="canonical" href="https://freedominterventions.com/next-step" />
      <meta property="og:url" content="https://freedominterventions.com/next-step" />
      <meta name="referrer" content="no-referrer" />
    </Helmet>
    <header><a href="/" className="next-step-brand"><img src={logo} alt="" width="40" height="44" />Freedom Interventions</a><a href="#guide">Skip to guide</a></header>
    <main id="guide">
      <p className="next-step-eyebrow">Not ready to call?</p>
      <h1>Make a plan for your next step</h1>
      <p>You can care about someone and still need time to think. Get a short, practical guide without signing up or sharing contact details.</p>
      <p className="next-step-privacy">Your choices stay in this page's memory, not in a URL or saved browser storage. They are only sent to Matt if you submit the optional follow-up form and separately choose to share them. No analytics, session replay, chat, or popups run here. Reset or reload to clear your choices. Visiting the page may appear in browser history and ordinary hosting logs; downloaded files stay on your device.</p>
      <aside aria-label="Urgent help" className="next-step-safety"><strong>Do not wait if someone needs urgent help.</strong><p>{safety}</p><div><a href="tel:911">Call 911</a><a href="tel:988">Call 988</a><a href="sms:988">Text 988</a></div></aside>
      <section className="next-step-card" aria-labelledby="step-heading">
        <p className="next-step-eyebrow">{complete ? "Your guide" : current ? "Step 2 of 2" : "Step 1 of 2"}</p>
        <h2 id="step-heading" tabIndex={-1} ref={heading}>{complete ? current.title : current ? current.question : "Where would you like to start?"}</h2>
        {!current && <div className="next-step-choices">{paths.map((item, i) => <button key={item.label} onClick={() => { setPath(i); setStatus(""); }}>{item.label}<span aria-hidden="true"> →</span></button>)}</div>}
        {current && !complete && <div className="next-step-choices">{current.choices.map((item, i) => <button key={item} onClick={() => { setChoice(i); setStatus(""); }}>{item}<span aria-hidden="true"> →</span></button>)}</div>}
        {complete && <>
          <ol>{current.steps.map(step => <li key={step}>{step}</li>)}</ol>
          <h3>Your next action</h3><p>{current.tailored[choice]}</p>
          <p className="next-step-disclaimer">General education, not a diagnosis, risk assessment, or treatment recommendation. You choose whether and when to seek non-emergency support.</p>
          <button onClick={download}>Download text guide</button>
          <p className="next-step-disclaimer">A download saves this guide to your device. Take care with shared devices.</p>
          <NextStepFollowUp key={`${path}-${choice}`} guideSummary={`${current.label}\n${current.choices[choice]}`} />
          <div className="next-step-contact"><h3>Other contact options</h3><p>Optional: the link below opens our existing contact form. Nothing is sent unless you submit that form, and your guide choices are not carried over. That page uses the site's usual privacy and analytics practices.</p><a href="/contact">Contact Matt — opens contact form</a></div>
        </>}
        {current && <div className="next-step-controls"><button onClick={() => { if (complete) setChoice(null); else setPath(null); setStatus(""); }}>Back</button><button onClick={reset}>Reset choices</button></div>}
        <p role="status" aria-live="polite">{status}</p>
      </section>
    </main>
    <footer><a href="/">Return to Freedom Interventions</a><a href="/privacy-policy">Privacy policy</a></footer>
  </div>;
}
