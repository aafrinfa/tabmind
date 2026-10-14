
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,

  theme: {
    defaultTheme: 'tabmindLight',
    themes: {
      tabmindLight: {
        dark: false,
        colors: {
          primary: '#586B45',
          secondary: '#A3AE91',
          background: '#F7F7F2',
          surface: '#FFFFFF',
          error: '#B3261E',
        },
      },
    },
  },
})
