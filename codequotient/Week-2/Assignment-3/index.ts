import { EventEmitter } from "events"
import { testListener } from "./listener.js";

class MyEmmiter extends EventEmitter {}

const myEmmiter = new MyEmmiter();

myEmmiter.on('test', testListener);

setTimeout(() => {
    myEmmiter.emit('test', "hello from emmiter");
}, 2000);
