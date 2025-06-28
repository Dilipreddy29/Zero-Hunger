import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DonorForm from './components/DonorForm.jsx'
import { requestPushPermission } from "./helper/requestPushPermission.js";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <DonorForm />
    </>
  )
}

export default App
