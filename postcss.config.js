const path = require('path')
const fsp = require('fs/promises')
const prettier = require('prettier')

module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-modules': {
      globalModulePaths: [/\.global\.css$/],
      getJSON: async (cssFilename, json, outputFilename) => {
        await fsp
          .mkdir(path.dirname(outputFilename), { recursive: true })
          .catch(() => {})
        const rawContent = `export default ${JSON.stringify(json, null, 2)}`

        const prettierOpts = await prettier.resolveConfig(outputFilename)

        const formattedContent = await prettier.format(rawContent, {
          ...prettierOpts,
          parser: 'typescript'
        })

        await fsp.writeFile(
          `${outputFilename.replace(/\.css$/, '.mjs')}`,
          formattedContent
        )
      }
    }
  }
}
