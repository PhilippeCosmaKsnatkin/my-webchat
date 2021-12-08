export default function Message(props){
    
    return(
        <div>
            <img className="avatar" src={props.avatar}/>
            <p>{props.message}</p>
        </div>
    )
}