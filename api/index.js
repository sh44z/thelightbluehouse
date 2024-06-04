const express = require("express");
const cors = require('cors');
const multer  = require('multer')
const { default: mongoose } = require("mongoose");
const User = require("./models/user");
const Place  = require("./models/place");
const Booking = require("./models/booking.js");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const download = require('image-downloader');
const app = express();
cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
require("dotenv").config();
const fs  = require('fs');
const path = require('path');

const port = process.env.PORT || 6000;
const saltRounds = 10;


app.use(express.json())
app.use(bodyParser.json());
app.use(cookieParser())
app.use("/uploads", express.static(__dirname + "/uploads"))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));


mongoose.connect(process.env.MONGO_URI);

function getUserDataFromToken(req) {
    return new Promise((resolve, reject) =>{
       jwt.verify(req.cookies.token, "secret", async (err, userData) => {
        if (err) throw err;
        resolve(userData) ;
     });

    })
     
}

app.get("/test", (req, res) => {
    res.json({ message: "test ok" });
});

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.post("/register", async (req, res) => {
    const {name, email, password, phone} = req.body;
    
    try {
        const userDoc = await User.create({ name, phone, email, password:bcrypt.hashSync(password, saltRounds) });
            res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }

   

});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email: email });
  
  if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      
      if (passOk) {
          jwt.sign({email:userDoc.email, id:userDoc._id}, "secret", {}, (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(userDoc);
          })
          
      } else {
          res.status(422).json("Incorrect password");
      }
  } else {
      res.status(422).json("Incorrect email or password");
  }
});

app.get("/profile", (req, res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, "secret", async (err, userData) => {
            if (err) {
                // Handle error
                return res.status(500).json({ error: "Internal Server Error" });
            }
            try {
                const { name, email, _id } = await User.findById(userData.id).select("-password");
                // Excluding the password field using select("-password")
                res.json({ name, email, _id });
            } catch (error) {
                // Handle error
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    } else {
        res.json(null);
    }
});

app.post( "/logout", (req,res)=>{
    res.cookie("token", "").json(true);
})


app.post("/upload-by-link", async (req, res) => {
    const {link} = req.body;
    const newName = "photo" +Date.now()  + ".jpg";
    await download.image({
        url: link,
        dest: __dirname + "/uploads/" +newName
    })
    res.json(newName);
})

const upload = multer({ dest: 'uploads/' });
app.post("/uploads", upload.array("photos", 40), (req, res) => {
    

      const uploadedFiles = [];
      
      for (let i = 0; i < req.files.length; i++) {
        
        const { path, originalname } = req.files[i];
        const parts = originalname.split(".");
        const ext = parts[parts.length -1];
        const newPath = path + "." + ext;

       
        fs.renameSync(path, newPath); // provide the second argument
        uploadedFiles.push(newPath.replace("uploads\\",""));
      }
     
      res.json(uploadedFiles);
      });

app.post("/places", (req, res) => {
    const {token} = req.cookies;
    const {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price} = req.body;
    jwt.verify(token, "secret", async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
         owner:userData.id,
         title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests,price
         
        });
       
        res.json(placeDoc);
    });
});

app.get("/user-places", (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, "secret", async (err, userData) => {
       const {id} = userData;
       res.json(await Place.find({owner:id}))        
        });
       
})

app.get("/places/:id", async (req, res) => {
    const {id} = req.params;
    res.json(await Place.findById(id));
})

app.put("/places", async (req,res) => {
    
    const {token} = req.cookies;
    const {id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price} = req.body;
    
    jwt.verify(token, "secret", async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
           placeDoc.set({
            title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price
           });
           await placeDoc.save();
           res.json("ok")
        }   
         });
})

app.get("/places", async (req,res) => {
    res.json(await Place.find() )
})

app.post("/bookings", async (req, res) => {
    const userData = await getUserDataFromToken(req);
    const {place, checkIn, checkOut, numberOfGuests, name, mobile, price } = req.body;
    Booking.create({place, checkIn, checkOut, numberOfGuests, name, mobile, price,
        user:userData.id
     }).then((doc) => {
      res.json(doc)
    }).catch(()=> { throw err;});
})



app.get('/bookings', async (req, res) => {
    mongoose.connect(process.env.MONGO_URI);
    try {
        const userData = await getUserDataFromToken(req);
      
        const bookings = await Booking.find({ user: userData.id }).populate('place').exec();
      
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).send("Internal Server Error");
    }
});


  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
