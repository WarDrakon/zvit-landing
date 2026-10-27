import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Співмешканці — CMS',
  title: 'Співмешканці CMS',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="uk">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
