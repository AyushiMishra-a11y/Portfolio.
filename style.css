:root {
  --bg: #f8f9fa;
  --bg-2: #ffffff;
  --card: #f1f3f6;
  --text: #1a202c;
  --muted: #4a5568;
  --accent: #3182ce;
}

/* General Styles */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  scroll-behavior: smooth;
}

/* Header */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: var(--bg-2);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

nav ul { display: flex; gap: 1.5rem; list-style: none; margin: 0; padding: 0; }
nav a { text-decoration: none; color: var(--text); font-weight: bold; }
nav a:hover { color: var(--accent); }
button#theme-toggle { padding:0.5rem 1rem; border:none; border-radius:5px; cursor:pointer; background: var(--accent); color:#fff; }

/* Sections */
.section { padding:4rem 2rem; text-align:center; }
.section-title { font-size:2rem; margin-bottom:2rem; }

/* Hero */
.hero { background: var(--accent); color: #fff; padding:6rem 2rem; }
.hero .resume-btn { display:inline-block; padding:0.75rem 1.5rem; background:#fff; color:var(--accent); border-radius:5px; text-decoration:none; margin-top:1rem; }

/* Skills */
.skills-container { max-width:600px; margin:auto; text-align:left; }
.skill { margin-bottom:1rem; }
.skill p { margin:0 0.5rem 0.3rem 0; }
.skill-bar { background:#ddd; height:20px; border-radius:10px; overflow:hidden; }
.skill-bar span { display:block; height:100%; background:var(--accent); width:0; animation: fillSkill 1s forwards; }
@keyframes fillSkill { to { width: var(--fill); } }

/* About */
.about-container { display:flex; flex-wrap:wrap; gap:2rem; align-items:center; justify-content:center; text-align:left; max-width:900px; margin:auto; }
.profile-img { width:200px; border-radius:50%; }
.about-text ul { list-style:none; padding:0; }

/* Resume */
.resume-container { max-width:800px; margin:auto; text-align:left; }

/* Projects */
.controls { display:flex; justify-content:center; gap:1rem; flex-wrap:wrap; margin-bottom:2rem; }
.controls input, .controls select { padding:0.5rem 1rem; border-radius:5px; border:1px solid #ccc; font-size:1rem; }
.cards { display:flex; flex-wrap:wrap; justify-content:center; gap:2rem; }
.card { background:var(--card); padding:2rem; border-radius:12px; min-width:250px; max-width:300px; box-shadow:0 4px 8px rgba(0,0,0,0.1); transition:0.3s; }
.card:hover { transform:translateY(-5px); box-shadow:0 10px 20px rgba(0,0,0,0.2); }

/* Contact */
.contact-container { max-width:600px; margin:auto; }

/* Footer */
footer { text-align:center; padding:2rem; background:var(--bg-2); color:var(--muted); }

/* Responsive */
@media(max-width:768px) { .about-container { flex-direction:column; text-align:center; } .cards { flex-direction:column; } nav ul { flex-direction:column; gap:1rem; } }
