

const MenuItems = ({ data }) => {
    const { _id, name, recipe, image, category, price } = data
    return (
        <div className="flex space-x-1">
            <figure className="">
                <img src={image} className="w-24  rounded-r-full rounded-b-full" alt="" />
            </figure>
            <div>
                <h3>{name}-----</h3>
            <p>{recipe}</p>
            </div>
            <p>${price}</p>
        </div>
    );
};

export default MenuItems;