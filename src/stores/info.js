import { create } from "zustand";

const infoStore = create((set) => ({
  name: "",
  setName: (inputName) => set(() => ({ name: inputName })),
  number: 0,
  setNumber: () => set((state) => ({ number: state.number + 1})),
  resetNumber: () => set({ number: 0 })
}))

export default infoStore