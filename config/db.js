require('dotenv').config()
const mongoose = require('mongoose');


function connectDB() {

    //connect database
    mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('Database connected');
    }).on(Error ,()=> {
        console.log('Connection failed');
    });

}

module.exports = connectDB;