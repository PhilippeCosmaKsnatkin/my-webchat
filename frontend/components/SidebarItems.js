import { useRouter } from "next/router";
export default function SidebarItems(props){
    const router = useRouter();
    function handleClick(e){
        router.push(`/room/${props.room}`)
    }
    return <li className="sidebar-item" onClick={handleClick}>{props.room}</li>
}