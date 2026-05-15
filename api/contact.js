const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { type, name, company, email, phone, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"에코벨 문의" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO,
    subject: `[에코벨 문의] ${subject || type}`,
    html: `
      <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td colspan="2" style="padding:16px 0;font-size:18px;font-weight:bold;border-bottom:2px solid #1E8DCD;">에코벨 문의 접수</td></tr>
        <tr><td style="padding:10px 8px;color:#888;width:100px;">문의 유형</td><td style="padding:10px 8px;">${type || '—'}</td></tr>
        <tr><td style="padding:10px 8px;color:#888;">이름</td><td style="padding:10px 8px;">${name || '—'}</td></tr>
        <tr><td style="padding:10px 8px;color:#888;">소속/회사명</td><td style="padding:10px 8px;">${company || '—'}</td></tr>
        <tr><td style="padding:10px 8px;color:#888;">이메일</td><td style="padding:10px 8px;">${email || '—'}</td></tr>
        <tr><td style="padding:10px 8px;color:#888;">연락처</td><td style="padding:10px 8px;">${phone || '—'}</td></tr>
        <tr><td style="padding:10px 8px;color:#888;">제목</td><td style="padding:10px 8px;">${subject || '—'}</td></tr>
        <tr><td style="padding:10px 8px;color:#888;vertical-align:top;">내용</td><td style="padding:10px 8px;white-space:pre-wrap;">${message || '—'}</td></tr>
      </table>
    `,
  });

  res.status(200).json({ ok: true });
};
