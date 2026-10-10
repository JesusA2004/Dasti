import { ref, watch } from 'vue'

/**
 * Sistema de temas DASTI.
 * El rediseño consolida los 4 temas anteriores en dos variantes (claro / oscuro).
 * Los valores guardados previamente en localStorage se migran automáticamente.
 */
export type ThemeId = 'light' | 'dark'

export interface Theme {
  id: ThemeId
  name: string
  label: string
  preview: { bg: string; accent: string }
}

export const themes: Theme[] = [
  { id: 'light', name: 'Light', label: 'Claro', preview: { bg: '#F3F6FA', accent: '#2563EB' } },
  { id: 'dark', name: 'Dark', label: 'Oscuro', preview: { bg: '#060D19', accent: '#3B82F6' } },
]

const STORAGE_KEY = 'dasti-theme'

function migrateThemeId(stored: string | null): ThemeId | null {
  if (!stored) return null
  const migrations: Record<string, ThemeId> = {
    dark: 'dark',
    'dark-tech': 'dark',
    graphite: 'dark',
    'blue-premium': 'dark',
    indigo: 'dark',
    light: 'light',
    'light-corporate': 'light',
  }
  return migrations[stored] ?? null
}

function readStored(): string | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function systemTheme(): ThemeId {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const currentThemeId = ref<ThemeId>(migrateThemeId(readStored()) ?? systemTheme())

if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', currentThemeId.value)

  watch(currentThemeId, (id) => {
    document.body.classList.add('theme-transitioning')
    document.documentElement.setAttribute('data-theme', id)
    try {
      localStorage.setItem(STORAGE_KEY, id)
    } catch {
      /* almacenamiento no disponible: el tema solo dura la sesión */
    }
    window.setTimeout(() => document.body.classList.remove('theme-transitioning'), 450)
  })
}

export function useTheme() {
  const setTheme = (id: ThemeId) => {
    currentThemeId.value = id
  }
  const toggleTheme = () => {
    currentThemeId.value = currentThemeId.value === 'dark' ? 'light' : 'dark'
  }
  const isDark = () => currentThemeId.value === 'dark'

  return { currentThemeId, themes, setTheme, toggleTheme, isDark }
}
