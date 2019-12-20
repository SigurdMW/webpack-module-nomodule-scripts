import { createStore } from 'redux'

const store = createStore((state, action) => ({
	...state
}))

export default store