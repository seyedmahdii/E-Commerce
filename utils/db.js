import mongoose from 'mongoose';

const connection = {};

const connect = async () => {
    if (connection.isConnected) {
        console.log('already connected');
        return;
    }
    // mongoose.connections is an array that contains all previous connections to the DB
    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            console.log('Use previous connection');
            return;
        }
        await mongoose.disconnect();
    }

    // Connection to the DB for the first time
    const db = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
    });
    console.log('New connection');
    connection.isConnected = db.connections[0].readyState;
};

const disconnect = async () => {
    if (connection.isConnected) {
        // The reason for using this, this way, is to prevent connecting and disconnecting in development.
        // Because it's gonna occupy our processor and memory and it's not possible to make development.
        // But in production mode, for each access to the DB, we make a connection, and at the end, we
        // Disconnect from the DB to release the resources on the server.
        if (process.env.NODE_ENV === 'production') {
            await mongoose.disconnect();
            connection.isConnected = false;
        } else {
            console.log('not disconnected');
        }
    }
};

const db = { connect, disconnect };
export default db;
