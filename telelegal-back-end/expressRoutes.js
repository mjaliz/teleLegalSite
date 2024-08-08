// This is where all our express stuff happens (routes)
const app = require("./server").app;
const jwt = require("jsonwebtoken");
const linkSecret = "dsfjkslkdfjlwkej323423@#@Reskdfjw";

// This route is for US! In production, a receptionst, or calender/scheduling app
// would send this out. We will print it out and paste it in. It will drop us
// on our React site with the right info for CLIENT1 to make an offer
app.get("/user-link", (req, res) => {
  // Data for end-user's appt
  const apptData = {
    proffessionalsFullName: "MJ Alizadeh. E.N.",
    apptDate: Date.now(),
  };

  // We need to encode this data to a token
  const token = jwt.sign(apptData, linkSecret);
  res.send("https://localhost:3000/join-video?token=" + token);
  // res.json("This is a test route");
});

app.post("/validate-link", (req, res) => {
  const token = req.body.token;
  const decodedData = jwt.verify(token, linkSecret);
  res.json(decodedData);
});
