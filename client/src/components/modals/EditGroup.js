import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Form, Modal} from "react-bootstrap";
import {useToasts} from 'react-toast-notifications';
import {fetchOneGroup, updateGroup} from "../../http/userAPI";
import {Context} from "../../index";

const EditGroup = observer(({show, onHide, groupId}) => {
    const {store} = useContext(Context);
    const {addToast} = useToasts();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (groupId) {
            fetchOneGroup(groupId).then(data => {
                setName(data.name);
                setDescription(data.description || '');
            }).catch(e => {
                onHide();
                addToast(e.response.data.message, {appearance: 'error', autoDismiss: true});
            });
        }
    }, [groupId]);

    const saveGroup = () => {
        updateGroup(groupId, {name, description}).then(() => {
            onHide();
            addToast('Updated Successfully', {appearance: 'success', autoDismiss: true});
        }).catch(e => addToast(e.response.data.message, {appearance: 'error', autoDismiss: true}))
        .finally(() => store.refreshGroups());
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className='mt-3'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder='Enter name'
                    />
                    <Form.Control
                        className='mt-3'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder='Enter description'
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={saveGroup}>Save</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default EditGroup;
