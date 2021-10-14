import * as React from "react";
import "./App.css";
import directory from './directory.jpg'

import { Button } from '@progress/kendo-react-buttons'

const RemoveRequest = (users) => {
  alert('deleted')
}

export default function App() {
  const [users, setUsers] = React.useState([]);
  const [canLoadMore, setCanLoadMore] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const fakeData = async (page) => {
    const res = await fetch(
      `https://reqres.in/api/users/?page=${page}`
    );
    const json = await res.json();
    setCanLoadMore(json.total_pages > page);
    setUsers((data) => (page > 1 ? [...data, ...json.data] : json.data));
  };
  React.useEffect(() => {
    fakeData(page);
  }, [page]);
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
                <img
                  key={user.avatar}
                  src={user.avatar}
                  alt='avatar'
                  height='120px'
                />

                <p>
                  <strong>{user.first_name}</strong>
                </p>
                <p>{user.email}</p>
                
                <Button icon='delete' primary={true} onClick={RemoveRequest}>
                  DELETE
                </Button>
                <br />
              </div>
            )
          })}
      </div>
      {canLoadMore && (
        <div>
          <button onClick={() => setPage(page => page + 1)}>Load More</button>
        </div>
      )}
    </div>
  )
}