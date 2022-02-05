import React from 'react';
import {Button, Card, Col} from "react-bootstrap";

const GroupItem = ({group}) => {
    return (
        <Col md={4} className='mt-4'>
            <Card style={{width: 180, cursor: 'pointer', border: '3px solid lightgray'}}>

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
                    style={{fontSize: 11, marginLeft: 3}}
                >
                    Created: {group.createdAd}
                </small>

                <div className='mt-2 mb-2 d-flex align-items-center justify-content-around'>
                    <Button
                        onClick={() => {
                        }}
                        variant={"success"}
                    >
                        Edit
                    </Button>

                    <Button
                        onClick={() => {
                        }}
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
