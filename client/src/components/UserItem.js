import React from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";

const UserItem = ({user, onEdit}) => (
    <Col md={3} className='mt-3'>
        <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
            <Image
                src={'http://localhost:5000/' + user.img}
                width={150}
                height={150}
            />
            <div className='text-black-50 mt-1 d-flex justify-content-center align-items-center'>
                <div style={{fontSize: 20}}>{user.name}</div>
            </div>
            <small
                className='text-black-50 mb-1'
                style={{fontSize: 11, marginLeft: 3}}
            >
                Created:{user.createdAd}
            </small>
            <div className='mb-2 d-flex align-items-center justify-content-around'>
                <Button
                    onClick={() => onEdit(user.id)}
                    variant={"outline-success"}
                    size="sm"
                >
                    Edit
                </Button>
                <Button
                    onClick={() => {}}
                    variant={"outline-danger"}
                    size="sm"
                >
                    Delete
                </Button>
            </div>
        </Card>
    </Col>
);

export default UserItem;
