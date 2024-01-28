import SectionTitle from "../../../Components/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import MenuCategory from "../../Menu/MenuCategory/MenuCategory";


const PopularMenu = () => {
    const [menu, loading] = useMenu()

    if (loading) { return <h1 className="text-5xl text-center">Loadign menu..</h1> }

    let popular = menu?.filter(obj => obj.category === 'popular')

    return (
        <section className="my-24 brr ">
            <SectionTitle
                heading={"From our menu"}
                subHeading={"popular items"}
            ></SectionTitle>
            <MenuCategory data={popular}></MenuCategory>
        </section>
    );
};

export default PopularMenu;