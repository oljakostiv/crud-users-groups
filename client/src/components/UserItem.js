import React from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import {useToasts} from 'react-toast-notifications';
import moment from 'moment';
import {removeUser} from "../http/userAPI";

const removeUserById = async (id, addToast, onUpdateUsers) => {
    try {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Do you really want to delete?')) {
            await removeUser(id);
            addToast('Deleted Successfully', {appearance: 'success', autoDismiss: true});
            onUpdateUsers();
        }
    } catch (e) {
        addToast(e.response.data.message, {appearance: 'error', autoDismiss: true});
    }
}

const UserItem = ({user, onEdit, onUpdateUsers}) => {
    const {addToast} = useToasts();
    const createdAt = moment(user.createdAt).format('LLL');
    const updatedAt = moment(user.updatedAt).format('LLL');

    return (
        <Col md={3} className='mt-3'>
            <Card style={{width: 160, cursor: 'pointer'}} border={"light"}>
                <Image
                    src={'http://localhost:5000/' + user.img}
                    width={160}
                    height={160}
                />
                <div className='text-black-50 mt-1 d-flex justify-content-center align-items-center'>
                    <div style={{fontSize: 20}}>{user.name}</div>
                </div>
                <small
                    className='text-black-50 mb-1'
                    style={{fontSize: 11, marginLeft: 3}}
                >
                    Created: {createdAt}
                </small>
                <small
                    className='text-black-50 mb-1'
                    style={{fontSize: 11, marginLeft: 3}}
                >
                    Updated: {updatedAt}
                </small>
                <div className='mb-2 mt-2 d-flex align-items-center justify-content-around'>
                    <Button
                        onClick={() => onEdit(user.id)}
                        variant={"outline-success"}
                        size="sm"
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => removeUserById(user.id, addToast, onUpdateUsers)}
                        variant={"outline-danger"}
                        size="sm"
                    >
                        Delete
                    </Button>
                </div>
            </Card>
        </Col>
    )
};

export default UserItem;
