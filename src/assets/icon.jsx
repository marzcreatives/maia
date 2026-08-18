import { Icons } from "./icons";

// eslint-disable-next-line react/prop-types
const Icon =({ alt, icon, id }) => {
    let selectedIcon = Icons[icon];
    return (
        <div className="icon" data-testid={`icon`}>
            <img src={selectedIcon} alt={alt} id={id} />
        </div>
    )
}
export default Icon;