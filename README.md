# Take home
I've tried to follow the spec and believe I've handled the everything required, I'm used to using different names for some things but hopefully it is all clear enough.

There some tradeoffs I've outlined in comments and also some that I have not. Let me know if you would like to know more about certain decisions and I'm always happy to discuss. (I did think a bit about a few of them but also balanced with not wanting to spend 5 hours on this).

Most of the funciotnality is exposed in tests, I have also included a dummy example in the main file to show how you could call it. (In a real scenario there would be an additional api or cli module that was setup in main and then consumed the handlers.)

I elected to run this as a single app instance, in production I've often ran the read model (projector/query handler) as a seperate app instance which works quite well but thought it was a bit beyond this excersise (But would love to discuss the benefits of these approaches)

## Setup

### Requirements

It has been tested with node v22.17.1 and npm v8.11.0

### Get Started

```zsh
npm install

# test
npm run test

# type checking

npm run type-check

# building
npm run build

# running
npm run start
```
