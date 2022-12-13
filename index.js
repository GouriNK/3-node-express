const express = require('express');
var app = express();


// app.get('/', (req, res)=>{
//     // gets output on Web browser
//     res.send('Hello There!');
// });

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/users', require('./routes/api/users'));

app.listen(5000, () =>{
    // gets output on terminal 
    console.log('Server started on port 5000');
});