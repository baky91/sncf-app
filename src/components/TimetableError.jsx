
function TimetableError({mode}){
    // mode : départs ou arrivées
    return (
        <div className="timetable-error">
            <h3 className="timetable-error__message">Impossible d'afficher les {mode}</h3>
            <button
                className="timetable-error__retry-button"
                onClick={() => window.location.reload()}
            >
                Rafraîchir la page
            </button>
        </div>
    )
}

export default TimetableError