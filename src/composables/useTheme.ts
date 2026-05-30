import { ref, watchEffect } from 'vue'

export type ThemeId = 'dark-tech' | 'light-corporate' | 'blue-premium' | 'graphite' | 'indigo'

export interface Theme {
  id: ThemeId
  name: string
  label: string
  preview: { bg: string; accent: string }
}

export const themes: Theme[] = [
  {
    id: 'dark-tech',
    name: 'Dark Tech',
    label: 'Predeterminado',
    preview: { bg: '#050D1A', accent: '#3B82F6' },
  },
  {
    id: 'light-corporate',
    name: 'Light Corporate',
    label: 'Claro',
    preview: { bg: '#F1F5F9', accent: '#2563EB' },
  },
  {
    id: 'blue-premium',
    name: 'Blue Premium',
    label: 'Azul Pro',
    preview: { bg: '#020C1F', accent: '#38BDF8' },
  },
  {
    id: 'graphite',
    name: 'Graphite',
    label: 'Grafito',
    preview: { bg: '#0F0F0F', accent: '#E5E5E5' },
  },
  {
    id: 'indigo',
    name: 'Indigo',
    label: 'Índigo',
    preview: { bg: '#0D0B1E', accent: '#818CF8' },
  },
]

function getInitialTheme(): ThemeId {
  if (typeof localStorage === 'undefined') return 'dark-tech'
  const stored = localStorage.getItem('dasti-theme') as ThemeId | null
  return stored && themes.some(t => t.id === stored) ? stored : 'dark-tech'
}

const currentThemeId = ref<ThemeId>(getInitialTheme())

if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', currentThemeId.value)

  watchEffect(() => {
    document.body.classList.add('theme-transitioning')
    document.documentElement.setAttribute('data-theme', currentThemeId.value)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('dasti-theme', currentThemeId.value)
    }
    setTimeout(() => document.body.classList.remove('theme-transitioning'), 500)
  })
}

export function useTheme() {
  const setTheme = (id: ThemeId) => { currentThemeId.value = id }
  const isDark = () => currentThemeId.value !== 'light-corporate'

  return { currentThemeId, themes, setTheme, isDark }
}
