
let socket = null;
let logBox = null;

let scheme = window.location.protocol == 'https:' ? 'wss://' : 'ws://';
let defaultAddress = scheme + window.location.host + '/chat/echo';


function addToLog(log) {
  logBox.innerHTML += log + "<br/>"
}

function connect() {
    let url = defaultAddress;
    let protocols = 0;

  if ('WebSocket' in window) {
    if (protocols) {
      socket = new WebSocket(url, protocols);
    } else {
      socket = new WebSocket(url);
    }
  } else {
   return;
  }

  socket.onopen = function () {
    let extraInfo = [];
    if (('protocol' in socket) && socket.protocol) {
      extraInfo.push('protocol = ' + socket.protocol);
    }
    if (('extensions' in socket) && socket.extensions) {
      extraInfo.push('extensions = ' + socket.extensions);
    }

    let logMessage = 'Opened';
    if (extraInfo.length > 0) {
      logMessage += ' (' + extraInfo.join(', ') + ')';
    }
    addToLog(logMessage);
    heartCheck.reset().start();
  };
  socket.onmessage = function (event) {
    if (('ArrayBuffer' in window) && (event.data instanceof ArrayBuffer)) {
      addToLog('< Received an ArrayBuffer of ' + event.data.byteLength +
               ' bytes')
    } else if (('Blob' in window) && (event.data instanceof Blob)) {
      addToLog('< Received a Blob of ' + event.data.size + ' bytes')
    } else {
      addToLog('< ' + event.data);
      heartCheck.reset().start();
    }
  };
  socket.onerror = function () {
    addToLog('Error');
  };
  socket.onclose = function (event) {
    let logMessage = 'Closed (';
    if ((arguments.length == 1) && ('CloseEvent' in window) &&
        (event instanceof CloseEvent)) {
      logMessage += 'wasClean = ' + event.wasClean;

      if ('code' in event) {
        logMessage += ', code = ' + event.code;
      }
      if ('reason' in event) {
        logMessage += ', reason = ' + event.reason;
      }

    } else {
      logMessage += 'CloseEvent is not available';
    }
    addToLog(logMessage + ')');
  };

  if (protocols) {
    addToLog('Connect ' + url + ' (protocols = ' + protocols + ')');
  } else {
    // addToLog('Connect ' + url);
  }

let heartCheck = {
  timeout: 550, //9min
  serverTimeoutObj: null,
  reset: function(){
            clearTimeout(this.serverTimeoutObj);
            return this;
        },
  start: function(){
      this.serverTimeoutObj = setInterval(function(){
          if(socket.readyState == 1){
              socket.send("ping");
              heartCheck.reset().start();    //
          }else{
              // connect();
          }
      }, this.timeout)
  }
}
}



function ws_init() {

    logBox = document.getElementById("loading-text");
    if (!('WebSocket' in window)) {
        addToLog(defaultAddress);
    }
    connect();
}
