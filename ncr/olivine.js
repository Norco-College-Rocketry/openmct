const valkyrie_metadata = {
  name: 'Valkyrie',
  key: 'vehicle',
  measurements: [
    {
      name: 'Injector Temperature',
      key: 'injector.temperature',
      topic: 'telemetry/injector/temperature',
      values: [
        {
          key: 'value',
          name: 'Temperature',
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
    },
    {
      name: 'Injector Pressure',
      key: 'injector.pressure',
      topic: 'telemetry/injector/pressure',
      values: [
        {
          key: 'value',
          name: 'Pressure',
          format: 'float',
          unit: 'psi',
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
    },
    {
      name: 'Vent Temperature',
      key: 'vent.temperature',
      topic: 'telemetry/vent/temperature',
      values: [
        {
          key: 'value',
          name: 'Temperature',
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
    },
    {
      name: 'Chamber Temperature',
      key: 'chamber.temperature',
      topic: 'telemetry/chamber/temperature',
      values: [
        {
          key: 'value',
          name: 'Temperature',
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
    },
    {
      name: 'Tank Pressure',
      key: 'tank.pressure',
      topic: 'telemetry/tank/pressure',
      values: [
        {
          key: 'value',
          name: 'Pressure',
          format: 'float',
          unit: 'psi',
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
    },
    {
      name: 'Feed Pressure',
      key: 'feed.pressure',
      topic: 'telemetry/feed/pressure',
      values: [
        {
          key: 'value',
          name: 'Pressure',
          format: 'float',
          unit: 'psi',
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
    },
    {
      name: 'Load Cell 1',
      key: 'weight.1',
      topic: 'telemetry/weight/1',
      values: [
        {
          key: 'value',
          name: 'Weight/Thrust',
          format: 'float',
          unit: 'kg',
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
    },
    {
      name: 'Load Cell 2',
      key: 'weight.2',
      topic: 'telemetry/weight/2',
      values: [
        {
          key: 'value',
          name: 'Weight/Thrust',
          format: 'float',
          unit: 'kg',
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
    },
    {
      name: 'Command',
      key: 'command',
      topic: 'commands/#',
      no_influx: true,
      values: [
        {
          key: 'command',
          name: 'Command',
          format: 'string',
          hints: {
            range: 1
          }
        },
        {
          key: 'value',
          name: 'Parameters',
          format: 'string',
          hints: {
            range: 2
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
    },
    {
      name: 'Sine Wave',
      key: 'sinewave',
      topic: 'telemetry/sinewave',
      no_influx: true,
      values: [
        {
          key: 'value',
          name: 'Sine Wave',
          format: 'float',
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

const objectProvider = {
  get: (identifier) => {
    if (identifier.key === 'vehicle') {
      return Promise.resolve({
        identifier: identifier,
        name: valkyrie_metadata.name,
        type: 'folder',
        location: 'ROOT'
      });
    } else {
      const measurement = valkyrie_metadata.measurements.filter((m) => m.key === identifier.key)[0];
      return Promise.resolve({
        identifier: identifier,
        name: measurement.name,
        topic: measurement.topic,
        telemetry: {
          values: measurement.values,
          topic: measurement.topic
        },
        location: 'ncr:vehicle'
      });
    }
  }
};

const compositionProvider = {
  appliesTo: (domainObject) =>
    domainObject.identifier.namespace === 'ncr' && domainObject.type === 'folder',
  load: (domainObject) =>
    Promise.resolve(
      valkyrie_metadata.measurements.map((m) => {
        return {
          namespace: 'ncr',
          key: m.key
        };
      })
    )
};

export default function (options) {
  return function install(openmct) {
    openmct.objects.addRoot({
      namespace: 'ncr',
      key: 'vehicle'
    });
    openmct.objects.addProvider('ncr', objectProvider);
    openmct.composition.addProvider(compositionProvider);
  }
}
