import React from 'react'
import ReactDOM from 'react-dom/client'
import Amplify from 'aws-amplify'

import App from './components/App'
import config from './config.json'

import 'swiper/css/bundle'

Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
})

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
