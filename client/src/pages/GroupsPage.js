import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Row, Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import GroupList from "../components/GroupList";
import CreateGroup from "../components/modals/CreateGroup";
import {Context} from "../index";
import {fetchGroups} from "../http/userAPI";

const GroupsPage = observer(() => {
    const {store} = useContext(Context);
    const [groupVisible, setGroupVisible] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGroups().then(data => {
            store.setGroups(data);
        }).finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <Container>
            <Row>
                <Col className='mt-5' md={3}>
                    <Button
                        onClick={() => setGroupVisible(true)}
                        style={{margin: 10, cursor: 'pointer', width: 130, borderRadius: 20}}
                        variant={'secondary'}
                        className='mt-4 p-2'
                    >
                        ADD GROUP
                    </Button>
                </Col>
                <Col md={9}>
                    <GroupList/>
                </Col>
            </Row>
            <CreateGroup
                show={groupVisible}
                onHide={() => setGroupVisible(false)}
            />
        </Container>
    );
});

export default GroupsPage;
