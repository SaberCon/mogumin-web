import React from 'react'
import { PageContainer, PageLoading } from '@ant-design/pro-layout'
import { useParams } from 'umi'
import { useRequest } from 'ahooks'
import { getNote } from '@/pages/note/service'
import { Card } from 'antd'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styles from './index.less'
import './github-markdown.css'

const MarkdownReader: React.FC<{ value: string }> = ({ value }) => {
  return (
    <ReactMarkdown
      className={`markdown-body ${styles.markdownReader}`}
      children={value}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm, remarkToc]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={prism}
              customStyle={{ backgroundColor: '#f6f8fa' }}
              language={match[1]}
              PreTag="div"
              {...props as any}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        }
      }}
    />
  )
}

const NoteRead: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data } = useRequest(getNote, { defaultParams: [id] })

  return (
    <PageContainer>
      <Card style={{ padding: '32px 64px' }}>
        {data ? <MarkdownReader value={data.content}/> : <PageLoading/>}
      </Card>
    </PageContainer>
  )
}

export default NoteRead
