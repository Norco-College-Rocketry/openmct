import { InfluxDB } from '@influxdata/influxdb-client';

// TODO make these settings environment variables
const url = location.origin.replace(location.port, '8086');
const api_key =
  'OUtmOTO1jlUUrYyY0LnnwA6HzYB6I28v_CJY_s92dsRB-_RfQ57S9RuJRn3NGTo1DzyTmQMK3mxoThAJhLkLpg==';
const org = 'a21246dfbe93707a';
const client = new InfluxDB({ url: url, token: api_key });
const bucket = 'valkyrie';
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
