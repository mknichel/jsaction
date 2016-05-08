# JsAction

NOTE: This is a fork of google/jsaction with steps to build the contract and
dispatcher JS binaries for easy use in other applications.

See https://github.com/google/jsaction for information on the project.

## Using jsaction

This project contains 2 binaries that jsaction users would use:

*  dist/contract.min.js - This file captures events from the page. If the
   dispatcher is not installed yet, it queues the events until the dispatcher is
   ready to receive events.
*  dist/dispatcher.min.js - This file takes events queued by the contract and
   dispatches them to the correct handler. The dispatcher in this example is
   simple, but more sophisticated dispatchers that could be created to late load
   handlers only when the user interacts with a part of the page that uses that
   handler, for example.

A simple example HTML file using jsaction would look like:

```
<body data-jsaction-events="click">
  <!-- This captures and queues events before the dispatcher is loaded. -->
  <script src="dist/contract.min.js"></script>

  <!-- On any click within this element, this will invoke example.sayHello -->
  <div jsaction="click:example.sayHello">Hello <span>World</span></div>

  <!-- The dispatcher dispatches queued events to the right place. -->
  <script src="dist/dispatcher.min.js"></script>
  <!-- Register a handler for the sayHello action -->
  <script>
    jsaction.register('example.sayHello', function(e) {
      console.log('Hello! Handling event: ' + e);
    });
  </script>
</body>
```

The removal of the need to manually register event handlers can simplify a
project, especially as it gets larger. Additionally, jsaction can also make it
easy to late-load handlers only when the user actually interacts with a part
of the page that needs the code.

## Building jsaction

If using this project to rebuild jsaction, follow these steps:

1.  `git clone https://github.com/mknichel/jsaction.git`
2.  `npm install` installs Closure Library and Closure Compiler dependencies
3.  `gulp` builds the contract and dispatcher binaries
