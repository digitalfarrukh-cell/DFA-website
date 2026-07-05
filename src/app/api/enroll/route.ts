// Receives the enrollment payload (screening answers + name/phone + payment
// screenshot) from the browser and forwards it to a Google Apps Script Web
// App, which appends a row to the Google Sheet and saves the screenshot to
// Drive. The Apps Script URL is kept server-side in SHEET_WEBHOOK_URL so it
// is never exposed in the client bundle or the repo.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const webhook = process.env.SHEET_WEBHOOK_URL;
  if (!webhook) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const form = await request.formData();
    const name = String(form.get("name") || "");
    const phone = String(form.get("phone") || "");
    const plan = String(form.get("plan") || "");

    let answers: unknown = [];
    try {
      answers = JSON.parse(String(form.get("answers") || "[]"));
    } catch {
      answers = [];
    }

    let imageBase64 = "";
    let imageMime = "";
    let imageName = "";
    const file = form.get("screenshot");
    if (file && typeof file !== "string") {
      const buf = Buffer.from(await file.arrayBuffer());
      imageBase64 = buf.toString("base64");
      imageMime = file.type || "image/jpeg";
      imageName = file.name || "payment.jpg";
    }

    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        plan,
        answers,
        imageBase64,
        imageMime,
        imageName,
      }),
    });

    const text = await res.text();
    let ok = res.ok;
    try {
      const j = JSON.parse(text);
      if (j && j.ok === false) ok = false;
    } catch {
      /* Apps Script may return non-JSON on success; rely on res.ok */
    }

    if (!ok) {
      return Response.json({ ok: false, error: "sheet_error" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
