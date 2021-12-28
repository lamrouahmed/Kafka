import Kafka from "node-rdkafka";
import express from "express";
import cors from "cors"


const PORT = process.env.PORT || 3001;
const app = express();


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.post("/create", function (req, res) {
   const response = Buffer.from(JSON.stringify(req.body));
   const success = stream.write(response);
   if (success) {
     console.log(`message queued (${response})`);
   } else {
     console.log("Too many messages in the queue already..");
   }
});



app.listen(PORT, () => console.log('Producer Running'))



const stream = Kafka.Producer.createWriteStream(
  {
    "metadata.broker.list": "localhost:9092"
  },
  {},
  {
    topic: "test",
  }
);

stream.on("error", (err) => {
  console.error(`Kafka Stream Error: ${err}`);
});



