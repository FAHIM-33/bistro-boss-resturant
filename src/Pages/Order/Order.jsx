import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import './order.css'
import orderCover from '../../assets/shop/banner2.jpg'
import Cover from '../Shared/Cover';
import 'react-tabs/style/react-tabs.css';
import { useState } from 'react';
import useMenu from '../../Hooks/useMenu';

import OrderTab from './OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {
    const allCategory = ["salad", "pizza", "soup", "dessert", "drinks"]
    const { category } = useParams()
    let initialIndex = allCategory.indexOf(category)

    // const [tab, setTab] = useState(0)
    const [menu, loading] = useMenu()
    if (loading) { return <h2>Loading menu...</h2> }

    let dessert = menu.filter(obj => obj.category === 'dessert')
    let soup = menu.filter(obj => obj.category === 'soup')
    let salad = menu.filter(obj => obj.category === 'salad')
    let pizza = menu.filter(obj => obj.category === 'pizza')
    let drinks = menu.filter(obj => obj.category === 'drinks')

    

    return (
        <section className='order-page'>
            <Helmet>
                <title>Bistro | Order</title>
            </Helmet>
            <Cover img={orderCover} title='order Food'></Cover>
            <div>
                <Tabs defaultIndex={initialIndex} onSelect={(index) => { console.log(index) }}>
                    <TabList className='flex m-4 justify-center gap-4'>
                        <Tab>Salad</Tab>
                        <Tab>Pizza</Tab>
                        <Tab>Soup</Tab>
                        <Tab>Dessert</Tab>
                        <Tab>Drinks</Tab>
                    </TabList>

                    <TabPanel>
                        <OrderTab item={salad}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab item={pizza}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab item={soup}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab item={dessert}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab item={drinks}></OrderTab>
                    </TabPanel>

                </Tabs>
            </div>
        </section>
    );
};

export default Order;