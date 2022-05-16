import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import teamsRouter from "./api/v1/teamsRouter.js";
import playersRouter from "./api/v1/playersRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/teams", teamsRouter)
rootRouter.use("/api/v1/players", playersRouter)
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter); 

export default rootRouter;
