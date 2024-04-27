import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import CustomToaster from './components/Toast.tsx'
import { RecoilRoot } from 'recoil'
import DataLoader from './components/DataLoader.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RecoilRoot>
        <DataLoader/>
        <App />
        <CustomToaster/>
    </RecoilRoot>
  </React.StrictMode>,
)
