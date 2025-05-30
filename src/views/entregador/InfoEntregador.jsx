import "./info.css"

export default function InfoBubble({label, value}) {
    return (
        <div className="infoContainer">
            <p><b>{label}</b>: {value}</p>
        </div>
    )
}