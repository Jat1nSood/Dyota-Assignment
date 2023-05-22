const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')

const nodemailer = require('nodemailer')


const app = express();


const PORT = process.env.PORT  ||5000;
app.use(bodyParser.json());
dotenv.config();

app.use(cors());

app.post('/', async(req, res)=>{

    try {
        const transpoter = await nodemailer.createTransport({
            host : "smtp.ethereal.email",
            port : 587,
            auth : {
                user :"juana45@ethereal.email",
                pass:"qRXNhWh5UZdXGSPsh6"
            }
        })

        const mailOptions = {
            from : req.body.email,
            to : "juana45@ethereal.email",
            subject :"Test email",
            text : req.body.phone
        }

        await transpoter.sendMail(mailOptions, (error, info) =>{
            if(error){
                console.log(error);
                res.send({message : "error"})
            }

            else{
                console.log('Email Sent')
                res.send({message : "email sent"})
            }
        })
        
    } catch (error) {

        console.log(error)
        
    }

})

app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT}`);
})