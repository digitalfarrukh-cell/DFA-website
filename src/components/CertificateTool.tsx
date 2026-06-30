"use client";

import { useState } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Montserrat:wght@400;600;700&display=swap');

.certpage { min-height:100%; background:#e9e9ef; padding:24px; display:flex; flex-direction:column; align-items:center; font-family:'Montserrat',Arial,sans-serif; color:#1e1b2e; }
.certpage * { box-sizing:border-box; }

.controls { width:100%; max-width:1123px; background:#fff; border:1px solid #d8d8e0; border-radius:14px; padding:18px 20px; margin-bottom:22px; display:grid; grid-template-columns:1fr 1fr 1fr 1fr auto; gap:14px; align-items:end; }
.controls h1 { grid-column:1 / -1; margin:0 0 4px; font-size:17px; }
.controls label { display:block; font-size:11px; font-weight:600; color:#666; margin-bottom:5px; text-transform:uppercase; letter-spacing:.5px; }
.controls input { width:100%; padding:9px 11px; border:1px solid #ccc; border-radius:8px; font-family:inherit; font-size:14px; }
.controls button { padding:10px 20px; border:0; border-radius:999px; cursor:pointer; background:linear-gradient(90deg,#ff2d2d,#ff5e3a); color:#fff; font-weight:700; font-size:14px; white-space:nowrap; }
.hint { grid-column:1 / -1; font-size:12px; color:#888; margin:2px 0 0; }

.certwrap { overflow:auto; max-width:100%; }
.cert { width:1123px; height:794px; background:radial-gradient(120% 120% at 0% 0%, #fff5ec 0%, #fffdf7 55%); position:relative; box-shadow:0 18px 50px rgba(0,0,0,.18); font-family:'Cormorant Garamond',Georgia,serif; overflow:hidden; }
.border-outer { position:absolute; inset:28px; border:3px solid #0f1e3d; }
.border-inner { position:absolute; inset:40px; border:1.5px solid #d4af37; }
.corner { position:absolute; width:40px; height:40px; border:2px solid #d4af37; }
.c-tl { top:40px; left:40px; border-right:0; border-bottom:0; border-radius:12px 0 0 0; }
.c-tr { top:40px; right:40px; border-left:0; border-bottom:0; border-radius:0 12px 0 0; }
.c-bl { bottom:40px; left:40px; border-right:0; border-top:0; border-radius:0 0 0 12px; }
.c-br { bottom:40px; right:40px; border-left:0; border-top:0; border-radius:0 0 12px 0; }

.inner { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; text-align:center; padding-top:60px; }
.brand { font-family:'Montserrat',sans-serif; font-weight:700; font-size:40px; letter-spacing:6px; color:#0f1e3d; }
.brand-sub { font-family:'Montserrat',sans-serif; font-size:13px; letter-spacing:7px; color:#ff5e3a; margin-top:4px; }
.rule { width:180px; height:1.5px; background:#d4af37; margin:14px 0 0; }
.title { font-family:'Montserrat',sans-serif; font-weight:700; font-size:42px; letter-spacing:10px; color:#0f1e3d; margin-top:34px; }
.title-sub { font-family:'Montserrat',sans-serif; font-size:16px; letter-spacing:12px; color:#8a6d18; margin-top:8px; }
.accent { width:110px; height:4px; border-radius:2px; background:linear-gradient(90deg,#ff2d2d,#ff5e3a); margin-top:14px; }
.presented { font-style:italic; font-size:21px; color:#555; margin-top:34px; }
.cname { font-size:62px; font-style:italic; color:#0f1e3d; line-height:1.1; margin-top:6px; min-width:400px; }
.name-rule { width:420px; height:1.5px; background:#d4af37; margin-top:6px; }
.body1 { font-size:20px; color:#444; margin-top:26px; }
.body2 { font-family:'Montserrat',sans-serif; font-weight:700; font-size:22px; color:#ff2d2d; margin-top:8px; }
.body3 { font-size:17px; color:#666; margin-top:10px; }

.seal { position:absolute; left:50%; transform:translateX(-50%); bottom:96px; width:92px; height:92px; }
.seal .disc { position:absolute; inset:0; border-radius:50%; background:linear-gradient(135deg,#f3d27a,#d4af37 50%,#b8860b); border:1.5px solid #8a6d18; display:flex; align-items:center; justify-content:center; flex-direction:column; }
.seal .ring { position:absolute; inset:8px; border:1.5px solid rgba(255,253,247,.85); border-radius:50%; }
.seal .star { color:#fffdf7; font-size:30px; line-height:1; margin-top:6px; }
.seal .ctxt { font-family:'Montserrat',sans-serif; font-weight:700; font-size:8px; letter-spacing:2px; color:#5a4708; margin-top:2px; }

.sigrow { position:absolute; bottom:80px; width:100%; display:flex; justify-content:space-between; padding:0 130px; }
.block { width:200px; text-align:center; }
.sigline { border-top:1.2px solid #0f1e3d; padding-top:6px; }
.signame { font-size:24px; font-style:italic; color:#0f1e3d; margin-bottom:4px; }
.datename { font-size:20px; color:#0f1e3d; margin-bottom:4px; font-family:'Montserrat',sans-serif; }
.blabel { font-family:'Montserrat',sans-serif; font-size:12px; color:#555; }
.footer { position:absolute; bottom:42px; width:100%; text-align:center; font-family:'Montserrat',sans-serif; font-size:11px; letter-spacing:2px; color:#999; }

@media print {
  @page { size: A4 landscape; margin: 0; }
  .certpage { background:#fff; padding:0; }
  .controls { display:none !important; }
  .certwrap { overflow:visible; }
  .cert { box-shadow:none; }
}
`;

export default function CertificateTool() {
  const [name, setName] = useState("Ali Raza");
  const [prog, setProg] = useState("Foundation — Digital Marketing Program");
  const [date, setDate] = useState("01 July 2026");
  const [id, setId] = useState("DFA-2026-0001");

  return (
    <div className="certpage">
      <style>{CSS}</style>

      <div className="controls">
        <h1>🎓 DFA Certificate Generator</h1>
        <div>
          <label>Student Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Program</label>
          <input value={prog} onChange={(e) => setProg(e.target.value)} />
        </div>
        <div>
          <label>Date of Completion</label>
          <input value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label>Certificate ID</label>
          <input value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <button onClick={() => window.print()}>Print / Save as PDF</button>
        <p className="hint">
          Fields bharo, phir &quot;Print / Save as PDF&quot; dabao → printer dialog mein &quot;Save
          as PDF&quot; choose karo (A4 landscape).
        </p>
      </div>

      <div className="certwrap">
        <div className="cert">
          <div className="border-outer" />
          <div className="border-inner" />
          <div className="corner c-tl" />
          <div className="corner c-tr" />
          <div className="corner c-bl" />
          <div className="corner c-br" />

          <div className="inner">
            <div className="brand">DFA</div>
            <div className="brand-sub">DIGITAL FLUXX ACADEMICS</div>
            <div className="rule" />
            <div className="title">CERTIFICATE</div>
            <div className="title-sub">OF COMPLETION</div>
            <div className="accent" />
            <div className="presented">This certificate is proudly presented to</div>
            <div className="cname">{name || "Student Name"}</div>
            <div className="name-rule" />
            <div className="body1">for successfully completing the</div>
            <div className="body2">{prog}</div>
            <div className="body3">
              at Digital Fluxx Academics — Pakistan&apos;s practical digital marketing academy.
            </div>
          </div>

          <div className="seal">
            <div className="disc">
              <div className="ring" />
              <div className="star">★</div>
              <div className="ctxt">CERTIFIED</div>
            </div>
          </div>

          <div className="sigrow">
            <div className="block">
              <div className="datename">{date}</div>
              <div className="sigline blabel">Date of Completion</div>
            </div>
            <div className="block">
              <div className="signame">Muzammil Farrukh</div>
              <div className="sigline blabel">Founder &amp; Lead Instructor</div>
            </div>
          </div>

          <div className="footer">
            digitalfluxxacademics.com &nbsp;•&nbsp; Certificate ID: {id}
          </div>
        </div>
      </div>
    </div>
  );
}
