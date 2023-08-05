import React, { useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { useAuth } from '../context/AuthProvider';

const Dashboard = () => {

  const [error, setError] = useState('');
  const { currentUser } = useAuth()

    const handleLogout = () => {
       
    }
  return (
    <>
        <Card>
        <h2 className='text-center mb-4'>Profile</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        <strong>Email: </strong>{currentUser.email}
        </Card>
        <div className="w-100 text-center mt-2">
            <Button variant='link' onClick={handleLogout}>Logout</Button>
        </div>
    </>
  )
}

export default Dashboard