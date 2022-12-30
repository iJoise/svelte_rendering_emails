import { config } from 'dotenv'
import { Examples } from '../build/mails'
import { render } from '../build'
import { createTransport } from 'nodemailer'
import { writeFile } from 'fs'
import type * as SMTPTransport from 'nodemailer/lib/smtp-transport'
config()

const html = render(Examples, {})

writeFile('template.html', html, function (err) {
  if (err) return console.log(err);
  console.log('mails saved')
})

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
} as SMTPTransport.Options)

const sendMail = async (to: string[]): Promise<void> => {
  try {
     await transporter.sendMail({
       from: process.env.SMTP_USER,
       to,
       subject: 'Test emails',
       text: '',
       html,
     })
    console.log('email sending')
  } catch(err) {
     console.warn(err);
  }
}

sendMail(process.env.SMTP_TO?.split(' ') || [''])
