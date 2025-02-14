const olivine_metadata = {
  name: 'Olivine',
  key: 'vehicle',
  measurements: [
    {
      name: 'Chamber Pressure',
      key: 'chamber.pressure',
      topic: 'telemetry/chamber/pressure',
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
      name: 'Chamber Temperature',
      key: 'chamber.temperature',
      topic: 'telemetry/chamber/temperature',
      values: [
        {
          key: 'value',
          name: 'Temperature',
          format: 'float',
          unit: 'C',
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
      name: 'Supply Pressure',
      key: 'supply.pressure',
      topic: 'telemetry/supply/pressure',
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
      name: 'Tank Fuel Pressure',
      key: 'fuel.pressure',
      topic: 'telemetry/tank/fuel/pressure',
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
      name: 'Tank Oxidizer Pressure',
      key: 'oxidizer.pressure',
      topic: 'telemetry/tank/oxidizer/pressure',
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
      name: 'Tank Vent Temperature',
      key: 'vent.temperature',
      topic: 'telemetry/tank/vent/temprerature',
      values: [
        {
          key: 'value',
          name: 'Temperature',
          format: 'float',
          unit: 'C',
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
      name: 'Tank Weight 1',
      key: 'weight.1',
      topic: 'telemetry/tank/weight/1',
      values: [
        {
          key: 'value',
          name: 'Weight',
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
      name: 'Tank Weight 2',
      key: 'weight.2',
      topic: 'telemetry/tank/weight/2',
      values: [
        {
          key: 'value',
          name: 'Weight',
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
      name: 'Tank Weight 3',
      key: 'weight.3',
      topic: 'telemetry/tank/weight/3',
      values: [
        {
          key: 'value',
          name: 'Weight',
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
      name: 'Tank Weight 4',
      key: 'weight.4',
      topic: 'telemetry/tank/weight/4',
      values: [
        {
          key: 'value',
          name: 'Weight',
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
      name: 'Thrust',
      key: 'thrust',
      topic: 'telemetry/thrust',
      values: [
        {
          key: 'value',
          name: 'Thrust',
          format: 'float',
          unit: 'N',
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
          key: 'parameters',
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
        name: olivine_metadata.name,
        type: 'folder',
        location: 'ROOT'
      });
    } else {
      const measurement = olivine_metadata.measurements.filter((m) => m.key === identifier.key)[0];
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
      olivine_metadata.measurements.map((m) => {
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
