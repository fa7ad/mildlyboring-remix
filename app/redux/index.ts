import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './rootReducer'

export * as hooks from './hooks'

const store = configureStore({
  reducer: rootReducer
})

export default store
