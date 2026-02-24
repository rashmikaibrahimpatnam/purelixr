import { useState } from "react";

// ─── Perfume Data ─────────────────────────────────────────────────────────────
const perfumes = [
  { name: "Blew",   mood: "mysterious",  occasion: "evening",  scentFamily: "woody"    },
  { name: "Aven",   mood: "romantic",    occasion: "evening",  scentFamily: "floral"   },
  { name: "Revive", mood: "fresh",       occasion: "daily",    scentFamily: "citrus"   },
  { name: "Sahra",  mood: "adventurous", occasion: "outdoor",  scentFamily: "woody"    },
  { name: "Aira",   mood: "romantic",    occasion: "evening",  scentFamily: "floral"   },
  { name: "Hola",   mood: "fresh",       occasion: "daily",    scentFamily: "citrus"   },
  { name: "Candi",  mood: "playful",     occasion: "daily",    scentFamily: "sweet"    },
  { name: "Femine", mood: "romantic",    occasion: "evening",  scentFamily: "floral"   },
  { name: "Ride",   mood: "adventurous", occasion: "outdoor",  scentFamily: "woody"    },
  { name: "Elai",   mood: "mysterious",  occasion: "evening",  scentFamily: "oriental" },
  { name: "Crush",  mood: "romantic",    occasion: "evening",  scentFamily: "oriental" },
  { name: "Rivera", mood: "fresh",       occasion: "outdoor",  scentFamily: "citrus"   },
  { name: "Inkar",  mood: "mysterious",  occasion: "evening",  scentFamily: "woody"    },
  { name: "Swim",   mood: "fresh",       occasion: "outdoor",  scentFamily: "citrus"   },
  { name: "Smoke",  mood: "mysterious",  occasion: "evening",  scentFamily: "woody"    },
  { name: "Nova",   mood: "mysterious",  occasion: "evening",  scentFamily: "oriental" },
  { name: "Bloom",  mood: "adventurous", occasion: "outdoor",  scentFamily: "floral"   },
  { name: "Hani",   mood: "romantic",    occasion: "evening",  scentFamily: "oriental" },
  { name: "Royale", mood: "mysterious",  occasion: "evening",  scentFamily: "oriental" },
  { name: "Retro",  mood: "playful",     occasion: "daily",    scentFamily: "sweet"    },
];

// ─── Quiz Questions ───────────────────────────────────────────────────────────
const questions = [
  {
    id: "mood",
    question: "What feeling do you want to carry with you?",
    subtitle: "Let your mood lead the way.",
    options: [
      { value: "romantic",    label: "Romantic",    emoji: "🌹", desc: "Soft, dreamy, intimate"       },
      { value: "mysterious",  label: "Mysterious",  emoji: "🌙", desc: "Dark, complex, alluring"      },
      { value: "fresh",       label: "Fresh",       emoji: "🌊", desc: "Clean, airy, energising"      },
      { value: "adventurous", label: "Adventurous", emoji: "🌿", desc: "Bold, earthy, free-spirited"  },
      { value: "playful",     label: "Playful",     emoji: "✨", desc: "Sweet, fun, carefree"         },
    ],
    image: "/purelixr_sahra.png",
  },
  {
    id: "occasion",
    question: "When will you wear your signature scent?",
    subtitle: "The right moment deserves the right fragrance.",
    options: [
      { value: "evening", label: "Evening Glamour",      emoji: "🥂", desc: "Dinners, dates & galas"                    },
      { value: "daily",   label: "Everyday Luxury",      emoji: "☕", desc: "Morning coffee to afternoon meetings"      },
      { value: "outdoor", label: "The Great Outdoors",   emoji: "🌄", desc: "Nature walks & adventures"                },
    ],
    image: "/purelixr_retro.png",
  },
  {
    id: "scentFamily",
    question: "Which scent world calls to you?",
    subtitle: "Close your eyes and imagine…",
    options: [
      { value: "floral",   label: "Floral",    emoji: "🌸", desc: "Rose, jasmine & peony"       },
      { value: "woody",    label: "Woody",     emoji: "🪵", desc: "Sandalwood, oud & cedar"     },
      { value: "citrus",   label: "Citrus",    emoji: "🍋", desc: "Bergamot, lemon & neroli"    },
      { value: "oriental", label: "Oriental",  emoji: "🕌", desc: "Amber, musk & spice"         },
      { value: "sweet",    label: "Sweet",     emoji: "🍯", desc: "Vanilla, tonka & caramel"    },
    ],
    image: "/purelixr_bloom.png",
  },
];

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz_tGYtP9ViSlP-O3dJowrRNZoSVbs8JEG2WzawhCB1qzvyeZhAfj17SBcErWtjk-Ns/exec";

