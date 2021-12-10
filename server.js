const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
dotenv.config();

const app = express();

colors.setTheme({
	custom: [ 'blue', 'underline', 'bgYellow', 'bold' ]
});

// Connect MongoDB
connectDB();


const transaction = require('./routes/transaction');

app.use(express.json({ extended: false }));

app.use('/api/transactions', transaction);
app.use('/api/users', require('./controller/user'))
app.use('/api/auth', require('./controller/auth'))

//static assets in prod
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


//Server-PORT Connection
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.custom));
