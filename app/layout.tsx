import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body style={{ background: '#181a20' }}>
        <div className="p-4">
          <h1 style={{ color: '#efefef' }} className="text-4xl">Poetodon</h1>
          <div>{children}</div>
        </div>
      </body>
    </html>
  )
}
