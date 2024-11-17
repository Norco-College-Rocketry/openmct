import MQTT from 'paho-mqtt';

const data = {
  name: 'Olivine',
  key: 'vehicle',
  measurements: [
    {
      name: 'Injector Temperature',
      key: 'injector.temperature',
      topic: 'temperature/injector',
      values: [
        {
          key: 'value',
          name: 'Value',
          format: 'float',
          unit: 'F',
          hints: {
            range: 1
          }
        },
        {
          key: 'utc',
          source: 'timestamp',
          name: 'Timestamp',
          format: 'utc',
          hints: {
            domain: 1
          }
        }
      ]
    }
  ]
};
let topics = {};

let client = new MQTT.Client(location.hostname, 8081, 'clientId');

client.onConnectionLost = function (response) {
  console.log('Disconnected from broker: ' + response.errorMessage);
};
client.onMessageArrived = function (message) {
  // Adapt as an OpenMCT domain object
  let datum = JSON.parse(message.payloadString);
  datum.unit = datum.units;
  datum.identifier = { namespace: 'ncr.taxonomy', key: topics[message.topic].key };
  datum.timestamp = parseFloat(datum.timestamp) * 1000;
  delete datum.units;

  for (const callback of topics[message.topic].callbacks) {
    callback(datum);
  }
};
function onConnect() {
  console.log('Connected to MQTT broker.');
  for (const topic in topics) {
    client.subscribe(topic);
  }
}

const telemetryProvider = {
  supportsSubscribe: (domainObject, callback, options) => domainObject.type === 'ncr.mqtt',
  subscribe: (domainObject, callback, options) => {
    for (const topic in topics) {
      if (topics[topic].key === domainObject.identifier.key) {
        console.log('Subscribing to ' + topic + ' with key ' + domainObject.identifier.key);

        topics[topic].callbacks.add(callback);

        return function unsubscribe() {
          // TODO map to subscribers instead of topics/multiple subscribers per topic
          topics[topic].callbacks.delete(callback);
        };
      }
    }
  }
};

const objectProvider = {
  get: (identifier) => {
    if (identifier.key === 'vehicle') {
      return Promise.resolve({
        identifier: identifier,
        name: data.name,
        type: 'folder',
        location: 'ROOT'
      });
    } else {
      const measurement = data.measurements.filter((m) => m.key === identifier.key)[0];
      return Promise.resolve({
        identifier: identifier,
        name: measurement.name,
        type: 'ncr.mqtt',
        telemetry: { values: measurement.values },
        location: 'ncr.taxonomy:vehicle'
      });
    }
  }
};

const compositionProvider = {
  appliesTo: (domainObject) => domainObject.identifier.namespace === 'ncr.taxonomy' && domainObject.type === 'folder',
  load: (domainObject) =>
    Promise.resolve(
      data.measurements.map((m) => {
        return {
          namespace: 'ncr.taxonomy',
          key: m.key
        };
      })
    )
};

export default function (options) {
  for (const m of data.measurements) {
    topics[m.topic] = { key: m.key, callbacks: new Set() };
    console.log('Registered topic: ' + m.topic + ', ' + topics[m.topic].key);
  }

  client.connect({ onSuccess: onConnect });

  return function install(openmct) {
    console.log('Installing MQTT plugin...');

    openmct.objects.addRoot({
      namespace: 'ncr.taxonomy',
      key: 'vehicle'
    });
    openmct.objects.addProvider('ncr.taxonomy', objectProvider);
    openmct.composition.addProvider(compositionProvider);
    openmct.telemetry.addProvider(telemetryProvider);

    openmct.types.addType('ncr.mqtt', {
      name: 'MQTT message',
      description: 'Data transmitted over MQTT.',
      cssClass: 'icon-telemetry'
    });

    console.log('MQTT plugin installed.');
  };
}
