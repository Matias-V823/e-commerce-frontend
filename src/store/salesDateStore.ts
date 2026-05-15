import { create } from "zustand"

interface SalesDateStore {
    date: Date
    setDate: (date: Date) => void
}

export const useSalesDateStore = create<SalesDateStore>()((set) => ({
    date: new Date(),
    setDate: (date) => set({ date }),
}))
