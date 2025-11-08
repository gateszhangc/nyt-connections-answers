import '../globals.css'
import { readFileSync } from 'fs'
import { join } from 'path'

// 在构建时读取head内容
const headContent = readFileSync(join(process.cwd(), 'data', 'connections-archive-head.html'), 'utf8')

export default function ConnectionsArchiveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head dangerouslySetInnerHTML={{ __html: headContent }} />
      <body>{children}</body>
    </html>
  )
}