import type { InjectionKey, Ref } from 'vue'

export type DrawerCtx = {
  isOpen: Ref<boolean>
  open: () => void
  close: () => void
  toggle: () => void
}

export const DrawerKey: InjectionKey<DrawerCtx> = Symbol('drawer')
