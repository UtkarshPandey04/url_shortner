const express = require('express');
const {connectToMongoDB} = require('./connect');
const urlRoute=require('./routes/url');
const URL =require('./models/Url');
const app = express();
const port = 8001;

connectToMongoDB('mongodb+srv://utkarshpandeyup2004_db_user:utkarsh004@short-url.r3b4tzf.mongodb.net/').then(()=>console.log("Connected to MongoDB")).catch((err)=>console.error("Failed to connect to MongoDB",err));
app.use(express.json());
app.use("/url",urlRoute);

app.get('/:shortId',async(req,res)=>{
  const shortId=req.params.shortId;
  const entry=await URL.findOneAndUpdate({
    shortId
  },
  {
    $push:{
      visitHistory:{ timestamp: Date.now() },
    },
  }
);
  res.redirect(entry.redirectUrl);
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});