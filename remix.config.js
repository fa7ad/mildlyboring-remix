const fs = require('fs')

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
