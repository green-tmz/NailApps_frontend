import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isCollapsed: false,
    isMobileHidden: false
  }),
  actions: {
    toggleSidebar() {
      if (this.isMobileHidden) {
        // На мобильных - переключаем видимость
        this.isMobileHidden = !this.isMobileHidden
      } else {
        // На десктопах - переключаем свернутое состояние
        this.isCollapsed = !this.isCollapsed
      }
    },
    setMobileView(isMobile: boolean) {
      if (isMobile) {
        this.isCollapsed = false
        this.isMobileHidden = true
      } else {
        this.isMobileHidden = false
      }
    }
  }
})