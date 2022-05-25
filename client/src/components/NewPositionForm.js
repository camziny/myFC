import React, { useState } from "react"

import translateServerErrors from "../services/translateServerErrors"
import ErrorList from "./layout/ErrorList"

const NewPositionForm = (props) => {
    const [newPosition, setNewPosition] = useState({
        name: "",
        position: "",
    })

    const [errors, setErrors] = useState({})

    const postPosition = async () => {
        const { squadId } = props
        try {
            const response = await fetch(`/api/v1/squads/${squadId}/positions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPosition),
            })
            if (!response.ok) {
                if (response.status === 422) {
                    const body = await response.json()
                    const newErrors = translateServerErrors(body.errors.data)
                    return setErrors(newErrors)
                }
                throw new Error(`${response.status} (${response.statusText})`)
            } else {
                const body = await response.json()
                clearForm()
                props.addNewPosition(body.position)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleInputChange = (event) => {
        event.preventDefault()
        setNewPosition({
            ...newPosition,
            [event.currentTarget.name]: event.currentTarget.value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        postPosition(newPosition)
    }

    const clearForm = () => {
        setNewPosition({
            name: "",
            position: "",
        })
    }

    return (
        <div className="position-form">
            <h4>Add Player</h4>
            <ErrorList errors={errors} />
            <form onSubmit={handleSubmit}>
                <label>
                    Add Player
                    <input type="text" name="name" placeholder="Player" onChange={handleInputChange} value={newPosition.name} />
                </label>
                <label>
                    Position
                    <input type="button" name="position" onChange={handleInputChange} value={newPosition.position} />
                </label>
                <input className="button" type="submit" value="Add Player" />
            </form>
        </div>
    )
}

export default NewPositionForm