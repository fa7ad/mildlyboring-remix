#!/usr/bin/env node
const path = require('path')
const fsp = require('fs/promises')
const { ls, config } = require('npm-remote-ls')

config({
  development: false,
  optional: false
})

const pkg = require(path.resolve(__dirname, '..', 'package.json'))

const stripVersion = pkgWithVersion =>
  pkgWithVersion.slice(0, pkgWithVersion.lastIndexOf('@'))

const getDeps = dep =>
  new Promise(resolve =>
    ls(dep, pkg.dependencies?.[dep] || 'latest', true, data => {
      const packageNames = data.map(stripVersion)
      resolve(packageNames)
    })
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
  const dependenciesSet = new Set()
  const dependencyLists = await Promise.all(rootDeps.map(getDeps))
  dependencyLists.flat().forEach(dep => dependenciesSet.add(dep))

  const depsToBundle = Array.from(dependenciesSet).sort().join('\n')

  await fsp.writeFile('deps.txt', depsToBundle)
}

// uncomment to update deps.txt file
// should be done every time rootDeps changes
updateDepsFile().then(() => console.log('deps.txt updated'))
