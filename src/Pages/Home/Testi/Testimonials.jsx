import SectionTitle from "../../../Components/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";

import { Rating } from "@smastrom/react-rating";

import '@smastrom/react-rating/style.css'
import useAxios from "../../../Hooks/useAxios";

const Testimonials = () => {
    const [review, setReview] = useState([])
    const axios = useAxios()

    useEffect(() => {
        axios.get('/reviews')
            .then(res => {
                setReview(res.data)
            })
            .catch(() => console.log('error'))
    }, [axios])


    return (
        <section>
            <SectionTitle
                heading={'Testimonials'}
                subHeading={'what out clients say'}
            ></SectionTitle>

            <div className="text-center ">
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                    {
                        review?.map(obj => <SwiperSlide
                            key={obj._id}
                        >
                            <div className="px-12">
                                <div className="flex justify-center my-16"> 
                                    <Rating
                                        style={{ maxWidth: 200 }}
                                        value={obj.rating}
                                        readOnly
                                    />
                                </div>
                                <h3 className="text-2xl my-8 text-orange-400">{obj.name}</h3>
                                <p className="mb-8">{obj.details}</p>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;