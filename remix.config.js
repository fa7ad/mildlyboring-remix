// const { getDependenciesToBundle } = require('@remix-run/dev')
const fs = require('fs')
const fsp = require('fs/promises')
const { ls, config } = require('npm-remote-ls')

config({
  development: false,
  optional: false
})

const getDeps = dep =>
  new Promise(resolve =>
    ls(dep, 'latest', true, data =>
      resolve(data.map(x => x.slice(0, x.lastIndexOf('@'))))
    )
  )

const rootDeps = [
  'unified',
  'remark-gfm',
  'rehype-raw',
  'remark-math',
  'remark-parse',
  'got',
  'strip-markdown',
  'remark-stringify',
  'remark-rehype',
  'rehype-sanitize',
  'rehype-stringify',
  'rehype-katex',
  'rehype-prism-plus',
  'micromark-extension-gfm',
  'micromark-extension-math'
]

async function updateDepsFile() {
  const dependencies = await Promise.all(rootDeps.map(getDeps))
  const uniqd = new Set()
  dependencies.forEach(dep => dep.forEach(d => uniqd.add(d)))
  const depsToBundle = Array.from(uniqd).sort()
  const depsToBundleStr = depsToBundle.join('\n')
  await fsp.writeFile('deps.txt', depsToBundleStr)
}

// uncomment to update deps.txt file
// should be done every time rootDeps changes
// updateDepsFile()

function getDepsFile() {
  const data = fs.readFileSync('deps.txt', 'utf8')
  return data.split('\n').map(x => new RegExp(`^${x}.*`))
}

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  // serverBuildTarget: 'vercel',
  // server: process.env.NODE_ENV === 'development' ? undefined : './server.js',
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "api/index.js",
  // publicPath: "/build/",
  serverDependenciesToBundle: [...getDepsFile()]
}
