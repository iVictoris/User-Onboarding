import React, {useState} from "react";
import "./App.css";
import EnchancedForm from "./components/Form";

function App() {
  const [users, setUser] = useState([]);

  const addUser = (user) => {
    const newUsers = [...users, user];
    setUser(newUsers);
  }

  const generateUserCards = () => {
    const cards = users.length > 0 ? users.map(({id, name, email, createdAt}) => {
      return (
        <section className='card' key={id}>
          <div className='id'>{id}</div>
          <div className='name'>{name}</div>
          <div className='email'>{email}</div>
          <div className='createdAt'>{createdAt}</div>
        </section>
      )
    }) : null;
    return cards;
  }


  return (
    <div className="App">
      <EnchancedForm addUser={addUser}/>
      <br />
      {users && generateUserCards()}
    </div>
  );
}

export default App;
