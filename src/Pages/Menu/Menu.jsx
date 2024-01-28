import { Helmet } from 'react-helmet-async';
import Cover from '../Shared/Cover';
import image from '../../assets/menu/banner3.jpg'
import dessertImg from '../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
import saladImg from '../../assets/menu/salad-bg.jpg'
import soupImg from '../../assets/menu/soup-bg.jpg'
import useMenu from '../../Hooks/useMenu';
import SectionTitle from '../../Components/SectionTitle';
import MenuCategory from './MenuCategory/MenuCategory';


const Menu = () => {
    const [menu, loading] = useMenu()
    if(loading){return <h3 className='text-5xl'>Loading...</h3>}
    let dessert = menu.filter(obj => obj.category === 'dessert')
    let soup = menu.filter(obj => obj.category === 'soup')
    let salad = menu.filter(obj => obj.category === 'salad')
    let pizza = menu.filter(obj => obj.category === 'pizza')
    let offered = menu.filter(obj => obj.category === 'offered')



    return (
        <div>
            <Helmet>
                <title>Bistro | Menu</title>
            </Helmet>
            <Cover title={'our menu'} img={image}></Cover>
            {/* Main cover */}
            <SectionTitle heading={'todays offer'} subHeading={"don't miss"}></SectionTitle>
            <MenuCategory data={offered} ></MenuCategory>
            {/* Dessert */}
            <MenuCategory data={dessert} title={'dessert'} coverImg={dessertImg} ></MenuCategory>
            {/* Pizza */}
            <MenuCategory data={pizza} title={'pizza'} coverImg={pizzaImg} ></MenuCategory>
            <MenuCategory data={salad} title={'salad'} coverImg={saladImg} ></MenuCategory>
            <MenuCategory data={soup} title={'soup'} coverImg={soupImg} ></MenuCategory>
        </div>
    );
};

export default Menu;