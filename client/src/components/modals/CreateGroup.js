import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Form, Modal} from "react-bootstrap";
import {useToasts} from 'react-toast-notifications';
import {createGroup} from "../../http/userAPI";
import {Context} from "../../index";

const CreateGroup = observer(({show, onHide}) => {
    const {store} = useContext(Context);
    const {addToast} = useToasts();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const addGroup = () => {
        createGroup({name, description}).then(() => {
            setName('');
            setDescription('');
            onHide();
            addToast('Created Successfully', {appearance: 'success', autoDismiss: true});
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
                    Add new group:
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
                <Button variant={"outline-success"} onClick={addGroup}>Add</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateGroup;
