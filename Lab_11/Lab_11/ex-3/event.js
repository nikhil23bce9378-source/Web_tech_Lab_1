const EventEmitter = require("events");

const emitter = new EventEmitter();

// Listener 1
emitter.on("greet", (name) => {
  console.log(`Hello ${name}`);
});

// Listener 2
emitter.on("greet", (name) => {
  console.log(`Welcome ${name}`);
});

// Emit event
emitter.emit("greet", "Karthik");