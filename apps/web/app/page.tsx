import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllThemes } from '@vignette/themes'

export const metadata: Metadata = {
  title: 'Vignette | Title Card Generator',
  description: 'Create stylized title cards from your favorite movies, series, and anime.',
}

export default function Home() {
  const themes = getAllThemes()

  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-900 to-black text-white'>
      <div className='mx-auto max-w-6xl px-4 py-16'>
        <div className='mb-16 text-center'>
          <h1 className='mb-4 text-5xl font-bold tracking-tight'>Vignette</h1>
          <p className='mx-auto max-w-2xl text-xl text-gray-400'>
            Create stylized title cards from your favorite movies, series, and anime.
          </p>
        </div>

        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {themes.map((theme) => (
            <Link
              key={theme.id}
              href={`/${theme.id}`}
              className='group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-800/50 p-6 transition-all hover:border-gray-600 hover:bg-gray-800'
            >
              <div
                className='absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20'
                style={{ backgroundColor: theme.colors.background }}
              />
              <div className='relative'>
                <div className='mb-2 flex items-center justify-between'>
                  <h2 className='text-2xl font-bold'>{theme.name}</h2>
                  {theme.year && (
                    <span className='text-sm text-gray-500'>{theme.year}</span>
                  )}
                </div>
                <p className='mb-4 text-gray-400'>{theme.description}</p>
                <div className='flex items-center gap-2 text-sm text-gray-500'>
                  <span
                    className='inline-block h-3 w-3 rounded-full'
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                  {theme.presets.length} presets
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