// ─── Scoring ──────────────────────────────────────────────────────────────────
function recommend(answers) {
  const scored = perfumes.map((p) => {
    let score = 0;
    if (p.mood === answers.mood) score += 3;
    if (p.occasion === answers.occasion) score += 3;
    if (p.scentFamily === answers.scentFamily) score += 4;
    return { ...p, score };
  });
  scored.sort((a, b) => b.score - a.score);
  const seen = new Set();
  const top = [];
  for (const p of scored) {
    if (!seen.has(p.name)) { seen.add(p.name); top.push(p); }
    if (top.length === 3) break;
  }
  return top;
}

// ─── Particles ────────────────────────────────────────────────────────────────
function Particles() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          background: `rgba(212,175,55,${Math.random() * 0.5 + 0.1})`,
          borderRadius: "50%",
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${Math.random() * 8 + 6}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 5}s`,
        }} />
      ))}
    </div>
  );
}

// ─── Confetti ─────────────────────────────────────────────────────────────────
function Confetti() {
  const colors = ["#d4af37", "#f5d87e", "#b8860b", "#fff8dc", "#fffacd"];
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 10, overflow: "hidden" }}>
      {Array.from({ length: 35 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 30}%`,
          width: `${Math.random() * 8 + 4}px`,
          height: `${Math.random() * 8 + 4}px`,
          background: colors[Math.floor(Math.random() * colors.length)],
          borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          animation: `confettiFall ${Math.random() * 2 + 1.5}s ease-in forwards`,
          animationDelay: `${Math.random() * 2}s`,
          opacity: 0,
        }} />
      ))}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [step, setStep]       = useState("intro");
  const [qIndex, setQIndex]   = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const [animIn, setAnimIn]   = useState(true);

  const currentQ = questions[qIndex];

  function transition(fn) {
    setAnimIn(false);
    setTimeout(() => { fn(); setAnimIn(true); }, 350);
  }

  function handleNext() {
    if (!selected) return;
    const newAnswers = { ...answers, [currentQ.id]: selected };
    setAnswers(newAnswers);
    if (qIndex < questions.length - 1) {
      transition(() => { setQIndex(qIndex + 1); setSelected(null); });
    } else {
      const top3 = recommend(newAnswers);
      setResults(top3);
      transition(() => setStep("result"));
    }
  }

  function restart() {
    transition(() => { setStep("intro"); setQIndex(0); setAnswers({}); setSelected(null); setResults([]); });
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600&family=Raleway:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #000; color: #f5e6c8; font-family: 'Raleway', sans-serif; min-height: 100vh; overflow-x: hidden; }

        @keyframes float        { 0%,100%{transform:translateY(0) rotate(0);opacity:.6} 50%{transform:translateY(-30px) rotate(180deg);opacity:1} }
        @keyframes shimmer      { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes fadeSlideUp  { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseGold    { 0%,100%{box-shadow:0 0 20px rgba(212,175,55,.3)} 50%{box-shadow:0 0 40px rgba(212,175,55,.6)} }
        @keyframes cardReveal   { from{opacity:0;transform:translateY(40px) scale(.95)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes spinRing     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes winnersGlow  { 0%,100%{text-shadow:0 0 20px rgba(212,175,55,.4)} 50%{text-shadow:0 0 60px rgba(212,175,55,.9)} }
        @keyframes confettiFall { 0%{transform:translateY(-20px) rotate(0);opacity:1} 100%{transform:translateY(100px) rotate(360deg);opacity:0} }

        .page-animate { animation: fadeSlideUp 0.5s ease forwards; opacity: 0; }
        .page-hidden  { opacity: 0; transform: translateY(20px); transition: all 0.35s ease; }

        .gold-text {
          background: linear-gradient(90deg,#b8860b,#d4af37,#f5d87e,#d4af37,#b8860b);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .option-card {
          border: 1px solid rgba(212,175,55,.2); background: rgba(212,175,55,.03);
          border-radius: 12px; padding: 18px 22px; cursor: pointer;
          transition: all .3s ease; display: flex; align-items: center; gap: 16px; backdrop-filter: blur(10px);
        }
        .option-card:hover  { border-color:rgba(212,175,55,.6); background:rgba(212,175,55,.08); transform:translateX(6px); }
        .option-card.selected { border-color:#d4af37; background:rgba(212,175,55,.12); box-shadow:0 0 20px rgba(212,175,55,.25),inset 0 0 30px rgba(212,175,55,.05); }

        .btn-primary {
          background: linear-gradient(135deg,#b8860b,#d4af37,#b8860b); background-size:200% auto;
          border:none; color:#000; font-family:'Cinzel',serif; font-size:13px;
          letter-spacing:3px; text-transform:uppercase; padding:16px 48px;
          cursor:pointer; border-radius:2px; transition:all .4s ease; font-weight:600;
        }
        .btn-primary:hover    { background-position:right center; box-shadow:0 8px 30px rgba(212,175,55,.4); transform:translateY(-2px); }
        .btn-primary:disabled { opacity:.35; cursor:not-allowed; transform:none; box-shadow:none; }

        .btn-ghost {
          background:transparent; border:1px solid rgba(212,175,55,.4); color:#d4af37;
          font-family:'Cinzel',serif; font-size:11px; letter-spacing:3px; text-transform:uppercase;
          padding:12px 36px; cursor:pointer; border-radius:2px; transition:all .3s ease;
        }
        .btn-ghost:hover { background:rgba(212,175,55,.1); border-color:#d4af37; }

        .result-card {
          border:1px solid rgba(212,175,55,.3); background:rgba(212,175,55,.04);
          border-radius:16px; padding:32px 28px; text-align:center;
          backdrop-filter:blur(15px); transition:all .4s ease; position:relative; overflow:visible;
        }
        .result-card::before { content:''; position:absolute; top:0;left:0;right:0;height:1px; background:linear-gradient(90deg,transparent,#d4af37,transparent); }
        .result-card:hover   { border-color:rgba(212,175,55,.6); box-shadow:0 20px 60px rgba(212,175,55,.15); transform:translateY(-5px); }

        .divider-gold { width:80px; height:1px; background:linear-gradient(90deg,transparent,#d4af37,transparent); margin:0 auto; }
        .progress-bar { height:2px; background:rgba(212,175,55,.15); border-radius:2px; overflow:hidden; }
        .progress-fill { height:100%; background:linear-gradient(90deg,#b8860b,#d4af37); border-radius:2px; transition:width .6s ease; }
        .ornament { color:rgba(212,175,55,.5); font-size:14px; letter-spacing:8px; }

        .gold-input {
          width:100%; padding:14px 20px; background:rgba(212,175,55,.05);
          border:1px solid rgba(212,175,55,.25); border-radius:4px; color:#f5e6c8;
          font-family:'Raleway',sans-serif; font-size:14px; outline:none; display:block;
          transition:border-color .3s ease,background .3s ease;
        }
        .gold-input:focus       { border-color:rgba(212,175,55,.6); background:rgba(212,175,55,.08); }
        .gold-input::placeholder { color:rgba(245,230,200,.3); }
      `}</style>

      <div style={{ position:"fixed", inset:0, zIndex:0, background:"radial-gradient(ellipse at 20% 50%,rgba(212,175,55,.04) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(212,175,55,.03) 0%,transparent 50%),#050505" }} />
      <Particles />

      <div style={{ position:"relative", zIndex:1, minHeight:"100vh" }}>
        {step === "intro"  && <IntroScreen onStart={() => transition(() => setStep("quiz"))} animIn={animIn} />}
        {step === "quiz"   && <QuizScreen question={currentQ} qIndex={qIndex} total={questions.length} selected={selected} onSelect={setSelected} onNext={handleNext} animIn={animIn} />}
        {step === "result" && <ResultScreen results={results} onRestart={restart} animIn={animIn} />}
      </div>
    </>
  );
}

// ─── Intro Screen ─────────────────────────────────────────────────────────────
function IntroScreen({ onStart, animIn }) {
  return (
    <div className={animIn ? "page-animate" : "page-hidden"} style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"40px 24px", gap:"32px" }}>
      <div style={{ position:"relative" }}>
        <div style={{ width:"200px", height:"200px", borderRadius:"50%", background:"radial-gradient(circle,rgba(212,175,55,.08) 0%,transparent 70%)", display:"flex", alignItems:"center", justifyContent:"center", animation:"pulseGold 3s ease-in-out infinite", position:"relative" }}>
          <img src="/purelixr-logo.png" alt="Purelixr" onError={e => e.target.style.display="none"} style={{ width:"170px", objectFit:"contain", filter:"drop-shadow(0 0 20px rgba(212,175,55,.5))" }} />
          <span className="gold-text" style={{ position:"absolute", fontFamily:"'Cinzel',serif", fontSize:"22px", letterSpacing:"6px", color:"#d4af37", textShadow:"0 0 30px rgba(212,175,55,.6)" }}>PURELIXR</span>
        </div>
      </div>
      <div style={{ maxWidth:"520px" }}>
        <p className="ornament">✦ &nbsp;&nbsp; ✦ &nbsp;&nbsp; ✦</p>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(38px,8vw,68px)", fontWeight:300, lineHeight:1.1, marginTop:"16px", marginBottom:"16px", color:"#f5e6c8", letterSpacing:"2px" }}>
          Find Your<br /><span className="gold-text" style={{ fontStyle:"italic", fontWeight:400 }}>Signature Scent</span>
        </h1>
        <div className="divider-gold" style={{ marginBottom:"20px" }} />
        <p style={{ fontFamily:"'Raleway',sans-serif", fontWeight:300, fontSize:"15px", lineHeight:1.8, color:"rgba(245,230,200,.6)", letterSpacing:".5px" }}>
          Three questions. One perfect fragrance.<br />Let us guide you to a scent that speaks your story.
        </p>
      </div>
      <button className="btn-primary" onClick={onStart}>Begin the Journey</button>
      <p style={{ fontSize:"11px", color:"rgba(212,175,55,.35)", letterSpacing:"3px", fontFamily:"'Cinzel',serif" }}>PURELIXR · LUXURY FRAGRANCES</p>
    </div>
  );
}

// ─── Quiz Screen ──────────────────────────────────────────────────────────────
function QuizScreen({ question, qIndex, total, selected, onSelect, onNext, animIn }) {
  return (
    <div className={animIn ? "page-animate" : "page-hidden"} style={{ minHeight:"100vh", display:"grid", gridTemplateColumns:"1fr 1fr" }}>
      <div style={{ position:"relative", overflow:"hidden", minHeight:"100vh" }}>
        <img src={question.image} alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 30%", filter:"brightness(0.45) sepia(0.3)" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(5,5,5,0) 0%,rgba(5,5,5,.9) 100%)" }} />
        <div style={{ position:"absolute", bottom:"40px", left:"32px", fontFamily:"'Cormorant Garamond',serif", fontSize:"13px", letterSpacing:"4px", color:"rgba(212,175,55,.6)", textTransform:"uppercase" }}>
          Question {qIndex + 1} of {total}
        </div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", padding:"60px 48px", gap:"32px", background:"rgba(5,5,5,.95)" }}>
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
            <span style={{ fontSize:"10px", letterSpacing:"3px", color:"rgba(212,175,55,.5)", fontFamily:"'Cinzel',serif" }}>PURELIXR</span>
            <span style={{ fontSize:"10px", letterSpacing:"2px", color:"rgba(212,175,55,.5)", fontFamily:"'Raleway',sans-serif" }}>{qIndex+1}/{total}</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width:`${((qIndex+1)/total)*100}%` }} /></div>
        </div>
        <div>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:"13px", color:"rgba(212,175,55,.6)", letterSpacing:"2px", marginBottom:"10px" }}>{question.subtitle}</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(24px,3vw,36px)", fontWeight:400, color:"#f5e6c8", lineHeight:1.25, letterSpacing:"1px" }}>{question.question}</h2>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          {question.options.map((opt, i) => (
            <div key={opt.value} className={`option-card ${selected === opt.value ? "selected" : ""}`} onClick={() => onSelect(opt.value)}>
              <span style={{ fontSize:"22px", flexShrink:0 }}>{opt.emoji}</span>
              <div>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:"12px", letterSpacing:"2px", color:selected===opt.value?"#d4af37":"#f5e6c8", marginBottom:"3px" }}>{opt.label}</div>
                <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:"12px", fontWeight:300, color:"rgba(245,230,200,.45)" }}>{opt.desc}</div>
              </div>
              {selected === opt.value && <div style={{ marginLeft:"auto", color:"#d4af37", fontSize:"16px" }}>✦</div>}
            </div>
          ))}
        </div>
        <button className="btn-primary" onClick={onNext} disabled={!selected}>
          {qIndex < questions.length - 1 ? "Continue →" : "Reveal My Scents →"}
        </button>
      </div>
    </div>
  );
}

// ─── Result Screen ────────────────────────────────────────────────────────────
function ResultScreen({ results, onRestart, animIn }) {
  // phase: "results" → "form" → "revealing" → "winner" | "thankyou" | "duplicate"
  const [phase, setPhase]         = useState("results");
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [winnerName, setWinnerName] = useState("");

  const scentImages = {
    floral:   "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    woody:    "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&q=80",
    citrus:   "https://images.unsplash.com/photo-1525904097878-94fb15835963?w=400&q=80",
    oriental: "https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=400&q=80",
    sweet:    "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=400&q=80",
  };

  // ── Submit handler ── (standalone function, NOT inside any JSX)
  async function handleSubmit() {
    if (!name.trim()) { setFormError("Please enter your name."); return; }
    if (!email.trim() || !email.includes("@")) { setFormError("Please enter a valid email."); return; }
    setFormError("");
    setSubmitting(true);
    setPhase("revealing");

    try {
      const params = new URLSearchParams({
        name:     name.trim(),
        email:    email.trim(),
        perfumes: results.map(p => p.name).join(", "),
      });

      const res  = await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`);
      const data = await res.json();

      setTimeout(() => {
        setWinnerName(name.trim());
        if (data.duplicate) {
          setPhase("duplicate");
        } else {
          setPhase(data.isWinner ? "winner" : "thankyou");
        }
        setSubmitting(false);
      }, 3000);

    } catch (err) {
      console.error("Submission error:", err);
      setTimeout(() => {
        setWinnerName(name.trim());
        setPhase("thankyou");
        setSubmitting(false);
      }, 3000);
    }
  } // ← handleSubmit ends here

  // ── Shared perfume cards component ──
  const PerfumeCards = ({ compact = false }) => (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:compact?"16px":"24px", width:"100%", maxWidth:"900px" }}>
      {results.map((p, i) => (
        <div key={p.name} className="result-card" style={{ animation:"cardReveal 0.6s ease forwards", animationDelay:`${i*0.15}s`, opacity:0, padding:compact?"20px 18px":"32px 28px" }}>
          {i === 0 && (
            <div style={{ position:"absolute", top:"-12px", left:"50%", transform:"translateX(-50%)", background:"linear-gradient(90deg,#b8860b,#d4af37)", color:"#000", fontFamily:"'Cinzel',serif", fontSize:"9px", letterSpacing:"3px", padding:"4px 16px", borderRadius:"20px", whiteSpace:"nowrap" }}>
              BEST MATCH
            </div>
          )}
          <div style={{ width:compact?"60px":"80px", height:compact?"60px":"80px", borderRadius:"50%", overflow:"hidden", margin:"0 auto 16px", border:"1px solid rgba(212,175,55,.3)", boxShadow:"0 0 20px rgba(212,175,55,.15)" }}>
            <img src={scentImages[p.scentFamily]} alt={p.scentFamily} style={{ width:"100%", height:"100%", objectFit:"cover", filter:"sepia(0.2) brightness(0.8)" }} />
          </div>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:compact?"22px":"28px", fontWeight:400, color:i===0?"#d4af37":"#f5e6c8", letterSpacing:"3px", marginBottom:"4px" }}>{p.name}</h3>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:"9px", letterSpacing:"4px", textTransform:"uppercase", color:"rgba(212,175,55,.5)", marginBottom:"14px" }}>{p.scentFamily}</p>
          <div className="divider-gold" style={{ marginBottom:"14px" }} />
          <div style={{ display:"flex", justifyContent:"center", gap:"10px", flexWrap:"wrap" }}>
            {[p.mood, p.occasion].map(tag => (
              <span key={tag} style={{ fontSize:"9px", letterSpacing:"2px", color:"rgba(212,175,55,.6)", textTransform:"uppercase", fontFamily:"'Raleway',sans-serif", fontWeight:300, border:"1px solid rgba(212,175,55,.2)", padding:"3px 10px", borderRadius:"20px" }}>{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const pageWrap = { minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", padding:"60px 24px", gap:"40px", maxWidth:"1100px", margin:"0 auto" };
  const footer   = <p style={{ fontSize:"11px", color:"rgba(212,175,55,.25)", letterSpacing:"3px", fontFamily:"'Cinzel',serif" }}>PURELIXR · LUXURY FRAGRANCES</p>;

  // ════════════════════════════════════════
  //  PHASE: results
  // ════════════════════════════════════════
  if (phase === "results") return (
    <div className={animIn ? "page-animate" : "page-hidden"} style={{ ...pageWrap, justifyContent:"center" }}>
      <div style={{ textAlign:"center" }}>
        <p className="ornament">✦ &nbsp;&nbsp; ✦ &nbsp;&nbsp; ✦</p>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(13px,2vw,15px)", fontWeight:400, letterSpacing:"6px", textTransform:"uppercase", color:"rgba(212,175,55,.7)", marginTop:"12px", marginBottom:"8px" }}>Your Curated Selection</h2>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(36px,6vw,58px)", fontWeight:300, color:"#f5e6c8", lineHeight:1.15, letterSpacing:"2px" }}>
          Your Perfect <span className="gold-text" style={{ fontStyle:"italic" }}>Fragrances</span>
        </h1>
        <div className="divider-gold" style={{ marginTop:"16px", marginBottom:"12px" }} />
        <p style={{ fontFamily:"'Raleway',sans-serif", fontWeight:300, fontSize:"14px", color:"rgba(245,230,200,.5)" }}>Three scents that resonate with your essence.</p>
      </div>

      <PerfumeCards />

      <div style={{ border:"1px solid rgba(212,175,55,.35)", borderRadius:"12px", padding:"28px 36px", textAlign:"center", maxWidth:"540px", width:"100%", background:"rgba(212,175,55,.04)", backdropFilter:"blur(10px)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:"linear-gradient(90deg,transparent,#d4af37,transparent)" }} />
        <div style={{ fontSize:"32px", marginBottom:"10px" }}>🎁</div>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"24px", fontWeight:400, color:"#f5e6c8", marginBottom:"8px" }}>
          You could win a <span className="gold-text" style={{ fontStyle:"italic" }}>free sample</span>
        </h3>
        <p style={{ fontFamily:"'Raleway',sans-serif", fontWeight:300, fontSize:"13px", color:"rgba(245,230,200,.5)", lineHeight:1.8, marginBottom:"20px" }}>
          Every 20th quiz-taker wins a complimentary Purelixr sample.<br />Enter your details to find out if you're the lucky one.
        </p>
        <button className="btn-primary" onClick={() => setPhase("form")}>Check My Lucky Draw →</button>
      </div>

      <div style={{ display:"flex", gap:"16px", flexWrap:"wrap", justifyContent:"center" }}>
        <button className="btn-ghost" onClick={onRestart}>↺ Retake Quiz</button>
        <button className="btn-primary">Explore Collection</button>
      </div>
      {footer}
    </div>
  );

  // ════════════════════════════════════════
  //  PHASE: form
  // ════════════════════════════════════════
  if (phase === "form") return (
    <div className="page-animate" style={pageWrap}>
      <div style={{ textAlign:"center" }}>
        <p className="ornament">✦ &nbsp;&nbsp; ✦ &nbsp;&nbsp; ✦</p>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(13px,2vw,15px)", fontWeight:400, letterSpacing:"6px", textTransform:"uppercase", color:"rgba(212,175,55,.7)", marginTop:"12px" }}>Your Matches</h2>
      </div>

      <PerfumeCards compact />

      <div style={{ width:"100%", maxWidth:"600px", display:"flex", alignItems:"center", gap:"16px" }}>
        <div style={{ flex:1, height:"1px", background:"rgba(212,175,55,.15)" }} />
        <span style={{ color:"rgba(212,175,55,.5)", fontSize:"18px" }}>✦</span>
        <div style={{ flex:1, height:"1px", background:"rgba(212,175,55,.15)" }} />
      </div>

      <div style={{ width:"100%", maxWidth:"420px", border:"1px solid rgba(212,175,55,.3)", borderRadius:"16px", padding:"36px 32px", background:"rgba(212,175,55,.03)", backdropFilter:"blur(12px)", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:"linear-gradient(90deg,transparent,#d4af37,transparent)" }} />
        <div style={{ fontSize:"28px", marginBottom:"10px" }}>🎁</div>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"26px", fontWeight:400, color:"#f5e6c8", marginBottom:"6px" }}>Enter the Lucky Draw</h3>
        <p style={{ fontFamily:"'Raleway',sans-serif", fontWeight:300, fontSize:"13px", color:"rgba(245,230,200,.5)", lineHeight:1.8, marginBottom:"24px" }}>
          Every 20th participant wins a free sample.<br />Are you the one?
        </p>
        <div style={{ display:"flex", flexDirection:"column", gap:"12px", textAlign:"left" }}>
          <div>
            <label style={{ fontFamily:"'Cinzel',serif", fontSize:"9px", letterSpacing:"3px", textTransform:"uppercase", color:"rgba(212,175,55,.55)", display:"block", marginBottom:"8px" }}>Your Name</label>
            <input className="gold-input" type="text" placeholder="e.g. Sara Al-Rashid" value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key==="Enter" && handleSubmit()} />
          </div>
          <div>
            <label style={{ fontFamily:"'Cinzel',serif", fontSize:"9px", letterSpacing:"3px", textTransform:"uppercase", color:"rgba(212,175,55,.55)", display:"block", marginBottom:"8px" }}>Email Address</label>
            <input className="gold-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key==="Enter" && handleSubmit()} />
          </div>
        </div>
        {formError && <p style={{ color:"#e07070", fontSize:"12px", marginTop:"10px", fontFamily:"'Raleway',sans-serif" }}>{formError}</p>}
        <p style={{ fontSize:"10px", color:"rgba(212,175,55,.3)", marginTop:"14px", fontFamily:"'Raleway',sans-serif" }}>We'll only use your email to notify you if you win.</p>
        <button className="btn-primary" onClick={handleSubmit} disabled={submitting} style={{ marginTop:"24px", width:"100%" }}>Reveal My Result →</button>
        <button className="btn-ghost" onClick={() => setPhase("results")} style={{ marginTop:"12px", width:"100%", fontSize:"10px" }}>← Back to my fragrances</button>
      </div>
      {footer}
    </div>
  );

  // ════════════════════════════════════════
  //  PHASE: revealing
  // ════════════════════════════════════════
  if (phase === "revealing") return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ position:"relative", width:"100px", height:"100px", margin:"0 auto 36px" }}>
          <div style={{ position:"absolute", inset:0, borderRadius:"50%", border:"2px solid rgba(212,175,55,.15)" }} />
          <div style={{ position:"absolute", inset:0, borderRadius:"50%", border:"2px solid transparent", borderTopColor:"#d4af37", animation:"spinRing 1s linear infinite" }} />
          <div style={{ position:"absolute", inset:"14px", borderRadius:"50%", border:"1px solid rgba(212,175,55,.2)", borderBottomColor:"#b8860b", animation:"spinRing 1.5s linear infinite reverse" }} />
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px", color:"#d4af37" }}>✦</div>
        </div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"36px", fontWeight:300, color:"#f5e6c8", fontStyle:"italic", marginBottom:"12px" }}>Checking your luck…</h2>
        <p style={{ fontFamily:"'Raleway',sans-serif", fontWeight:300, fontSize:"14px", color:"rgba(245,230,200,.45)" }}>The universe is deciding your fate.</p>
        <div style={{ display:"flex", gap:"8px", justifyContent:"center", marginTop:"24px" }}>
          {[0,1,2].map(i => <div key={i} style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#d4af37", animation:"pulseGold 1.2s ease-in-out infinite", animationDelay:`${i*0.3}s` }} />)}
        </div>
      </div>
    </div>
  );

  // ════════════════════════════════════════
  //  PHASE: duplicate
  // ════════════════════════════════════════
  if (phase === "duplicate") return (
    <div className="page-animate" style={{ ...pageWrap, justifyContent:"center" }}>
      <div style={{ textAlign:"center", maxWidth:"480px" }}>
        <div style={{ fontSize:"42px", marginBottom:"12px" }}>🚫</div>
        <p className="ornament">✦ &nbsp; ✦ &nbsp; ✦</p>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"38px", fontWeight:300, color:"#f5e6c8", margin:"16px 0 8px" }}>Already Entered</h2>
        <div className="divider-gold" style={{ margin:"16px auto" }} />
        <p style={{ fontFamily:"'Raleway',sans-serif", fontWeight:300, fontSize:"14px", color:"rgba(245,230,200,.55)", lineHeight:1.9 }}>
          <strong style={{ color:"#d4af37" }}>{email}</strong> has already been entered into the lucky draw.<br /><br />
          Each person gets one entry only — good luck in the draw! 🌹
        </p>
        <div style={{ display:"flex", gap:"14px", justifyContent:"center", marginTop:"28px", flexWrap:"wrap" }}>
          <button className="btn-ghost" onClick={onRestart}>↺ Retake Quiz</button>
          <button className="btn-primary">Explore Collection</button>
        </div>
      </div>
      {footer}
    </div>
  );

  // ════════════════════════════════════════
  //  PHASE: winner
  // ════════════════════════════════════════
  if (phase === "winner") return (
    <div className="page-animate" style={{ ...pageWrap, justifyContent:"center" }}>
      <Confetti />
      <div style={{ textAlign:"center", maxWidth:"560px", position:"relative", zIndex:1 }}>
        <div style={{ fontSize:"64px", marginBottom:"8px", animation:"pulseGold 1.5s ease-in-out infinite" }}>🎁</div>
        <p className="ornament">✦ &nbsp; ✦ &nbsp; ✦</p>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(52px,10vw,80px)", fontWeight:300, lineHeight:1, margin:"16px 0 8px", animation:"winnersGlow 2s ease-in-out infinite" }}>
          <span className="gold-text">You Won!</span>
        </h1>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"24px", fontWeight:300, color:"#f5e6c8", marginBottom:"8px" }}>
          Congratulations, <span style={{ color:"#d4af37" }}>{winnerName}</span>
        </h2>
        <div className="divider-gold" style={{ margin:"20px auto" }} />
        <p style={{ fontFamily:"'Raleway',sans-serif", fontWeight:300, fontSize:"14px", color:"rgba(245,230,200,.55)", lineHeight:1.9 }}>
          You are our lucky winner! A complimentary sample of{" "}
          <strong style={{ color:"#d4af37" }}>{results[0]?.name}</strong> will be sent to{" "}
          <strong style={{ color:"#d4af37" }}>{email}</strong>.<br /><br />
          Our team will reach out within 2–3 business days. 🌹
        </p>
        <div style={{ margin:"28px auto 0", border:"1px solid rgba(212,175,55,.4)", borderRadius:"12px", padding:"20px 24px", background:"rgba(212,175,55,.06)", maxWidth:"240px" }}>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:"9px", letterSpacing:"4px", color:"rgba(212,175,55,.6)", marginBottom:"6px" }}>YOUR FREE SAMPLE</p>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"26px", color:"#d4af37", letterSpacing:"3px" }}>{results[0]?.name}</h3>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:"9px", letterSpacing:"3px", color:"rgba(212,175,55,.45)", textTransform:"uppercase", marginTop:"4px" }}>{results[0]?.scentFamily}</p>
        </div>
      </div>
      <div style={{ display:"flex", gap:"14px", flexWrap:"wrap", justifyContent:"center", position:"relative", zIndex:1 }}>
        <button className="btn-ghost" onClick={onRestart}>↺ Take Quiz Again</button>
        <button className="btn-primary">Explore Collection</button>
      </div>
      {footer}
    </div>
  );

  // ════════════════════════════════════════
  //  PHASE: thankyou
  // ════════════════════════════════════════
  return (
    <div className="page-animate" style={pageWrap}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:"42px", marginBottom:"8px" }}>🌸</div>
        <p className="ornament">✦ &nbsp; ✦ &nbsp; ✦</p>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(36px,6vw,54px)", fontWeight:300, color:"#f5e6c8", margin:"14px 0 8px" }}>
          Thank You, <span className="gold-text" style={{ fontStyle:"italic" }}>{winnerName}!</span>
        </h1>
        <div className="divider-gold" style={{ margin:"16px auto" }} />
        <p style={{ fontFamily:"'Raleway',sans-serif", fontWeight:300, fontSize:"14px", color:"rgba(245,230,200,.5)", lineHeight:1.8, maxWidth:"400px", margin:"0 auto" }}>
          Not a winner this time — but your scent profile is saved.<br />Our next lucky draw is just around the corner.
        </p>
      </div>
      <div style={{ textAlign:"center" }}>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(13px,2vw,15px)", fontWeight:400, letterSpacing:"6px", textTransform:"uppercase", color:"rgba(212,175,55,.7)" }}>Your Curated Fragrances</h2>
      </div>
      <PerfumeCards />
      <div style={{ display:"flex", gap:"14px", flexWrap:"wrap", justifyContent:"center" }}>
        <button className="btn-ghost" onClick={onRestart}>↺ Retake Quiz</button>
        <button className="btn-primary">Explore Collection</button>
      </div>
      {footer}
    </div>
  );
}
