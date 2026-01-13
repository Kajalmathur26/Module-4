# Node.js Architecture

Node.js follows an **event-driven and non-blocking architecture**. Even though JavaScript runs on a single main thread, Node.js can handle many requests at the same time using asynchronous execution.

The main components of Node.js architecture are:

* JavaScript Engine (V8)
* Node.js Core APIs
* Native Bindings
* Event Loop
* libuv
* Thread Pool and Worker Threads

All these parts work together to make Node.js fast, efficient, and scalable.

---

## JavaScript Engine (V8)

* V8 is the JavaScript engine developed by Google.
* Node.js uses V8 to execute JavaScript code outside the browser.
* V8 converts JavaScript into machine-level code, which improves performance.
* It also handles memory management and garbage collection.

In simple terms, **V8 is responsible for running JavaScript code in Node.js**.

---

## Node.js Core APIs

* Core APIs are built-in modules provided by Node.js.
* They allow developers to perform common tasks such as:

  * File handling
  * Creating web servers
  * Managing paths and URLs
  * Performing encryption and decryption
* Examples include `fs`, `http`, `path`, `crypto`, and `timers`.

These APIs make it possible to interact with the operating system using JavaScript.

---

## Native Bindings

* Native bindings connect JavaScript code with low-level C/C++ code.
* Some operations are either too slow or not possible using JavaScript alone.
* Node.js uses native bindings to access system-level features like:

  * File system
  * Networking
  * Cryptography

Native bindings act as a **bridge between JavaScript and the operating system**.

---

## Event Loop

* The event loop is the core mechanism of Node.js.
* It allows Node.js to perform non-blocking operations.
* The event loop continuously checks:

  * Whether asynchronous tasks are completed
  * Whether callbacks are ready to be executed
* When a task is ready, it is pushed to the call stack.

Even though Node.js uses a single thread, the event loop enables it to handle multiple tasks efficiently.

---

## libuv

### What is libuv?

* libuv is a low-level C library used internally by Node.js.
* It provides support for asynchronous input/output operations.
* It works across different platforms such as Windows, Linux, and macOS.

---

### Why Node.js needs libuv

* JavaScript does not have direct access to operating system features.
* libuv handles interaction with the OS.
* It ensures that tasks like file access and networking do not block the main thread.

Without libuv, Node.js would not be able to support non-blocking behavior.

---

### Responsibilities of libuv

* Managing the event loop
* Handling asynchronous I/O operations
* Managing timers
* Handling network requests
* Maintaining the thread pool

---

## Thread Pool

### What is a Thread Pool?

* A thread pool is a group of background threads.
* By default, Node.js has **four threads** in the thread pool.
* These threads are managed by libuv.

---

### Why Node.js uses a Thread Pool

* Some operations cannot be handled asynchronously by the operating system.
* Running such tasks on the main thread would block the event loop.
* The thread pool allows these operations to run in the background.

This keeps the application responsive.

---

### Operations handled by the Thread Pool

* File system operations
* Cryptographic calculations
* Compression and decompression
* DNS lookups

These tasks run in background threads and return results through callbacks or promises.

---

## Worker Threads

### What are Worker Threads?

* Worker threads allow JavaScript code to run on multiple threads.
* Each worker thread has:

  * Its own event loop
  * Separate memory space
* Communication between threads happens using message passing.

---

### Why are Worker Threads needed?

* CPU-intensive tasks can block the main thread.
* Examples include heavy calculations and data processing.
* Worker threads move such tasks away from the main thread.

This improves performance for computation-heavy applications.

---

### Difference between Thread Pool and Worker Threads

| Thread Pool                | Worker Threads               |
| -------------------------- | ---------------------------- |
| Used internally by Node.js | Used directly by developers  |
| Executes native C/C++ code | Executes JavaScript code     |
| Limited control            | Full control                 |
| Shared pool of threads     | Separate threads             |
| Used for I/O-related tasks | Used for CPU-intensive tasks |

---

## Event Loop Queues

The event loop processes tasks using different queues based on their priority.

---

### Macro Task Queue

* Contains tasks that are executed in future event loop cycles.
* Examples:

  * `setTimeout`
  * `setInterval`
  * `setImmediate`
  * I/O callbacks

---

### Micro Task Queue

* Contains tasks that must be executed immediately after the current code finishes.
* Has higher priority than the macro task queue.
* Examples:

  * Promise callbacks (`then`, `catch`)
  * `queueMicrotask`
  * `process.nextTick`

---

### Execution Priority

1. Currently running JavaScript code
2. Micro task queue
3. Macro task queue
4. Next event loop cycle

Micro tasks are always executed before macro tasks.

---

### Examples of Tasks

**Micro Task Example**

```js
Promise.resolve().then(() => {
  console.log("Micro task");
});
```

**Macro Task Example**

```js
setTimeout(() => {
  console.log("Macro task");
}, 0);
```

**Output**

```
Micro task
Macro task
```

---

## Conclusion

* Node.js uses V8 to execute JavaScript code
* Core APIs provide essential system functionality
* Native bindings connect JavaScript with system-level code
* The event loop manages asynchronous execution
* libuv handles OS-level asynchronous operations
* The thread pool manages blocking native tasks
* Worker threads handle CPU-intensive JavaScript work
* Micro tasks always have higher priority than macro tasks
