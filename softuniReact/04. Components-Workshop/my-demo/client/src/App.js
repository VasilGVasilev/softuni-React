import { useState, useEffect } from 'react';

import * as userService from './service/userService'

import { Header } from "./components/common/Header";
import { Footer } from './components/common/Footer';
import { Search } from './components/search/Search';
import { UserList } from './components/user-list/UserList';
import './App.css'



function App() {
    const [users, setUsers] = useState([]); // empty list so that .map() in UserList does not error
    useEffect(()=>{
        userService.getAll()
            .then(users => setUsers(users)) //the getAll() is async function -> wrapped in promise => resolve with then here
    },[])

    return (
        <div>
            <Header/>

            <main className='main'>
                <section className="card users-container">
                    <Search/>
                    <UserList users={users}/>
                </section>
            </main>
            
            <Footer/>
        </div>
    );
}

export default App;
