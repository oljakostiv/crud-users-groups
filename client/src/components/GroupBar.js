import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {ListGroup} from "react-bootstrap";
import {Context} from "../index";

const GroupBar = observer(() => {
    const {store} = useContext(Context);

    return (
        <ListGroup>
            {
                store.groups.map(group =>
                    <ListGroup.Item
                        action variant='light'
                        style={{cursor: 'pointer'}}
                        onClick={() => store.setSelectedGroup(group)}
                        active={group.id === store.selectedGroup.id}
                        key={group.id}
                    >
                        {group.name}
                    </ListGroup.Item>
                )
            }
        </ListGroup>
    );
});

export default GroupBar;
