const ENV = {
  development: {
    PUBLIC_URL: process.env.PUBLIC_URL || 'http://localhost:3000'
  },
  test: {
    PUBLIC_URL: process.env.PUBLIC_URL || 'http://localhost:3000'
  },
  production: {
    PUBLIC_URL: process.env.PUBLIC_URL || 'https://mildlyboring.com'
  }
}

const globalEnv = ENV[process.env.NODE_ENV || 'development']

export default globalEnv
