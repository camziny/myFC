import { Squad } from "../models/index.js"


const insertPlayer = async (cleanedFormInput) => {
    if (cleanedFormInput.players) {
        const newSquad = await Squad.query().insertAndFetch({ name: cleanedFormInput.name })
        await newSquad.$relatedQuery("assignment").insertGraph(cleanedFormInput.players)
        return { squad : newSquad }
    } else {
        const playerError = {
            players: [{
                message: "should be selected"
            }]
        }
        return { errors: playerError }
    }
}

export default insertPlayer