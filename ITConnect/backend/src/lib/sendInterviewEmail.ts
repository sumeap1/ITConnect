// backend/lib/email/sendInterviewEmail.ts
import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY || "");


export async function sendInterviewEmail({
  to,
  companyName,
  positionTitle,
  interviewDate,
  interviewLocation,
}: {
  to: string;
  companyName: string;
  positionTitle: string;
  interviewDate: string;
  interviewLocation: string;
}) {
  return resend.emails.send({
    from: "info@itconnect.it.com",
    to,
    subject: `📩 Ftesë për intervistë nga ${companyName}`,
    html: `
      <p><strong>Përshëndetje,</strong></p>
      <p>Jeni ftuar për një intervistë për poziten <strong>${positionTitle}</strong> nga <strong>${companyName}</strong>.</p>
      <p><strong>Data:</strong> ${interviewDate}</p>
      <p><strong>Vendndodhja / Linku:</strong> ${interviewLocation}</p>
      <p>Ju urojmë suksese,<br/>Ekipi i IT Conect</p>
    `,
  });
}
