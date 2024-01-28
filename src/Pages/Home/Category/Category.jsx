import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import slide1 from '../../../assets/home/slide1.jpg'
import slide2 from '../../../assets/home/slide2.jpg'
import slide3 from '../../../assets/home/slide3.jpg'
import slide4 from '../../../assets/home/slide4.jpg'
import slide5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../../Components/SectionTitle';

const Category = () => {
    return (
        <section>
             <SectionTitle
             heading={"Order online"}
             subHeading={"From 11:00 am ot 10:pm"}
             ></SectionTitle>
             
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper brb mb-24"
            >
                <SwiperSlide className=''>
                    <img src={slide1} className=''/>
                    <h2 className='uppercase -ml-10 text-center text-black -mt-16 text-2xl'>Salads</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide2} />
                    <h2 className='uppercase -ml-10 text-center text-black -mt-16 text-2xl'>Soups</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide3} />
                    <h2 className='uppercase -ml-10 text-center text-black -mt-16 text-2xl'>Deserts</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide4} />
                    <h2 className='uppercase -ml-10 text-center text-black -mt-16 text-2xl'>Salads</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide5} />
                    <h2 className='uppercase -ml-10 text-center text-black -mt-16 text-2xl'>Salads</h2>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Category; 