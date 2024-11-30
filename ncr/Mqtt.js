import MQTT from 'paho-mqtt';
import { v4 as uuidv4 } from 'uuid';

let topics = {};

let client = new MQTT.Client(location.hostname, 8081, 'openmct_' + uuidv4());
client.connected = false;

client.onConnectionLost = function (response) {
  console.log('Disconnected from broker: ' + response.errorMessage);
  client.connected = false;
};
// TODO delegate callbacks
client.onMessageArrived = function (message) {
  // Adapt as an OpenMCT domain object
  let datum = JSON.parse(message.payloadString);
  datum.identifier = topics[message.topic].identifier;
  datum.timestamp = parseFloat(datum.timestamp);

  for (const callback of topics[message.topic].callbacks) {
    callback(datum);
  }
};
function onConnect() {
  console.log('Connected to MQTT broker.');
  client.connected = true;
  for (const topic in topics) {
    client.subscribe(topic);
  }
}

const telemetryProvider = {
  supportsSubscribe: function (domainObject, callback, options) {
    if (domainObject.telemetry?.topic) {
      topics[domainObject.telemetry.topic] ??= {
        identifier: {
          namespace: domainObject.namespace,
          key: domainObject.identifier.key
        },
        callbacks: new Set()
      };
      return true;
    }
    return false;
  },
  subscribe: (domainObject, callback, options) => {
    topics[domainObject.telemetry.topic].callbacks.add(callback);
    if (client.connected) {
      client.subscribe(domainObject.telemetry.topic);
    }

    return function unsubscribe() {
      topics[domainObject.telemetry.topic].callbacks.delete(callback);
    };
  }
};

export default function (options) {
  client.connect({ onSuccess: onConnect });

  return function install(openmct) {
    openmct.telemetry.addProvider(telemetryProvider);
  };
}
