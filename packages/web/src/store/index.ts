import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, compose, createStore } from 'redux'
import rootReducer from './root-reducer'
import rootSaga from './saga'


const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]
const enhancer = compose(applyMiddleware(...middlewares))

// rehydrate state on app start
const initialState = {}

// create store
const store = createStore(rootReducer, initialState, enhancer)
sagaMiddleware.run(rootSaga)

export default store
