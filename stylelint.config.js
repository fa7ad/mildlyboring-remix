module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-tailwindcss'
  ],
  rules: {
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'selector-class-pattern':
      /(^([a-z][a-z0-9]*)(-[a-z0-9]+)*$)|(^[a-z][a-zA-Z0-9]+$)/,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ]
  },
  ignoreFiles: [
    'node_modules/**',
    'app/styles/**',
    'styles/tailwind.global.css'
  ]
}
