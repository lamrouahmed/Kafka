import Kafka from "node-rdkafka";
import express from "express";
import cors from "cors";


const PORT = process.env.PORT || 3003;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var consumer = new Kafka.KafkaConsumer(
  {
    "group.id": "kafka",
    "metadata.broker.list": "localhost:9092",
  },
  {}
);

consumer.connect();

let result = [];
consumer
  .on("ready", () => {
    console.log("Consumer Ready...")
    consumer.subscribe(["test"]);
    consumer.consume();

  })
  .on("data", function (data) {   
    result.push(JSON.parse(data.value.toString()));
    console.log(JSON.parse(data.value.toString()));
  });


  app.get("/getstats", function (req, res) {
      res.send(result);    
  });

app.listen(PORT, () => {});
