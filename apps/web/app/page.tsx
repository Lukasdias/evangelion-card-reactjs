import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllThemes } from '@vignette-cards/themes'

export const metadata: Metadata = {
  title: 'Vignette | Title Card Generator',
  description: 'Create stylized title cards from your favorite movies, series, and anime.',
}

export default function Home() {
  const themes = getAllThemes()

  return (
    <div className='relative min-h-screen overflow-hidden'>
      <div className='mesh-bg' />
      <div className='noise-overlay' />
      
      <main className='relative z-10 mx-auto max-w-6xl px-6 py-20'>
        <div className='mb-20 text-center'>
          <div className='mb-6 inline-block'>
            <h1 className='animate-float text-6xl font-bold tracking-tight md:text-8xl'>
              <span className='gradient-text'>Vignette</span>
            </h1>
          </div>
          <p className='mx-auto max-w-2xl text-xl text-white/60'>
            Create stylized title cards from your favorite movies, series, and anime.
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {themes.map((theme, index) => (
            <Link
              key={theme.id}
              href={`/${theme.id}`}
              className='theme-card group'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className='relative z-10'>
                <div className='mb-4 flex items-center justify-between'>
                  <h2 className='text-2xl font-bold text-white'>{theme.name}</h2>
                  {theme.year && (
                    <span className='rounded-full bg-white/5 px-3 py-1 text-sm text-white/40'>
                      {theme.year}
                    </span>
                  )}
                </div>
                <p className='mb-6 text-white/50'>{theme.description}</p>
                <div className='flex items-center gap-3'>
                  <span
                    className='h-2 w-2 rounded-full'
                    style={{ backgroundColor: theme.colors.accent, boxShadow: `0 0 10px ${theme.colors.accent}` }}
                  />
                  <span className='text-sm text-white/40'>
                    {theme.presets.length} presets
                  </span>
                </div>
              </div>
              
              <div 
                className='absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40'
                style={{ backgroundColor: theme.colors.accent }}
              />
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
