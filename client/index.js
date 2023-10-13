import * as mqtt from "mqtt";

class MQTTS {
  constructor() {
    this.conn = mqtt.connect();
  }

  disconnect() {
    // close
    if (this.conn) this.conn.end();
  }

  sendMessage(topic, message) {
    // subscribe publish
    const client = this.conn;
    if (client) {
      client.subscribe(topic, (err) => {
        if (err) {
          throw Error("Topic Erro");
        }

        return client.publish(topic, message);
      });

      client.subscribe(topic, { qos: 1 }, (err) => {
        if (err) {
          throw Error("Topic Erro");
        }

        return client.publish(topic, message, { qos: 1 });
      });
    }
  }

  receiveMessage() {
    // Receive
    const client = this.conn;
    if (client) {
      client.on("message", (topic, message, packet) => {
        console.log("------------------------------------");
        console.log({
          topic: topic,
          message: message.toString(),
          packet: packet,
        });
        console.log("------------------------------------");

        // this.disconnect();
      });
    }
  }
}

const mqtts = new MQTTS();
mqtts.receiveMessage();

setTimeout(() => {
  mqtts.sendMessage("chat/message", "Hello MQTT Message");
}, 1000);
