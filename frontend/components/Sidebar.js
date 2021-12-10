import SidebarItem from "./SidebarItems";

export default function Sidebar (props){
    const listItem = props.items.map((room) =>
    <SidebarItem room={room}/>
  );
    return (
        <ul className="sidebar">
            {listItem}
        </ul>
    )
}