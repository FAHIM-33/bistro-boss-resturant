import SectionTitle from '../../../Components/SectionTitle';
import feaureImg from '../../../assets/home/featured.jpg'
import './featured.css'

const Featured = () => {
    return (
        <section className='peralex bg-fixed'>
            <SectionTitle
                heading={'check it out'}
                subHeading={'from our menu'}
            ></SectionTitle>

            <div className='flex text-white  p-24 bg-[#050505ab]'>
                <div className='w-1/2'>
                    <img src={feaureImg} alt="broken " />
                </div>

                <div className='w-1/2'>
                    <p>March 20, 2023 <br /> WHERE CAN I GET SOME?</p>
                    <p>orem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                </div>
            </div>
        </section >
    );
};

export default Featured;