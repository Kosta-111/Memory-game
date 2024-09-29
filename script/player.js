export class Player {
    constructor(name) {
        this.name = name;
        this.record = null;
        this.lastRes = null;
    }
    showInfo() {
        return `${this.name}! Your record: ${this.record == null ? 'no data' : this.record}, 
        Last result: ${this.lastRes == null ? 'no data' : this.lastRes}`;
    }
    
    static load(name) {
        let player = new Player(name);
        if (localStorage.getItem(name) != null)
        {
            var res = JSON.parse(localStorage.getItem(name));
            player.record = res.record;
            player.lastRes = res.lastRes;
        }
        return player;
    }
    
    save() {
        localStorage.setItem(this.name, JSON.stringify(this));
    }
}