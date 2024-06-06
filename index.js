import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App.js'

console.log('react', React)
ReactDom.createRoot(document.getElementById('root')).render(
    <App />
)
