
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
}

const initDB = async () => {
    try {
        await main();

        await Listing.deleteMany({});

        const listings = initData.data.map((listing) => ({
            ...listing,
            owner: "6ad7ef4245780b54b2894475",
            image:
                typeof listing.image === "string"
                    ? {
                          url: listing.image,
                          filename: "listingimage",
                      }
                    : listing.image,
        }));

        await Listing.insertMany(listings);

        console.log("Data was initialized successfully!");
    } catch (err) {
        console.error("Error initializing data:", err);
    } finally {
        await mongoose.connection.close();
    }
};

initDB();
