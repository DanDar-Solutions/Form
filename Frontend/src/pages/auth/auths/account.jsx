import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Account() {                //profile. users profile.
  const navigate = useNavigate()
  
  const handleLogout = () => {
    sessionStorage.removeItem('User')
    localStorage.removeItem('logged')
    
    navigate('/')
    
    window.location.reload()
  }

  return (
    <div>
      <h2>Хэрэглэгчийн хуудас</h2>
      <button onClick={handleLogout} style={{ 
        padding: '10px 20px', 
        backgroundColor: '#e53e3e', 
        color: 'white', 
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '20px'
      }}>
        Гарах
      </button>
    </div>
  )
}
