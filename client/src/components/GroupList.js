import React, {useContext} from 'react';
import {Row} from "react-bootstrap";
import {Context} from "../index";
import GroupItem from "./GroupItem";

const GroupList = () => {
    const {store} = useContext(Context);

    return (
        <Row>
            {
                store.groups.map(group =>
                    <GroupItem key={group.id} group={group}/>
                )
            }
        </Row>
    );
};

export default GroupList;
