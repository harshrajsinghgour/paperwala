import './globals.css'

export const metadata = {
  title: 'PaperWala',
  description: 'SSC Exam Prep App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
    }
