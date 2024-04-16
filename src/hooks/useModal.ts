import { create } from 'zustand'

export type ModalType = 'movieInfo'

interface ModalData {
  movieId?: string
}

interface ModalStore {
  type: ModalType | null
  data?: ModalData
  open: boolean
  onOpen: (type: ModalType | null, data?: ModalData) => void
  onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  open: false,
  onOpen: (type, data) => set({ type, data, open: true }),
  onClose: () => set({ open: false }),
}))
