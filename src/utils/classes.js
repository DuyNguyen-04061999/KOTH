class Player {
    constructor(id, username) {
        this.id = id;
        this.username = username;
        this.avatar = "";
        this.gold = 0;
        this.avatarpath = "";
        this.firstname = "";
        this.lastname = "";
        this.email = "";
        this.phone = "";
        this.dogecoinAddress = "";
        this.totalEarn = "";
    }

    static from(json) {
        return Object.assign(new Player(), json)
    }

    applyData(json) {
        Object.assign(this, json)
    }
}

export default Player