import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // .env faylını yükləyir

const connectDB = async () => {
     console.log('🔌 MongoDB-ə qoşulmağa çalışıram...');
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MONGO BAĞLANDI: ${connect.connection.host}`);
    } catch (error) {
        console.error('MongoDB Bağlantı Xətası:', error);
        process.exit(1);
    }
};

export default connectDB;



// MONGO_URI=mongodb+srv://tehmine:Tt.09222003@cluster0.1s8mgha.mongodb.net/
// PORT=7777
// JWT_SECRET=TT.09222003
// TWILIO_PHONE_NUMBER=+1234567890
// STRIPE_SECRET_KEY=sk_test_51RaLeg07OIDqXXBc6LrCQHNE4XL8Uo8ZCKl3BYQG919pkbo8cGgPJXLBGqcdAEmACcfbfIRbW7pgsPLCYA45Sfo4009hWQZ3Vo
// SMTP_USER=tahminap-sp103@code.edu.az
// SMTP_PASS=Tt.092220033


