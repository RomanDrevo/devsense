export default class Data {
    constructor(data) {
        Object.assign(this, data);
    }

    static reconstituteFrom(json) {

        const state = {
            children: json['children'],
            label: json['label'],
            type: json['type'],
            // userId: json['userId'],
            // phone: json['phone'],
            // website: json['website'],
            // company: json['company'],
            // image: json['image_url']

        };
        return new Data(state);
    }
}