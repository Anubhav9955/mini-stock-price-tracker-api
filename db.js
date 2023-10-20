const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://singhsanbhav:wgUHb8iAckOf9ZQ6@cluster0.jyhyycy.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with the connection string
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = client;
