import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Row, Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import GroupBar from "../components/GroupBar";
import UserList from "../components/UserList";
import CreateUser from "../components/modals/CreateUser";
import {Context} from "../index";
import {fetchGroups, fetchUsers} from "../http/userAPI";
import Pages from "../components/Pages";

const UsersPage = observer(() => {
    const {store} = useContext(Context);
    const [userVisible, setUserVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers(null, 1, 4).then(data => {
            store.setUsers(data.rows);
            store.setTotalCount(data.count);
        });

        fetchGroups().then(data => {
            store.setGroups(data);
        }).finally(() => setLoading(false));
    }, [store]);

    useEffect(() => {
        fetchUsers(store.selectedGroup.id, store.page, 4)
            .then(data => {
                store.setUsers(data.rows);
                store.setTotalCount(data.count);
            });
    }, [store.page, store.selectedGroup]);

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <Container>
            <Row>
                <Col className='mt-5' md={3}>
                    <h5>Select a group:</h5>
                    <GroupBar/>
                </Col>
                <Col md={9}>
                    <Button
                        onClick={() => setUserVisible(true)}
                        style={{margin: 10, cursor: 'pointer', width: 120, borderRadius: 20}}
                        variant={'secondary'}
                        className='mt-4 p-2'
                    >
                        ADD USER
                    </Button>
                    <UserList/>
                    <Pages/>
                </Col>
            </Row>
            <CreateUser
                show={userVisible}
                onHide={() => setUserVisible(false)}
            />
        </Container>
    );
});

export default UsersPage;
