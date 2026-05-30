import { create } from 'zustand'

export const useAppStore = create((set) => ({
  // State
  currentTab: 'tts',
  apiKey: localStorage.getItem('openrouter_key') || '',
  conversions: [],
  notifications: [],

  // Actions
  setCurrentTab: (tab) => set({ currentTab: tab }),
  
  setApiKey: (key) => {
    localStorage.setItem('openrouter_key', key)
    set({ apiKey: key })
  },

  addConversion: (conversion) => set((state) => ({
    conversions: [conversion, ...state.conversions]
  })),

  addNotification: (notification) => set((state) => ({
    notifications: [notification, ...state.notifications]
  })),

  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),

  clearConversions: () => set({ conversions: [] })
}))

export default useAppStore