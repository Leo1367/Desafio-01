import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { PASSWORD_DB, USER_DB } = process.env;
const dbURL = `mongodb+srv://${USER_DB}:${PASSWORD_DB}@apicluster.wsvxghx.mongodb.net/?retryWrites=true&w=majority`

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB conectado');
    } catch (error) {
        console.error('Erro ao conectar com MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;