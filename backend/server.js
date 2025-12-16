const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB, sequelize } = require('./src/config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const { errorHandler } = require('./src/middleware/errorMiddleware');

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


app.use(errorHandler);


const startServer = async () => {
    await connectDB();
    
    await sequelize.sync();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
