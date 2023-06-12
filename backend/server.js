// Import external packages
const express = require("express");
const cors = require("cors");
// Import internal modules
const workoutRoutes = require('./routes/workout.routes');
const userRoutes = require('./routes/user.routes')

const { connectToMongoDb, environmentVariables } = require("./config");

// express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send({ message: "working fine" });
});

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/users", userRoutes);

app.listen(environmentVariables.APP_PORT || 8000, (err) => {
  if (err) {
    console.error(err);
  }
  connectToMongoDb()
    .then(() => {
      console.info("connected to mongodb");
      console.info(
        `Server running on ${environmentVariables.APP_HOST}:${environmentVariables.APP_PORT}`
      );
    })
    .catch((_error) => {
      console.log(_error);
    });
});


