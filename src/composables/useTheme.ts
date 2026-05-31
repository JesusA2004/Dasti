import { ref, watchEffect } from 'vue'

export type ThemeId = 'dark' | 'light' | 'blue-premium' | 'indigo'

export interface Theme {
  id: ThemeId
  name: string
  label: string
  preview: { bg: string; accent: string }
}

export const themes: Theme[] = [
  {
    id: 'dark',
    name: 'Dark',
    label: 'Oscuro',
    preview: { bg: '#050D1A', accent: '#3B82F6' },
  },
  {
    id: 'light',
    name: 'Light',
    label: 'Claro',
    preview: { bg: '#F8FAFC', accent: '#2563EB' },
  },
  {
    id: 'blue-premium',
    name: 'Blue Premium',
    label: 'Azul Pro',
    preview: { bg: '#020C1F', accent: '#38BDF8' },
  },
  {
    id: 'indigo',
    name: 'Indigo',
    label: 'Índigo',
    preview: { bg: '#0D0B1E', accent: '#818CF8' },
  },
]

function migrateThemeId(stored: string | null): ThemeId {
  if (!stored) return 'dark'
  const migrations: Record<string, ThemeId> = {
    'dark-tech': 'dark',
    'light-corporate': 'light',
    graphite: 'dark',
  }
  if (migrations[stored]) return migrations[stored]
  if (themes.some(t => t.id === stored)) return stored as ThemeId
  return 'dark'
}

function getInitialTheme(): ThemeId {
  if (typeof localStorage === 'undefined') return 'dark'
  return migrateThemeId(localStorage.getItem('dasti-theme'))
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
  const isDark = () => currentThemeId.value !== 'light'

  return { currentThemeId, themes, setTheme, isDark }
}
