import React from 'react';
import {Button, Card, Col} from "react-bootstrap";
import moment from 'moment';
import {useToasts} from 'react-toast-notifications';
import {removeGroup} from "../http/userAPI";

const removeGroupById = async (id, addToast, onUpdateGroups) => {
    try {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Do you really want to delete?')) {
            await removeGroup(id);
            addToast('Deleted Successfully', {appearance: 'success', autoDismiss: true});
            onUpdateGroups();
        }
    } catch (e) {
        addToast(e.response.data.message, {appearance: 'error', autoDismiss: true});
    }
}

const GroupItem = ({group, onEdit, onUpdateGroups}) => {
    const {addToast} = useToasts();
    const createdAt = moment(group.createdAt).format('LLL');
    const updatedAt = moment(group.updatedAt).format('LLL');

    return (
        <Col md={4} className='mt-4'>
            <Card style={{width: 180, minHeight: 200, cursor: 'pointer', border: '3px solid lightgray'}}>
                <div className='mt-1 d-flex justify-content-center align-items-center flex-column'>
                    <div style={{fontSize: 20}}>{group.name}</div>
                    <div
                        className='text-black-50 p-2'
                        style={{fontSize: 15, fontStyle: 'italic'}}
                    >
                        {group.description}
                    </div>
                </div>
                <small
                    className='text-black-50 mb-1'
                    style={{fontSize: 10, marginLeft: 3}}
                >
                    Created: {createdAt}
                </small>
                <small
                    className='text-black-50 mb-1'
                    style={{fontSize: 10, marginLeft: 3}}
                >
                    Updated: {updatedAt}
                </small>
                <div className='mt-2 mb-2 d-flex align-items-center justify-content-around'>
                    <Button
                        onClick={() => onEdit(group.id)}
                        variant={"success"}
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => removeGroupById(group.id, addToast, onUpdateGroups)}
                        variant={"danger"}
                    >
                        Delete
                    </Button>
                </div>
            </Card>
        </Col>
    );
};

export default GroupItem;
