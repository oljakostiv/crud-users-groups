import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Row} from "react-bootstrap";
import {Context} from "../index";
import UserItem from "./UserItem";
import EditUser from "./modals/EditUser";

const UserList = observer(() => {
    const {store} = useContext(Context);
    const [userVisible, setUserVisible] = useState(false);
    const [userId, setUserId] = useState(null);

    const onEdit = (id) => {
        setUserVisible(true);
        setUserId(id);
    };

    const onUpdateUsers = () => {
        store.refreshUsers();
    };

    return (
        <Row>
            {
                store.users.map(user => {
                        return (
                            <UserItem key={user.id} user={user} onEdit={onEdit} onUpdateUsers={onUpdateUsers} />
                        )
                    }
                )
            }

            <EditUser
                show={userVisible}
                onHide={() => setUserVisible(false)}
                userId={userId}
            />
        </Row>
    )
});


export default UserList;
