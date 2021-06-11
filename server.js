const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const express = require("express");
var path = require('path')
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://express-server-auth-4c9e1-default-rtdb.firebaseio.com"
});


const csrfMiddleware = csrf({ cookie: true });

const PORT = process.env.PORT || 4000;
const app = express();

app.engine("html", require("ejs").renderFile);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);

const accpath=path.join(__dirname);
// console.log(__dirname)
// console.log(accpath)
app.use(express.urlencoded({ extended: true }))
app.use(express.static(accpath)) 

app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/login", (req, res) => {
  res.render("login.html");
});

app.get("/signup", (req, res) => {
  res.render("signup.html");
});

app.get("/covidstats", (req, res) => {
  
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(() => {
      res.render("covidstats.html");
    })
    .catch((error) => {
      res.redirect("/login");
    });
});

app.get("/origin", (req, res) => {
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(() => {
      res.render("origin.html");
    })
    .catch((error) => {
      res.redirect("/login");
    });
});


app.get("/covidResources", (req, res) => {

  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(() => {
      res.render("covidResources.html");
    })
    .catch((error) => {
      res.redirect("/login");
    });
});

app.get("/medications", (req, res) => {
 
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(() => {
      res.render("medications.html");
    })
    .catch((error) => {
      res.redirect("/login");
    });
});

app.get("/precautions", (req, res) => {
  
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(() => {
      res.render("precautions.html");
    })
    .catch((error) => {
      res.redirect("/login");
    });
});

app.get("/symptoms", (req, res) => {
  
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(() => {
      res.render("symptoms.html");
    })
    .catch((error) => {
      res.redirect("/login");
    });
});

app.get("/help", (req, res) => {
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(() => {
      res.render("help.html");
    })
    .catch((error) => {
      res.redirect("/login");
    });
});

app.get("/aboutus", (req, res) => {
  
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(() => {
      res.render("aboutus.html");
    })
    .catch((error) => {
      res.redirect("/login");
    });
});

app.post("/sessionLogin", (req, res) => {

  const idToken = req.body.idToken.toString();
  const expiresIn = 60 * 60 * 24 * 5 * 1000;// expires in 5days

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});

app.get("/sessionLogout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/");
});

app.get('*', (req, res) => {
  res.sendFile(__dirname+'/views/error.html');
})

app.listen(PORT, (err) => {
  if(err){
    console.log("error while starting server");
  }
  else{
    console.log(`Listening on http://localhost:${PORT}`);
  }
});



// npx nodemon server.js