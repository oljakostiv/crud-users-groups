import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {useToasts} from 'react-toast-notifications';
import {Context} from "../../index";
import {createUser, fetchGroups} from "../../http/userAPI";

const CreateUser = observer(({show, onHide}) => {
    const {store} = useContext(Context);
    const {addToast} = useToasts();

    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [groupId, setGroupId] = useState((store.groups[0] && store.groups[0].id) || null);

    useEffect(() => {
        fetchGroups().then(data => {
            store.setGroups(data)
        })
    }, []);

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const addUser = () => {
        const formData = new FormData();

        formData.append('name', name);
        formData.append('img', file);
        formData.append('groupId', groupId);

        createUser(formData).then(() => {
            onHide();
            addToast('Created Successfully', {appearance: 'success', autoDismiss: true});
        }).catch(e => addToast(e.response.data.message, {appearance: 'error', autoDismiss: true}))
            .finally(() => store.refreshUsers());
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new user:
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Dropdown
                        onSelect={(groupId) => {
                            setGroupId(groupId)
                        }}
                    >
                        Group:
                        <Dropdown.Toggle
                            variant={"outline-dark"}
                            style={{marginLeft: 10}}
                        >
                            {
                                (groupId && store.groups.find(v => v.id === Number(groupId)).name) || 'select'
                            }
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                store.groups.map((group) =>
                                    <Dropdown.Item key={group.id} eventKey={group.id}>
                                        {group.name}
                                    </Dropdown.Item>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control
                        className='mt-3'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder='Enter name'
                    />
                    <hr/>
                    <Form.Control
                        className='mt-3'
                        type='file'
                        onChange={selectFile}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant={"outline-success"} onClick={addUser}>Add</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateUser;
