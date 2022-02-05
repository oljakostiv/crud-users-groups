import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import { useToasts } from 'react-toast-notifications';
import {Context} from "../../index";
import {fetchOneUser, updateUser} from "../../http/userAPI";

const EditUser = observer(({show, onHide, userId}) => {
    const {store} = useContext(Context);
    const { addToast } = useToasts();

    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [groupId, setGroupId] = useState(null);

    useEffect(() => {
        if (userId) {
            fetchOneUser(userId).then(data => {
                setName(data.name);
                setGroupId(data.groupId);
            }).catch(e => {
                onHide();
                addToast(e.response.data.message, { appearance: 'error', autoDismiss: true });
            });
        }
    }, [userId]);

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const saveUser = () => {
        const formData = new FormData();

        formData.append('name', name);
        formData.append('img', file);
        formData.append('groupId', groupId);

        updateUser(userId, formData).then(() => onHide());
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit:
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
                <Button variant={"outline-success"} onClick={saveUser}>Save</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
});

export default EditUser;
