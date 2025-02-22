import { InfluxDB } from '@influxdata/influxdb-client';

// TODO make these settings environment variables
const url = location.origin.replace(location.port, '8086');
const api_key =
  'p51TyZBdN8xZqPF5lHIwfLZhxvU0SDMKShoB6jh1eCmncyaD7coVOaz-CzAuIf2R0ORVeNLP4EWFzAZfeCZcwA==';
const org = '729f7d55908a096c';
const client = new InfluxDB({ url: url, token: api_key });
const bucket = 'olivine';
const queryApi = client.getQueryApi(org);

let influxProvider = {
  supportsRequest: (domainObject, options) => !domainObject.telemetry.no_influx ?? true,
  request: (domainObject, options) => {
    const splits = domainObject.identifier.key.split('.');
    // floor'd and ceil'd becuase range() can't take floating point timestamps. See https://docs.influxdata.com/flux/v0/stdlib/universe/range/
    const query = `from(bucket: "${bucket}")
      |> range(start: ${Math.floor(options.start)}, stop: ${Math.ceil(options.end)})
      |> filter(fn: (r) => r["_measurement"] == "sitl")
      |> filter(fn: (r) => r["location"] == "${splits[0]}")
      |> filter(fn: (r) => r["_field"] == "${splits[1]}")`;
    return queryApi.collectRows(query, (values, tableMeta) => {
      const o = tableMeta.toObject(values);
      return {
        identifier: domainObject.identifier,
        value: o._value,
        timestamp: o._time
      };
    });
  }
};

export default function (options) {
  return function install(openmct) {
    openmct.telemetry.addProvider(influxProvider);
  };
}
