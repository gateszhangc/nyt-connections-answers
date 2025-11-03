import { readFileSync } from 'fs'
import { join } from 'path'

export default function Home() {
  const bodyContent = readFileSync(join(process.cwd(), 'data', 'home-body.html'), 'utf8')
  
  return <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
}
