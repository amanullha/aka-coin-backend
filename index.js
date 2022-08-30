
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');


app.use(cors());

app.use(express.json({
    origin: "*",
}));


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');





// ******************** Work Starts ***********************






const uri = "mongodb+srv://theCleaningFairies:jtjHne5uB0OYgCIf@cluster0.w2egzbh.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {

        const walletCollection = client.db('walletDB').collection('wallet');

        console.log("Connected!");



        app.get("/get-wallets", async (req, res) => {


            const query = {};

            const wallets = await walletCollection.find(query).toArray();

            res.send(wallets);

        })



        // Add new wallet data 

        app.post("/add-wallet", async (req, res) => {

            try {

                const data = req.body;


                const result = await walletCollection.insertOne(data);

                res.send(result);

            } catch (error) {
                res.send({ status: false, error });
            }


        })



        // Update existing wallet data

        app.put("/update-wallet/:id", async (req, res) => {

            try {

                const { id } = req.params;
                const data = req.body;

                console.log("id: ", id);
                console.log("body: ", data);

                const filter = { _id: ObjectId(id) };
                const updateDoc = { $set: data };
                const option = { upsert: true };


                const result = await walletCollection.updateOne(filter, updateDoc, option);

                res.send(result);

            } catch (error) {
                res.send({ status: false, error });
            }


        })



        // Delete a wallet 

        app.delete("/delete-wallet/:id", async (req, res) => {

            try {

                const { id } = req.params;

                const query = { _id: ObjectId(id) };

                const result = await walletCollection.deleteOne(query);
                res.send(result);

            } catch (error) {

            }
        })













    } finally {

        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);





// ******************** Work Ends *************************







app.get("/", async (req, res) => {

    setTimeout(() => {
        res.send("aka.coin")
    }, 1000);

})




app.listen(5000)


