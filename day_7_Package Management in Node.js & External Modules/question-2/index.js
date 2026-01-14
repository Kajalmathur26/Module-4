const boxen = require('boxen');

const message = "I am using my first external module!";
const title = "Hurray!!!";

console.log(boxen(message, {
    title: title,
    padding: 0,
    borderStyle: 'classic'
}));

console.log(boxen(message, {
    title: title,
    padding: 0,
    borderStyle: 'doubleSingle'
}));

console.log(boxen(message, {
    title: title,
    padding: 0,
    borderStyle: 'round'
}));