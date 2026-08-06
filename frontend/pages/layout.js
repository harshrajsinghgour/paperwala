export const metadata = {
  title: 'Paperwala',
  description: 'Test Engine App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{backgroundColor: '#002B7F', margin: 0, color: 'white'}}>
        {children}
      </body>
    </html>
  )
  }
