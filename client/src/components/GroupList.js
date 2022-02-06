import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Row} from "react-bootstrap";
import {Context} from "../index";
import GroupItem from "./GroupItem";
import EditGroup from "./modals/EditGroup";

const GroupList = observer(() => {
    const {store} = useContext(Context);
    const [groupVisible, setGroupVisible] = useState(false);
    const [groupId, setGroupId] = useState(null);

    const onEdit = (id) => {
        setGroupVisible(true);
        setGroupId(id);
    };

    const onUpdateGroups = () => {
        store.refreshGroups();
    };

    return (
        <Row>
            {
                store.groups.map(group =>
                    <GroupItem key={group.id} group={group} onEdit={onEdit} onUpdateGroups={onUpdateGroups}/>
                )
            }
            <EditGroup
                show={groupVisible}
                onHide={() => setGroupVisible(false)}
                groupId={groupId}
            />
        </Row>
    );
});

export default GroupList;
