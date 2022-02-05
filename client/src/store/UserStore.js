import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._users = [];
        this._groups = [];
        this._selectedGroup = {};
        this._page = 1;
        this._totalCount = 0;
        this._limit = 4;

        makeAutoObservable(this);
    };

    setUsers(users) {
        this._users = users;
    };

    setGroups(groups) {
        this._groups = groups;
    };

    setSelectedGroup(group) {
        this.setPage(1);
        this._selectedGroup = group;
    };

    setPage(page) {
        this._page = page;
    };

    setTotalCount(count) {
        this._totalCount = count;
    };

    get users() {
        return this._users;
    };

    get groups() {
        return this._groups;
    };

    get selectedGroup() {
        return this._selectedGroup;
    };

    get page() {
        return this._page;
    };

    get totalCount() {
        return this._totalCount;
    };

    get limit() {
        return this._limit;
    };
}
