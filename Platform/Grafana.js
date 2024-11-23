const Grafana = async (data, to, isGroup) => {
  // data = {
  //   "receiver": "test",
  //   "status": "firing",
  //   "alerts": [
  //     {
  //       "status": "firing",
  //       "labels": {
  //         "alertname": "TestAlert",
  //         "instance": "Grafana"
  //       },
  //       "annotations": {
  //         "summary": "Notification test"
  //       },
  //       "startsAt": "2024-11-23T20:11:21.56506215+07:00",
  //       "endsAt": "0001-01-01T00:00:00Z",
  //       "generatorURL": "",
  //       "fingerprint": "57c6d9296de2ad39",
  //       "silenceURL": "http://localhost:3000/alerting/silence/new?alertmanager=grafana&matcher=alertname%3DTestAlert&matcher=instance%3DGrafana",
  //       "dashboardURL": "",
  //       "panelURL": "",
  //       "values": null,
  //       "valueString": "[ metric='foo' labels={instance=bar} value=10 ]"
  //     }
  //   ],
  //   "groupLabels": {
  //     "alertname": "TestAlert",
  //     "instance": "Grafana"
  //   },
  //   "commonLabels": {
  //     "alertname": "TestAlert",
  //     "instance": "Grafana"
  //   },
  //   "commonAnnotations": {
  //     "summary": "Notification test"
  //   },
  //   "externalURL": "http://localhost:3000/",
  //   "version": "1",
  //   "groupKey": "test-57c6d9296de2ad39-1732367481",
  //   "truncatedAlerts": 0,
  //   "orgId": 1,
  //   "title": "{\"lasd\":\"asd\"}",
  //   "state": "alerting",
  //   "message": "**Firing**\n\nValue: [no value]\nLabels:\n - alertname = TestAlert\n - instance = Grafana\nAnnotations:\n - summary = Notification test\nSilence: http://localhost:3000/alerting/silence/new?alertmanager=grafana&matcher=alertname%3DTestAlert&matcher=instance%3DGrafana\n"
  // }
  //   body: ` 🚨 [Alerting] [GCP] DDB-KUBECLUSTER-DEV - HTTP Probe Failed 🚨
  //   - Alert :${data.commonLabels.alertname}
  //   - Grafana Folder: ${ data.commonLabels.instance }

  // `
  return new Promise(async (resolve, reject) => {
    try {
      console.log(isGroup);

      const results = {
        label: 'Grafana Alert',
        to: to,
        isGroup: isGroup == "true" ? true : false,
        body: data.message
      }
      resolve(results);
    } catch (error) {
      console.log(error);
      return {
        msg: error
      }

    }
  })
}
module.exports = { Grafana }