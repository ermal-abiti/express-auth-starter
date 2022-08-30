import mongoose from "mongoose"

export const connectToMongo =  async () => {
    mongoose.connect(process.env.MONGO_URI);
}