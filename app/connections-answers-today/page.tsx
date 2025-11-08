import { readFileSync } from 'fs'
import { join } from 'path'

// 在构建时读取文件内容
const bodyContent = readFileSync(join(process.cwd(), 'data', 'connections-answers-today-body.html'), 'utf8')

export default function ConnectionsAnswersToday() {
  return <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
}