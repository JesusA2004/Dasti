const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const { rateLimit } = require('express-rate-limit')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}))

app.use(express.json({ limit: '10kb' }))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { ok: false, message: 'Demasiadas solicitudes. Intenta más tarde.' },
  standardHeaders: true,
  legacyHeaders: false,
})

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

function sanitize(val) {
  if (typeof val !== 'string') return ''
  return val.replace(/[<>]/g, '').trim().slice(0, 1000)
}

function buildHtml({ name, company, phone, email, service, message }) {
  const now = new Date().toLocaleString('es-MX', {
    timeZone: 'America/Mexico_City',
    dateStyle: 'full',
    timeStyle: 'short',
  })
  const row = (label, value) => value
    ? `<div class="field"><div class="label">${label}</div><div class="value">${value}</div></div>`
    : ''
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<style>
  body{font-family:Arial,sans-serif;background:#f1f5f9;margin:0;padding:24px}
  .wrap{max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.1)}
  .hd{background:#0F172A;padding:28px 32px}
  .hd h1{color:#fff;margin:0;font-size:20px;font-weight:700}
  .hd p{color:#94a3b8;margin:6px 0 0;font-size:13px}
  .bd{padding:28px 32px}
  .field{margin-bottom:18px;padding-bottom:16px;border-bottom:1px solid #f1f5f9}
  .field:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
  .label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;margin-bottom:5px}
  .value{font-size:15px;color:#1e293b;white-space:pre-wrap;line-height:1.5}
  .ft{background:#f8fafc;padding:14px 32px;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8}
</style>
</head>
<body>
<div class="wrap">
  <div class="hd">
    <h1>Nuevo mensaje desde dasti.cloud</h1>
    <p>Formulario de contacto &middot; ${now}</p>
  </div>
  <div class="bd">
    ${row('Nombre', name)}
    ${row('Empresa', company)}
    ${row('Teléfono', phone)}
    ${row('Correo', email)}
    ${row('Servicio de interés', service)}
    ${row('Mensaje', message)}
  </div>
  <div class="ft">Origen: Formulario web DASTI &middot; dasti.cloud</div>
</div>
</body>
</html>`
}

function buildText({ name, company, phone, email, service, message }) {
  const now = new Date().toLocaleString('es-MX', {
    timeZone: 'America/Mexico_City',
    dateStyle: 'full',
    timeStyle: 'short',
  })
  const lines = ['Nuevo mensaje desde dasti.cloud', `Fecha: ${now}`, '', `Nombre: ${name}`]
  if (company) lines.push(`Empresa: ${company}`)
  if (phone) lines.push(`Teléfono: ${phone}`)
  if (email) lines.push(`Correo: ${email}`)
  if (service) lines.push(`Servicio de interés: ${service}`)
  lines.push('', `Mensaje:\n${message}`, '', 'Origen: Formulario web DASTI · dasti.cloud')
  return lines.join('\n')
}

app.post('/api/contact', limiter, async (req, res) => {
  const { name, company, phone, email, service, message, website_url } = req.body

  // Honeypot: bots that fill the hidden field are silently accepted and discarded
  if (website_url) {
    return res.json({ ok: true, message: 'Mensaje enviado correctamente' })
  }

  const n = sanitize(name)
  const c = sanitize(company)
  const p = sanitize(phone)
  const e = sanitize(email)
  const s = sanitize(service)
  const m = sanitize(message)

  if (!n) return res.status(400).json({ ok: false, message: 'El nombre es requerido.' })
  if (!p && !e) return res.status(400).json({ ok: false, message: 'Proporciona un teléfono o correo para contactarte.' })
  if (!m) return res.status(400).json({ ok: false, message: 'El mensaje es requerido.' })

  const data = { name: n, company: c, phone: p, email: e, service: s, message: m }

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      replyTo: e || undefined,
      subject: 'Nuevo mensaje desde el sitio web de DASTI',
      text: buildText(data),
      html: buildHtml(data),
    })
    res.json({ ok: true, message: 'Mensaje enviado correctamente' })
  } catch (err) {
    console.error('[contact] Mail error:', err.message)
    res.status(500).json({ ok: false, message: 'No se pudo enviar el mensaje. Intenta de nuevo o contáctanos por WhatsApp.' })
  }
})

app.listen(PORT, () => {
  console.log(`DASTI API server running on port ${PORT}`)
})
