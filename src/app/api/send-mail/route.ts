import { NextResponse } from 'next/server';
import { Resend } from 'resend';

interface RequestBody {
  to: string;
  subject: string;
  message: string;
  name: string;
  resend_apikey: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const resend = new Resend(body.resend_apikey)

  const { data, error } = await resend.emails.send({
    from: body.name,
    to: [body.to],
    subject: body.subject,
    text: body.message,
  })
  
  if (error) {
    NextResponse.json(error)
  }

  return NextResponse.json(data)
}