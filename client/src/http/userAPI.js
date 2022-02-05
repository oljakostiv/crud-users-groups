import {$host} from "./index";

export const createGroup = async (group) => {
    const {data} = await $host.post('api/groups', group);
    return data;
};

export const fetchGroups = async () => {
    const {data} = await $host.get('api/groups');
    return data;
};

export const fetchOneGroup = async (id) => {
    const {data} = await $host.get('api/groups/' + id);
    return data;
};

export const removeGroup = async (id) => {
    const {data} = await $host.delete('api/groups/' + id);
    return data;
};

export const updateGroup = async (id, group) => {
    const {data} = await $host.put('api/groups/' + id, group);
    return data;
};

export const createUser = async (user) => {
    const {data} = await $host.post('api/users', user);
    return data;
};

export const fetchUsers = async (groupId, page, limit = 6) => {
    const {data} = await $host.get('api/users', {
        params:
            {groupId, page, limit}
    });
    return data;
};

export const fetchOneUser = async (id) => {
    const {data} = await $host.get('api/users/' + id);
    return data;
};

export const removeUser = async (id) => {
    const {data} = await $host.delete('api/users/' + id);
    return data;
};

export const updateUser = async (id, user) => {
    const {data} = await $host.put('api/users/' + id, user);
    return data;
};
