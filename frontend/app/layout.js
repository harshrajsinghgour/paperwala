export const metadata = {
  title: 'Paperwala Test Platform',
  description: 'India Ka Preferred Mock Test & Prep Destination',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{backgroundColor: '#001A4D', margin: 0}}>
        {children}
      </body>
    </html>
  )
}
