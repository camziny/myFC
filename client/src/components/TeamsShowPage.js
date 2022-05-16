import React, { useState, useEffect } from "react"


import ErrorList from "./ErrorList.js"

import translateServerErrors from "../services/translateServerErrors.js"

const TeamsShowPage = (props) => {
    const [team, setTeam] = useState({ players:[] })
    const [errors, setErrors] = useState([])

    const id = props.match.params.id
    
    const getTeam = async () => {
        try {
            const response = await fetch(`/api/v1/teams/${id}`)
            if (!response.ok) {
                const errorMessage = `{response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const teamData = await response.json()
            setTeam(teamData.team)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getTeam()
    }, [])
}

export default TeamsShowPage