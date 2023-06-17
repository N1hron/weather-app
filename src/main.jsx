import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store'
import App from './components/app/App'

import 'normalize.css'
import './main.scss'

const root = createRoot(document.querySelector('#root'))
root.render(
  // <StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  // </StrictMode>
)