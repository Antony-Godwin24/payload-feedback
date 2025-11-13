import React from 'react'
import './styles.css'
import Header from './components/Header'

export const metadata = {
  description:
    'Collect and showcase feedback for website templates—help authors improve their work and find proven templates for your next project.',
  title: 'Feedback for Templates',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
