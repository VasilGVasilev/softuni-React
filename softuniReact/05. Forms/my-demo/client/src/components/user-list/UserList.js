import { useEffect, useState } from "react"

import * as userService from '../../service/userService'

import { UserActions } from "./UserListConstants"

import { UserDetails } from "./user-details/UserDetails"
import { UserEdit } from "./user-edit/UserEdit"
import { UserItem } from "./user-item/UserItem"
import { UserDelete } from "./user-delete/UserDelete"
import { UserCreate } from "./user-create/UserCreate"


export const UserList = () => {

    // // state if user is selected
    // const [selectedUser, setSelectedUser] = useState(null) //for later logic wiith showing UserDetails
    // // state which action on user is selected
    // const [userAction, setUserAction] = useState(null);
    // BEST PRACTICE: do it in one object since logic is similar, several states scenario -> React sometimes batches them

    const [userAction, setUserAction] = useState({user: null, action: null})

    const [users, setUsers] = useState([]); // empty list so that .map() in UserList does not error
    useEffect(()=>{
        userService.getAll()
            .then(users => setUsers(users)) //the getAll() is async function -> wrapped in promise => resolve with then here
    },[])

    const userActionClickHandler = (userId, actionType) => { //comes by deafult in the specific child component, better with .bind(), tho
        userService.getOne(userId)
            .then(user => {
                setUserAction({
                    user, action: actionType
                });
            }) //This is not race condition! IT IS RESOLVING PROMISE
    }

    const createUserOpenHandler = () => {
        setUserAction({
            action: UserActions.Add
        });
    }

    const closeClickHandler = () => {
        setUserAction({user: null, action: null})
    }

    const UserCreateHandler = (userData) => {
        // execute service with this new Object
        userService.create(userData)
            .then(user => {
                setUsers(oldUsers => [...oldUsers, user]); //state should always be modified to a new reference, thus, the array [], -...oldUsers- save them BUT, also -,user- add new one
                closeClickHandler();
            })
            .catch(err => {
                console.log(err);
            });
    }
    const UserEditHandler = (e) => {
        e.preventDefault() // onSubmit in form will trigger reload, in SPA we dont want page reload, so it is a rare instance in React that we manipualte the DOM, directly

        // store from form into variables
        const formData = new FormData(e.target)
        const {
            firstName,
            lastName,
            email,
            imageUrl,
            phoneNumber,
            ...address
        } = Object.fromEntries(formData);

        // create a new Object that adheres to server's validation rules that syncs with DB
        const userData = {
            firstName,
            lastName,
            email,
            imageUrl,
            phoneNumber,
            address,
        };

        // execute service with this new Object
        userService.edit(userAction.user._id, userData)
            .then(user => {
                setUsers(oldUsers => [...oldUsers, user]); //state should always be modified to a new reference, thus, the array [], -...oldUsers- save them BUT, also -,user- add new one
                closeClickHandler();
            });
    }

    return (
        <>
            <div className="table-wrapper">

            {/* overlapping components */}

                {userAction.action === UserActions.Details && 
                    <UserDetails 
                        user={userAction.user} 
                        onClose={closeClickHandler}
                    />
                }
                
                {userAction.action === UserActions.Edit && 
                    <UserEdit 
                        user={userAction.user} 
                        onClose={closeClickHandler}
                        onUserEdit={UserEditHandler}
                    />
                }

                {userAction.action === UserActions.Delete && 
                    <UserDelete 
                        user={userAction.user} 
                        onClose={closeClickHandler}
                    />
                }
                
                {userAction.action === UserActions.Add && 
                    <UserCreate
                        onClose={closeClickHandler}
                        onUserCreate={UserCreateHandler}
                    />
                }

                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Image
                            </th>
                            <th>
                                First name<svg aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down" className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Last name<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Email<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Phone<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Created
                                <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down" className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* remember KEY, also it is ...user because we are mapping */}
                        {users.map(user => 
                        // key is always on the top element inside {} of user => {}
                            <tr key={user._id}>
                                <UserItem  user={user} onActionClick={userActionClickHandler}/>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
            
            <button className="btn-add btn" onClick={createUserOpenHandler}>Add new user</button>
        </>
    )
}