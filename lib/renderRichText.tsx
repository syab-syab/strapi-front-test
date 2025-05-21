import React from 'react'

type RichTextNode = {
  type: string
  children?: RichTextNode[]
  text?: string
  code?: boolean
  bold?: boolean
  italic?: boolean
  underline?: boolean
  level?: number
}

export const renderRichText = (nodes: RichTextNode[]): React.ReactNode => {
  return nodes.map((node, index) => {
    if (node.type === 'text') {
      let content = node.text || ''

      if (node.code) {
        // コードブロックとしてそのままHTMLレンダリング
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )
      }

      let textElement = <>{content}</>

      if (node.bold) textElement = <strong>{textElement}</strong>
      if (node.italic) textElement = <em>{textElement}</em>
      if (node.underline) textElement = <u>{textElement}</u>

      return <React.Fragment key={index}>{textElement}</React.Fragment>
    }

    const children = node.children ? renderRichText(node.children) : null

    switch (node.type) {
      case 'paragraph':
        return <p key={index}>{children}</p>
      case 'heading':
        if (node.level === 1) return <h1 key={index}>{children}</h1>
        if (node.level === 2) return <h2 key={index}>{children}</h2>
        if (node.level === 3) return <h3 key={index}>{children}</h3>
        return <h4 key={index}>{children}</h4>
      case 'list-item':
        return <li key={index}>{children}</li>
      case 'bulleted-list':
        return <ul key={index}>{children}</ul>
      default:
        return <div key={index}>{children}</div>
    }
  })
}
