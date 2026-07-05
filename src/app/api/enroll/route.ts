// Receives the enrollment payload (screening answers + name/phone + payment
// screenshot) from the browser and emails it — screenshot attached — to the
// DFA inbox via Resend, so every upload arrives as a notification in real time.
// Secrets stay server-side in env vars (never in the client bundle or repo).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL || "digitalfarrukh@gmail.com";
  if (!apiKey) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const form = await request.formData();
    const type = String(form.get("type") || "enrollment");
    const isFreeClass = type === "free-class";
    const name = String(form.get("name") || "");
    const phone = String(form.get("phone") || "");
    const plan = String(form.get("plan") || "");

    type QA = { q: string; a: string };
    let answers: QA[] = [];
    try {
      const parsed = JSON.parse(String(form.get("answers") || "[]"));
      if (Array.isArray(parsed)) answers = parsed as QA[];
    } catch {
      answers = [];
    }

    const attachments: { filename: string; content: string }[] = [];
    const file = form.get("screenshot");
    if (file && typeof file !== "string") {
      const buf = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name || "payment.jpg",
        content: buf.toString("base64"),
      });
    }

    const esc = (s: string) =>
      String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c] as string));

    const rows = answers
      .map(
        (x) =>
          `<tr><td style="padding:6px 12px;color:#64748b">${esc(x.q)}</td>` +
          `<td style="padding:6px 12px;font-weight:600;color:#0f172a">${esc(x.a)}</td></tr>`
      )
      .join("");

    const heading = isFreeClass ? "🎓 New Free-Class Registration" : "🟢 New DFA Enrollment";
    const html = `
      <div style="font-family:system-ui,Arial,sans-serif;max-width:560px">
        <h2 style="margin:0 0 4px">${heading}</h2>
        <p style="margin:0 0 16px;color:#64748b">${esc(plan)}</p>
        <table style="border-collapse:collapse;width:100%;font-size:14px">
          <tr><td style="padding:6px 12px;color:#64748b">Name</td><td style="padding:6px 12px;font-weight:600;color:#0f172a">${esc(name)}</td></tr>
          <tr><td style="padding:6px 12px;color:#64748b">WhatsApp</td><td style="padding:6px 12px;font-weight:600;color:#0f172a">${esc(phone)}</td></tr>
          ${rows}
        </table>
        ${attachments.length ? `<p style="margin:16px 0 0;color:#64748b;font-size:13px">📎 Payment screenshot attached.</p>` : ""}
      </div>`;

    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "DFA Enrollments <onboarding@resend.dev>",
        to: [to],
        subject: isFreeClass
          ? `🎓 Free-class registration — ${name || "Lead"} (${phone || "no number"})`
          : `🟢 New enrollment — ${name || "Lead"} (${phone || "no number"})`,
        html,
        attachments,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return Response.json({ ok: false, error: "email_failed", detail }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
