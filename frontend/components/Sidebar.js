import SidebarItem from "./SidebarItems";

export default function Sidebar (props){
    const listItem = props.items.map((title) =>
    <SidebarItem title={title}/>
  );
    return (
        <ul className="sidebar">
            {listItem}
        </ul>
    )
}