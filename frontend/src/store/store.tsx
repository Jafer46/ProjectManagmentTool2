import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type userStore = {
  user: any | null
  token: string
  login: (userData: any, token: string) => void
  logout: () => void
}

const useAuth = create<userStore>()(
  persist(
    set => ({
      user: null,
      token: '',
      login: (userData: any, token: string) =>
        set(() => ({ user: userData, token })),
      logout: () => set(() => ({ user: null, token: '' }))
    }),
    { name: 'auth', storage: createJSONStorage(() => sessionStorage) }
  )
)

export default useAuth
