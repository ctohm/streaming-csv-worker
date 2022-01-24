
import DefaultTheme from 'vitepress/theme'
import './style.css'


import MyLayout from './MyLayout.vue'

export default {
  ...DefaultTheme,
  // override the Layout with a wrapper component that injects the slots
  Layout: MyLayout,

  enhanceApp({ app }) {
    //app.component('BadgeAndPreview', BadgeAndPreview)
    //app.component('Dialog', Dialog)
    //app.component('Footer', Footer)
  }
}