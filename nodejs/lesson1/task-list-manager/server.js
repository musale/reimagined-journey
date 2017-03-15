const EventEmitter = require('events');

class Server extends EventEmitter {
    constructor(client) {
        super();
        this.tasks = {};
        this.taskId = 1;
        process.nextTick(() => {
            this.emit('response', 'Type a command');
        });
        client.on('command', (command, args) => {
            switch (command) {
                case 'help':
                case 'add':
                case 'ls':
                case 'delete':
                    this[command](args);
                    break;
                default:
                    this.emit('response', 'Unknown command')
            }
        });
    }

    tasksToString(){
        return Object.keys(this.tasks).map(key => {
            return `${key}: ${this.tasks[key]}`;
        }).join('\n');
    }

    help() {
        this.emit('response', `Commands:
            add - add a task
            ls - list all tasks
            delete <id> - delete a task of given id`)
    }
    add(args) {
        let task = args.join(' ');
        this.tasks[this.taskId] = task;
        this.emit('response', `Added a task: ${task}`);
        this.taskId++;
    }
    ls() {
        this.emit('response', `TASKA: \n${this.tasksToString()}`)
    }
    delete(args) {
        let id = args[0];
        delete(this.tasks[id]);
        this.emit('response', `Deleted task ${id}`);
    }
}

module.exports = (client) => new Server(client);
