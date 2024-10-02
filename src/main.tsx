import { render } from 'preact'
import { App } from './app.tsx'
import './index.css'
import { store } from './state/store.ts'
import { Provider } from 'react-redux'

render(
<Provider store={store}>
    <App />
</Provider>,
document.getElementById('app')!)
