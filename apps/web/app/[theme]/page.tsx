import { notFound } from 'next/navigation'
import { getTheme, getThemeIds } from '@vignette/themes'
import type { Metadata } from 'next'
import ThemePageClient from './client'

interface ThemePageProps {
  params: Promise<{
    theme: string
  }>
}

export async function generateStaticParams() {
  const themeIds = getThemeIds()
  return themeIds.map((theme) => ({
    theme,
  }))
}

export async function generateMetadata({ params }: ThemePageProps): Promise<Metadata> {
  const { theme: themeId } = await params
  const theme = getTheme(themeId)

  if (!theme) {
    return {
      title: 'Theme Not Found | Vignette',
    }
  }

  return {
    title: `${theme.name} Title Card Generator | Vignette`,
    description: `Create ${theme.name} title cards with customizable text and effects.`,
  }
}

export default async function ThemePage({ params }: ThemePageProps) {
  const { theme: themeId } = await params
  const theme = getTheme(themeId)

  if (!theme) {
    notFound()
  }

  return <ThemePageClient theme={theme} />
}
