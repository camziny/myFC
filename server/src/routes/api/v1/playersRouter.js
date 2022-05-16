import express from "express"
import objection from "objection"
import { Player } from "../../../models"

const playersRouter = new express.Router()

playersRouter.get("/", async (req, res) => {
    try {
        const players = await Player.query()
        return res.status(200).json({ players: players })
    } catch (error) {
            return res.status(500).json({ errors: error})
        }
    })

    export default playersRouter