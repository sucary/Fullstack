const Header = ({name}: {name: string}) => {
    console.log("Header: " + name);
    return <h1>{name}</h1>;
}

export default Header;