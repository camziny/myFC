import React, { useState } from "react"
import EditPositionForm from "./EditPositionForm"

const PositionTile = ({
    id,
    name,
    position,
    playerId,
    deletePosition,
    creatorId,
    curUserId,
    patchPosition,
    errors,
    userLoggedIn,
    creator
}) => {
    const [isBeingEdited, setIsBeingEdited] = useState(false)

    const buttons = 
    creatorId === curUserId ? (
        <div className="review-edit-delete">
            <input
            className="button"
            type="button"
            value="Edit Position"
            onClick={() => {
                toggleEdit()
            }}
            />
            <input 
            className="button"
            type="button"
            value="Clear Position"
            onClick={() => {
                deletePosition(id)
            }}
            />
        </div>
    ) : null

    const toggleEdit = () => {
        setIsBeingEdited(!isBeingEdited)
    }

    if (isBeingEdited) {
        return (
            <EditPositionForm
            patchPosition={patchPosition}
            id={id}
            name={name}
            position={position}
            toggleEdit={toggleEdit}
            errors={erros}
            />
        )
    }

    return (
        <div className="position-tile position-boxes">
            <div className="position header">
            <h4>{name}</h4>
            <h5>{position}</h5>
            </div>
        <div className="">
            {buttons}
        </div>
        </div>
    )
}

export default PositionTile 