const colors = require('tailwindcss/colors')

module.exports = {
    // purge: {
    //   enabled: process.env.NODE_ENV,
    //   content: [
    //       './src/**/*.{html,js}',
    //   ],     
    // },  
    content: [
      './src/**/*.{html,js}',
    ], 
    theme: {
      
      extend: {
        colors: {
          "dark-full": "#151515",
          "dark-gray": "#2a2b2b",
          gray: colors.neutral,
          primary : "#f59e0b"
        },
        spacing: {
          '58': '14.5rem',
          '37': '9.25rem',
        },
        transitionProperty: {
          'height': 'height',
          'max-height' : 'max-height'
        },
        height: {
          "screen3/2": "150vh",
          "screen3/4": "75vh",
          "screen/2": "50vh",
          "screen/3": "calc(100vh / 3)",
          "screen/4": "calc(100vh / 4)",
          "screen/5": "calc(100vh / 5)",
        },
        maxHeight: {
          "screen3/2": "150vh",
          "screen3/4": "75vh",
          "screen/2": "50vh",
          "screen/3": "calc(100vh / 3)",
          "screen/4": "calc(100vh / 4)",
          "screen/5": "calc(100vh / 5)",
         }
      }
    },
    variants: {
      extend: {
        opacity: ['active', 'group-focus'],
        pointerEvents: ['hover', 'focus', 'group-hover', 'group-focus'],
        fontSize: ['hover', 'focus'],
        textColor: ['group-focus']
      }
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('tailwindcss-textshadow'),
      require('tailwind-scrollbar-hide'),
      require('tailwind-scrollbar'),
      require('@tailwindcss/aspect-ratio'),
    ],
    corePlugins: {
     
    },
    
};