// import { createClient } from "redis";

// //Create a Redis Client

// const redisClient = createClient({
//     url: process.env.REDIS_URL,   
// // })

// //Handle connection errors

// redisClient.on("error", (err) => {
//     console.error("Error connecting to Redis: ", err);
// });

// //Handle connection success
// (async () => {
//     await redisClient.connect();
//     console.log("Connected to Redis");
// })();

// export default redisClient;

