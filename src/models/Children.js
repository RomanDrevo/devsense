export default class Children {
    constructor(data) {
        Object.assign(this, data);
    }

    static reconstituteFrom(json) {

        const state = {
            children: json['children'],
        };
        return new Children(state);
    }
}