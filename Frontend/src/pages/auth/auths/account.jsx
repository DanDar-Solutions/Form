import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser } from "./../../../api"

export default function Account() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)

  const handleLogout = () => {
    sessionStorage.removeItem('User')
    localStorage.removeItem('logged')
    localStorage.removeItem('User')
    navigate('/', { replace: true })
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('User'))
    const userId = user?.id

    if (!userId) {
      console.warn("userId олдсонгүй")
      navigate('/', { replace: true })
      return
    }

    getUser(userId)
      .then(data => {
        setUserData(data)
      })
      .catch(err => {
        console.error("Алдаа:", err)
      })
  }, [navigate])

  return (
    <div>
      <h2>Хэрэглэгчийн хуудас</h2>
      {userData ? (
        <div>
          <p>Нэр: {userData.name}</p>
          <p>И-мэйл: {userData.email}</p>
          {/* Хүсвэл өөр мэдээлэл нэм */}
        </div>
      ) : (
        <p>Уншиж байна...</p>
      )}

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
