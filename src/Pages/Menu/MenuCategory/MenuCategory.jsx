import { Link } from "react-router-dom";
import MenuItems from "../../../Components/MenuItems";
import Cover from "../../Shared/Cover";

const MenuCategory = ({ data, title, coverImg }) => {
    return (
        <section className="">
            {title && <Cover title={title} img={coverImg}></Cover>}
            <div className="grid grid-cols-2 gap-8 p-4 mt-8">
                {
                    data?.map(obj => <MenuItems
                        key={obj._id}
                        data={obj}
                    ></MenuItems>)
                }
            </div>
            <Link to={`/order/${title}`}>
                <button className="btn block mx-auto">Order {title}</button>
            </Link>
        </section>
    );
};

export default MenuCategory;