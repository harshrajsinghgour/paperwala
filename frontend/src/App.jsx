import { useState } from 'react'
import axios from 'axios'

function App() {
  const [msg, setMsg] = useState('Button dabao')

  const getData = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL)
      setMsg(res.data)
    } catch (err) {
      setMsg('Error: Backend chal raha hai kya? Port 5000 check karo')
    }
  }

  return (
    <div style={{textAlign: 'center', padding: '50px', fontFamily: 'Arial'}}>
      <h1>📄 Paperwala App</h1>
      <button onClick={getData} style={{padding: '12px 24px', fontSize: '18px', cursor: 'pointer'}}>
        Backend Test Karo
      </button>
      <h2 style={{marginTop: '20px', color: 'green'}}>{msg}</h2>
    </div>
  )
}
export default App
