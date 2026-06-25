import { useState } from "react";
import logoTargett from "../assets/logoTargett.jpg";
import livreur from "../assets/livreur.jpg";

const POWER_AUTOMATE_URL =
  "https://2706d808a2e7e3a09e23d3af397c8a.17.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/8bf6bd2958524142b6a61dfd80e6cb2f/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=rgRw1_DE6tKKngC55VCmYpcuI2W_3rV7hSqj-sXkpXc";

const TYPE_OPTIONS = [
  { label: "Palette", value: 751130000 },
  { label: "Colis",   value: 751130001 },
  { label: "Vrac",    value: 751130002 },
];

const QUANTITY_OPTIONS = [
  { label: "1", value: 751130000 },
  { label: "2", value: 751130001 },
  { label: "3", value: 751130002 },
  { label: "4", value: 751130003 },
  { label: "5", value: 751130004 },
];

const INITIAL_FORM = {
  clientName: "", email: "", deliveryAddress: "", deliveryDate: "",
  merchandise: "", quantity: "", type: "", amount: "", notes: "",
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Barlow+Condensed:wght@600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0d1f3c;
    --navy-light: #1a3560;
    --orange: #e85d00;
    --orange-light: #ff7a1a;
    --orange-pale: #fff3eb;
    --white: #ffffff;
    --gray-50: #f8f9fc;
    --gray-100: #f0f2f7;
    --gray-200: #e2e6f0;
    --gray-400: #9aa3b8;
    --gray-600: #4a5568;
    --gray-800: #1e2a3a;
    --font: 'Barlow', sans-serif;
    --font-display: 'Barlow Condensed', sans-serif;
    scroll-behavior: smooth;
  }

  body { font-family: var(--font); color: var(--gray-800); background: var(--white); }

  /* ── NAV ── */
  .t-nav {
    position: sticky; top: 0; z-index: 200;
    background: var(--navy);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 60px; height: 70px;
    box-shadow: 0 2px 20px rgba(13,31,60,0.25);
  }

  .t-nav-logo { display: flex; align-items: center; }
  .t-nav-logo img { height: 44px; object-fit: contain; }

  .t-nav-links { display: flex; align-items: center; gap: 6px; list-style: none; }

  .t-nav-links a {
    font-size: 13px; font-weight: 600;
    color: rgba(255,255,255,0.65);
    text-decoration: none;
    padding: 8px 16px; border-radius: 4px;
    letter-spacing: 0.04em;
    transition: color 0.15s, background 0.15s;
  }

  .t-nav-links a:hover { color: #fff; background: rgba(255,255,255,0.08); }

  .t-nav-cta {
    background: var(--orange) !important;
    color: #fff !important;
    border-radius: 4px !important;
    font-weight: 700 !important;
    letter-spacing: 0.06em;
  }
  .t-nav-cta:hover { background: var(--orange-light) !important; }

  /* ── HERO ── */
  .t-hero {
    background: linear-gradient(135deg, var(--navy) 0%, #162d54 60%, #1a3560 100%);
    padding: 90px 60px 80px;
    position: relative; overflow: hidden;
  }

  .t-hero::before {
    content: '';
    position: absolute; right: 0; top: 0; bottom: 0; width: 45%;
    background: linear-gradient(135deg, transparent 30%, rgba(232,93,0,0.08) 100%);
    clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%);
  }

  .t-hero-inner {
    max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
    position: relative; z-index: 1;
  }

  .t-hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(232,93,0,0.15);
    border: 1px solid rgba(232,93,0,0.35);
    color: #ffb380; font-size: 11px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 20px; margin-bottom: 22px;
  }

  .t-hero-badge::before {
    content: ''; width: 6px; height: 6px;
    background: var(--orange-light); border-radius: 50%;
    animation: blink 2s ease-in-out infinite;
  }

  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

  .t-hero h1 {
    font-family: var(--font-display);
    font-size: 52px; font-weight: 800;
    color: #fff; line-height: 1.05;
    letter-spacing: -0.01em; margin-bottom: 18px;
  }

  .t-hero h1 em { font-style: normal; color: var(--orange-light); }

  .t-hero-desc {
    font-size: 16px; color: rgba(255,255,255,0.55);
    line-height: 1.7; max-width: 440px; margin-bottom: 32px;
  }

  .t-hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }

  .t-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--orange); color: #fff;
    font-family: var(--font-display); font-size: 15px; font-weight: 700;
    letter-spacing: 0.06em; text-transform: uppercase;
    padding: 14px 28px; border-radius: 4px; border: none;
    cursor: pointer; text-decoration: none;
    transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
    box-shadow: 0 4px 16px rgba(232,93,0,0.35);
  }
  .t-btn-primary:hover { background: var(--orange-light); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(232,93,0,0.4); }

  .t-btn-outline {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: #fff;
    font-family: var(--font-display); font-size: 15px; font-weight: 700;
    letter-spacing: 0.06em; text-transform: uppercase;
    padding: 13px 28px; border-radius: 4px;
    border: 2px solid rgba(255,255,255,0.3);
    cursor: pointer; text-decoration: none;
    transition: border-color 0.15s, background 0.15s;
  }
  .t-btn-outline:hover { border-color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.07); }

  /* Hero right: stats card */
  .t-hero-card {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 12px; padding: 32px;
    backdrop-filter: blur(8px);
  }

  .t-hero-card-title {
    font-size: 11px; font-weight: 700;
    color: var(--orange-light); letter-spacing: 0.12em;
    text-transform: uppercase; margin-bottom: 20px;
    display: flex; align-items: center; gap: 8px;
  }

  .t-hero-card-title::before {
    content: ''; width: 20px; height: 2px; background: var(--orange);
  }

  .t-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

  .t-stat {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px; padding: 18px 16px;
  }

  .t-stat-value {
    font-family: var(--font-display);
    font-size: 32px; font-weight: 800; color: #fff;
    line-height: 1; margin-bottom: 4px;
  }
  .t-stat-value span { color: var(--orange-light); }
  .t-stat-label { font-size: 11px; color: rgba(255,255,255,0.4); font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; }

  /* ── SERVICES SECTION ── */
  .t-section { padding: 80px 60px; }
  .t-section-white { background: var(--white); }
  .t-section-gray  { background: var(--gray-50); }

  .t-section-inner { max-width: 1100px; margin: 0 auto; }

  .t-section-eyebrow {
    font-size: 11px; font-weight: 700; color: var(--orange);
    letter-spacing: 0.14em; text-transform: uppercase;
    display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
  }
  .t-section-eyebrow::before { content: ''; width: 24px; height: 2px; background: var(--orange); }

  .t-section-title {
    font-family: var(--font-display);
    font-size: 36px; font-weight: 800; color: var(--navy);
    letter-spacing: -0.01em; margin-bottom: 12px;
  }

  .t-section-sub { font-size: 15px; color: var(--gray-600); max-width: 500px; line-height: 1.7; margin-bottom: 48px; }

  .t-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

  .t-service-card {
    background: var(--white);
    border: 1px solid var(--gray-200);
    border-radius: 10px; padding: 28px 24px;
    transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
    cursor: default;
  }

  .t-service-card:hover {
    box-shadow: 0 8px 32px rgba(13,31,60,0.1);
    transform: translateY(-3px);
    border-color: var(--orange);
  }

  .t-service-icon {
    width: 48px; height: 48px;
    background: var(--orange-pale);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 16px;
  }

  .t-service-icon svg { width: 22px; height: 22px; color: var(--orange); }

  .t-service-card h3 { font-size: 16px; font-weight: 700; color: var(--navy); margin-bottom: 8px; }
  .t-service-card p  { font-size: 13px; color: var(--gray-600); line-height: 1.6; }

  /* ── SUIVI SECTION ── */
  .t-suivi-inner {
    display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: stretch;
    max-width: 1100px; margin: 0 auto;
  }

  .t-steps { display: flex; flex-direction: column; gap: 0; }

  .t-step {
    display: flex; gap: 20px; align-items: flex-start;
    padding: 20px 0; border-bottom: 1px solid var(--gray-100);
  }
  .t-step:last-child { border-bottom: none; }

  .t-step-num {
    width: 36px; height: 36px; flex-shrink: 0;
    background: var(--navy); color: #fff;
    font-family: var(--font-display); font-size: 15px; font-weight: 800;
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
  }

  .t-step.active .t-step-num { background: var(--orange); }

  .t-step-title { font-size: 14px; font-weight: 700; color: var(--navy); margin-bottom: 4px; }
  .t-step-desc  { font-size: 13px; color: var(--gray-600); line-height: 1.5; }

  .t-suivi-visual {
    border-radius: 12px; position: relative; overflow: hidden; padding: 0;
  }

  .t-suivi-visual::before {
    content: '';
    position: absolute; bottom: -30px; right: -30px;
    width: 180px; height: 180px;
    background: radial-gradient(circle, rgba(232,93,0,0.18) 0%, transparent 70%);
    pointer-events: none;
  }

  .t-suivi-visual img { width: 100%; height: 100%; object-fit: cover; display: block; }

  .t-track-label {
    font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.4);
    text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px;
  }

  .t-track-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .t-track-item:last-child { border-bottom: none; }

  .t-track-dot {
    width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0;
  }
  .t-track-dot.done    { background: #34d399; }
  .t-track-dot.current { background: var(--orange); animation: blink 1.5s infinite; }
  .t-track-dot.pending { background: rgba(255,255,255,0.15); }

  .t-track-text { font-size: 13px; color: rgba(255,255,255,0.75); font-weight: 500; }
  .t-track-time { margin-left: auto; font-size: 11px; color: rgba(255,255,255,0.3); }

  /* ── FORM SECTION ── */
  .t-form-section {
    background: var(--gray-50);
    padding: 80px 60px;
  }

  .t-form-inner { max-width: 1100px; margin: 0 auto; }

  .t-form-layout {
    display: grid; grid-template-columns: 1fr 360px; gap: 32px; align-items: start;
  }

  .t-form-card {
    background: var(--white);
    border: 1px solid var(--gray-200);
    border-radius: 10px; overflow: hidden;
    box-shadow: 0 4px 24px rgba(13,31,60,0.08);
  }

  .t-form-card-header {
    background: var(--navy);
    padding: 24px 28px;
    display: flex; align-items: center; gap: 14px;
  }

  .t-form-card-header-icon {
    width: 40px; height: 40px;
    background: rgba(232,93,0,0.2);
    border: 1px solid rgba(232,93,0,0.4);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .t-form-card-header-icon svg { width: 18px; height: 18px; color: var(--orange-light); }

  .t-form-card-header h2 { font-size: 17px; font-weight: 700; color: #fff; }
  .t-form-card-header p  { font-size: 12px; color: rgba(255,255,255,0.45); margin-top: 2px; }

  .t-form-body { padding: 28px; display: flex; flex-direction: column; gap: 22px; }

  .t-fieldset-label {
    font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--orange);
    padding-bottom: 10px;
    border-bottom: 2px solid var(--orange-pale);
    display: flex; align-items: center; gap: 8px; margin-bottom: 12px;
  }

  .t-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

  .t-field { display: flex; flex-direction: column; gap: 6px; }

  .t-label {
    font-size: 11px; font-weight: 700;
    color: var(--gray-600); text-transform: uppercase; letter-spacing: 0.07em;
  }
  .t-label-req { color: var(--orange); margin-left: 2px; }

  .t-input {
    width: 100%;
    border: 1.5px solid var(--gray-200);
    border-radius: 6px;
    padding: 10px 14px;
    font-size: 14px; font-family: var(--font); font-weight: 500;
    color: var(--gray-800); background: var(--white); outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .t-input:focus {
    border-color: var(--orange);
    box-shadow: 0 0 0 3px rgba(232,93,0,0.1);
  }
  .t-input::placeholder { color: var(--gray-400); }

  .t-feedback-ok {
    display: flex; align-items: center; gap: 10px;
    background: #f0fdf4; border: 1px solid #86efac;
    border-radius: 6px; padding: 14px 16px;
    color: #166534; font-size: 13px; font-weight: 600;
  }

  .t-feedback-err {
    background: #fef2f2; border: 1px solid #fca5a5;
    border-radius: 6px; padding: 14px 16px;
    color: #991b1b; font-size: 13px; font-weight: 600;
  }

  .t-err-pre {
    margin-top: 8px; font-size: 11px; font-family: monospace;
    background: #fee2e2; border-radius: 4px; padding: 8px;
    white-space: pre-wrap; word-break: break-all; color: #7f1d1d;
  }

  .t-submit {
    width: 100%;
    background: var(--orange); color: #fff; border: none;
    padding: 15px 24px; border-radius: 6px;
    font-family: var(--font-display); font-size: 16px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;
    transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
    box-shadow: 0 4px 14px rgba(232,93,0,0.3);
  }
  .t-submit:hover:not(:disabled) { background: var(--orange-light); transform: translateY(-1px); box-shadow: 0 6px 18px rgba(232,93,0,0.35); }
  .t-submit:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

  .t-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: #fff; border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── SIDEBAR CARDS ── */
  .t-sidebar { display: flex; flex-direction: column; gap: 18px; position: sticky; top: 86px; }

  .t-scard {
    background: var(--white);
    border: 1px solid var(--gray-200);
    border-radius: 10px; overflow: hidden;
    box-shadow: 0 2px 12px rgba(13,31,60,0.06);
  }

  .t-scard-header {
    background: var(--navy); padding: 13px 18px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: rgba(255,255,255,0.8);
    display: flex; align-items: center; gap: 8px;
  }
  .t-scard-header svg { width: 14px; height: 14px; color: var(--orange-light); }

  .t-scard-body { padding: 18px; }

  .t-scard-row {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 11px 0; border-bottom: 1px solid var(--gray-100);
  }
  .t-scard-row:last-child { border-bottom: none; padding-bottom: 0; }

  .t-scard-dot {
    width: 7px; height: 7px; background: var(--orange);
    border-radius: 50%; margin-top: 5px; flex-shrink: 0;
  }

  .t-scard-row-title { font-size: 13px; font-weight: 700; color: var(--navy); }
  .t-scard-row-desc  { font-size: 12px; color: var(--gray-600); line-height: 1.5; margin-top: 2px; }

  .t-contact-row {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 0; border-bottom: 1px solid var(--gray-100);
    font-size: 13px; color: var(--gray-600);
  }
  .t-contact-row:last-child { border-bottom: none; }
  .t-contact-row svg { width: 14px; height: 14px; color: var(--orange); flex-shrink: 0; }

  .t-online-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: #f0fdf4; border: 1px solid #86efac;
    color: #166534; font-size: 11px; font-weight: 700;
    letter-spacing: 0.07em; text-transform: uppercase;
    padding: 5px 12px; border-radius: 20px; margin-top: 12px;
  }
  .t-online-dot { width: 6px; height: 6px; background: #22c55e; border-radius: 50%; animation: blink 1.8s infinite; }

  /* ── FOOTER ── */
  .t-footer {
    background: var(--navy);
    padding: 28px 60px;
    display: flex; align-items: center; justify-content: space-between;
  }

  .t-footer-logo img { height: 36px; object-fit: contain; opacity: 0.85; }

  .t-footer-text { font-size: 12px; color: rgba(255,255,255,0.3); }
  .t-footer-text strong { color: rgba(255,255,255,0.6); }

  /* ── RESPONSIVE ── */
  @media (max-width: 960px) {
    .t-nav { padding: 0 20px; }
    .t-hero { padding: 50px 20px 44px; }
    .t-hero-inner { grid-template-columns: 1fr; gap: 40px; }
    .t-section { padding: 52px 20px; }
    .t-services-grid { grid-template-columns: 1fr; }
    .t-suivi-inner { grid-template-columns: 1fr; gap: 32px; }
    .t-form-section { padding: 52px 20px; }
    .t-form-layout { grid-template-columns: 1fr; }
    .t-sidebar { position: static; }
    .t-grid-2 { grid-template-columns: 1fr; }
    .t-footer { padding: 20px; flex-direction: column; gap: 12px; text-align: center; }
    .t-nav-links { display: none; }
  }
`;

export default function CourseForm() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [errorDetail, setErrorDetail] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["quantity", "amount", "type"];
    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setErrorDetail("");

    const payload = {
      clientName:      formData.clientName.trim(),
      email:           formData.email.trim(),
      deliveryAddress: formData.deliveryAddress.trim(),
      deliveryDate:    formData.deliveryDate,
      merchandise:     formData.merchandise.trim(),
      quantity:        Number(formData.quantity),
      type:            Number(formData.type),
      amount:          Number(formData.amount),
      notes:           formData.notes.trim(),
    };

    try {
      const response = await fetch(POWER_AUTOMATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errBody = "(aucun détail)";
        try { errBody = await response.text(); } catch (_) {}
        setErrorDetail(errBody);
        throw new Error(`HTTP ${response.status}`);
      }

      setStatus({ type: "success" });
      setFormData(INITIAL_FORM);
    } catch (error) {
      if (error instanceof TypeError) {
        try {
          await fetch(POWER_AUTOMATE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            mode: "no-cors",
          });
          setStatus({ type: "success" });
          setFormData(INITIAL_FORM);
        } catch {
          setStatus({ type: "error", message: "Erreur réseau. Vérifiez votre connexion." });
        }
      } else {
        setStatus({ type: "error", message: `Erreur ${error.message}` });
      }
    } finally {
      setLoading(false);
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="t-nav">
        <div className="t-nav-logo">
          <img src={logoTargett} alt="Targett Transport & Logistique" />
        </div>
        <ul className="t-nav-links">
          <li><a href="#accueil" onClick={e => { e.preventDefault(); scrollTo("accueil"); }}>Accueil</a></li>
          <li><a href="#services" onClick={e => { e.preventDefault(); scrollTo("services"); }}>Services</a></li>
          <li><a href="#suivi" onClick={e => { e.preventDefault(); scrollTo("suivi"); }}>Suivi</a></li>
          <li><a href="#commande" onClick={e => { e.preventDefault(); scrollTo("commande"); }} className="t-nav-cta">Nouvelle course</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="accueil" className="t-hero">
        <div className="t-hero-inner">
          <div>
            <div className="t-hero-badge">Transport express & logistique</div>
            <h1>Livraison <em>rapide</em><br />partout en France</h1>
            <p className="t-hero-desc">
              Targett Transport vous offre un service de livraison express fiable,
              traçable et disponible 24h/7j. Créez votre demande en ligne en quelques secondes.
            </p>
            <div className="t-hero-actions">
              <button className="t-btn-primary" onClick={() => scrollTo("commande")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                Commander maintenant
              </button>
              <button className="t-btn-outline" onClick={() => scrollTo("services")}>
                Nos services
              </button>
            </div>
          </div>

          <div className="t-hero-card">
            <div className="t-hero-card-title">Nos chiffres clés</div>
            <div className="t-stats-grid">
              {[
                { val: "48", unit: "h", label: "Délai express" },
                { val: "100", unit: "%", label: "Traçabilité" },
                { val: "+500", unit: "", label: "Clients actifs" },
                { val: "24/7", unit: "", label: "Disponibilité" },
              ].map(s => (
                <div className="t-stat" key={s.label}>
                  <div className="t-stat-value">{s.val}<span>{s.unit}</span></div>
                  <div className="t-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="t-section t-section-white">
        <div className="t-section-inner">
          <div className="t-section-eyebrow">Ce que nous faisons</div>
          <h2 className="t-section-title">Nos services de transport</h2>
          <p className="t-section-sub">Des solutions adaptées à chaque besoin, de la livraison de colis à la gestion de palettes en vrac.</p>
          <div className="t-services-grid">
            {[
              {
                title: "Livraison Express J+1",
                desc: "Enlèvement et livraison le lendemain avant 12h pour toute demande passée avant 18h.",
                icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
              },
              {
                title: "Transport de Palettes",
                desc: "Enlèvement sur site, transport sécurisé, dépôt confirmé avec photo de livraison.",
                icon: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
              },
              {
                title: "Livraison de Colis",
                desc: "Traitement rapide des envois de colis, avec confirmation de réception en temps réel.",
                icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
              },
            ].map(s => (
              <div className="t-service-card" key={s.title}>
                <div className="t-service-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {s.icon}
                  </svg>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUIVI */}
      <section id="suivi" className="t-section t-section-gray">
        <div className="t-suivi-inner">
          <div>
            <div className="t-section-eyebrow">Comment ça marche</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h2 className="t-section-title">Suivi de votre course</h2>
              
            </div>
            <p className="t-section-sub">De la demande à la livraison, suivez chaque étape en temps réel.</p>
            <div className="t-steps">
              {[
                { n: "01", title: "Demande en ligne", desc: "Remplissez le formulaire — votre course est créée instantanément dans notre système.", active: true },
                { n: "02", title: "Assignation chauffeur", desc: "Un chauffeur disponible est assigné automatiquement à votre course.", active: false },
                { n: "03", title: "Enlèvement", desc: "Le chauffeur se présente à l'adresse d'enlèvement à l'heure convenue.", active: false },
                { n: "04", title: "Livraison confirmée", desc: "Confirmation de livraison avec photo et signature électronique.", active: false },
              ].map(s => (
                <div className={`t-step${s.active ? " active" : ""}`} key={s.n}>
                  <div className="t-step-num">{s.n}</div>
                  <div>
                    <div className="t-step-title">{s.title}</div>
                    <div className="t-step-desc">{s.desc}</div>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
          
          <div className="t-suivi-visual">
            <img src={livreur} alt="Livreur" />
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="commande" className="t-form-section">
        <div className="t-form-inner">
          <div className="t-section-eyebrow" style={{ marginBottom: 10 }}>Formulaire de demande</div>
          <h2 className="t-section-title">Nouvelle demande de course</h2>
          <p className="t-section-sub">Remplissez le formulaire ci-dessous.</p>

          <div className="t-form-layout">
            {/* Form card */}
            <div className="t-form-card">
              <div className="t-form-card-header">
                <div className="t-form-card-header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </div>
                <div>
                  <h2>Détails de la course</h2>
                  <p>Tous les champs * sont obligatoires</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="t-form-body">
                {/* Client */}
                <div>
                  <div className="t-fieldset-label">Informations client</div>
                  <div className="t-grid-2">
                    <F label="Nom du client" req><input className="t-input" type="text" name="clientName" value={formData.clientName} onChange={handleChange} required placeholder="Entreprise ou contact" /></F>
                    <F label="Adresse e-mail" req><input className="t-input" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="contact@entreprise.fr" /></F>
                  </div>
                </div>

                {/* Livraison */}
                <div>
                  <div className="t-fieldset-label">Détails de livraison</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <F label="Adresse de livraison" req><input className="t-input" type="text" name="deliveryAddress" value={formData.deliveryAddress} onChange={handleChange} required placeholder="Rue, code postal, ville" /></F>
                    <div className="t-grid-2">
                      <F label="Date souhaitée" req><input className="t-input" type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} required /></F>
                      <F label="Quantité" req>
                        <select className="t-input" name="quantity" value={formData.quantity} onChange={handleChange} required>
                          <option value="">Sélectionner…</option>
                          {QUANTITY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                      </F>
                    </div>
                  </div>
                </div>

                {/* Marchandise */}
                <div>
                  <div className="t-fieldset-label">Marchandise</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div className="t-grid-2">
                      <F label="Nature des produits" req><input className="t-input" type="text" name="merchandise" value={formData.merchandise} onChange={handleChange} required placeholder="Électronique, textile…" /></F>
                      <F label="Conditionnement" req>
                        <select className="t-input" name="type" value={formData.type} onChange={handleChange} required>
                          <option value="">Sélectionner…</option>
                          {TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                      </F>
                    </div>
                    <F label="Montant déclaré (€)" req><input className="t-input" type="number" name="amount" value={formData.amount} onChange={handleChange} required min="0" placeholder="Ex : 1 500" /></F>
                  </div>
                </div>

                {/* Notes */}
                <F label="Instructions spéciales"><textarea className="t-input" name="notes" value={formData.notes} onChange={handleChange} rows={3} placeholder="Accès, horaires, fragile, température…" style={{ resize: "none" }} /></F>

                {/* Feedback */}
                {status?.type === "success" && (
                  <div className="t-feedback-ok">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Votre demande a été envoyée avec succès
                  </div>
                )}
                {status?.type === "error" && (
                  <div className="t-feedback-err">
                    ✗ {status.message}
                    {errorDetail && <pre className="t-err-pre">{errorDetail}</pre>}
                  </div>
                )}

                <button type="submit" disabled={loading} className="t-submit">
                  {loading
                    ? <><div className="t-spinner" /> Envoi en cours…</>
                    : <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>Envoyer la demande</>
                  }
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <aside className="t-sidebar">
              <div className="t-scard">
                <div className="t-scard-header">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Délais de livraison
                </div>
                <div className="t-scard-body">
                  {[
                    { title: "Express J+1", desc: "Livraison le lendemain avant 12h pour toute commande avant 18h." },
                    { title: "Standard J+2/J+3", desc: "Livraison sous 48–72h ouvrées partout en France." },
                    { title: "Vrac & Palette", desc: "Enlèvement sur site, transport sécurisé, dépôt confirmé." },
                  ].map(s => (
                    <div className="t-scard-row" key={s.title}>
                      <div className="t-scard-dot" />
                      <div>
                        <div className="t-scard-row-title">{s.title}</div>
                        <div className="t-scard-row-desc">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="t-scard">
                <div className="t-scard-header">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>
                  Contact & Support
                </div>
                <div className="t-scard-body">
                  {[
                    { icon: "mail",    text: "targett.transport@gmail.com" },
                    { icon: "map-pin", text: "Paris, France" },
                  ].map(c => (
                    <div className="t-contact-row" key={c.text}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {c.icon === "mail"    && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>}
                        {c.icon === "map-pin" && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>}
                      </svg>
                      {c.text}
                    </div>
                  ))}
                  <div className="t-online-badge">
                    <span className="t-online-dot" />
                    Dispatch 24h / 7j
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="t-footer">
        <div className="t-footer-logo">
          <img src={logoTargett} alt="Targett Transport" />
        </div>
        <div className="t-footer-text">
          © 2026 <strong>Targett Transport & Logistique</strong> · Paris, France · Powered by Askware-Tunisia
        </div>
      </footer>
    </>
  );
}

function F({ label, req, children }) {
  return (
    <div className="t-field">
      <label className="t-label">{label}{req && <span className="t-label-req">*</span>}</label>
      {children}
    </div>
  );
}