import * as React from 'react'
import './App.css'

import directory from './directory.jpg'

import { Button } from '@progress/kendo-react-buttons'

const RemoveRequest =() => {
  alert('deleted')
}

const App= () => {
  const [users, setUsers] = React.useState([])
  const API_NAME = async () => {
    const res = await fetch('https://reqres.in/api/users?page=2')
    const json = await res.json()
    setUsers(json.data)
  }
  React.useEffect(() => {
    API_NAME()
  }, [])

  

  
  return (
    <div className='App'>
    <div className='Header'>
      <img src={directory} alt='banner' height='300px' width='99%'></img>
    </div>
      <div className='flex'>
        {users.length &&
          users.map(user => {
            return (
              <div key={user.id}>
                <p>
                  <strong>{user.first_name}</strong>
                </p>
                <p>{user.email}</p>
                <img key={user.avatar} src={user.avatar} alt='user-profile' />
                <p>{user.support}</p>
                <br />
                <Button
                  icon='delete'
                  primary={true}
                  onClick={RemoveRequest}
                >
                  DELETE
                </Button>
              </div>
            )
          })}
      </div>
    </div>
  )
}


export default App