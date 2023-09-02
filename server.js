const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });

const dbConnection = require("./config/database");
const categoryRoute = require("./Routes/CategoryRoutes");
const subcategoryRoute = require("./Routes/subCategoryRoutes");

//classes
const ApiError = require("./utils/apiErorr");
//middleware from another file
const globalError = require("./middlewares/errorMiddleware");
// Connect with db
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subcategoryRoute);

//if the route is wrong
app.all("*", (req, res, next) => {
  // Create error and send it to error handling middleware
  // const err=new Error(`Can't find this route :${req.originalUrl}`)
  // next(err.message);
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// convert error message to json
//Global error handling middleware (include express)
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

// Events  => list => callback(err)
// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
