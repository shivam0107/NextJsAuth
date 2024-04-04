import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URL!)
        const connection = mongoose.connection

        connection.on('connected' , () => {
            console.log('mongodb connected');
            
        })
        connection.on('error' , (error) => {
            console.log('mongodb connection error, please make sure db is running' , error);
            process.exit()
            
        })
    } catch (error) {
        console.log("someting went wron connecting to db" , error);
        
        
    }
}
