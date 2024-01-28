import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle";
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxios from "../../../Hooks/useAxios";


const AddItems = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxios()
    const { register, handleSubmit, reset } = useForm()

    const IMAGE_HOSTING_KEY = '5daaa55d7e65500b0104416ebb237b54'
    const IMAGE_HOSTING_API = `https://api.imgbb.com/1/upload?key=${IMAGE_HOSTING_KEY}`


    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(IMAGE_HOSTING_API, imageFile, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })
        console.log(res.data)
        if (res.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url,
            }
            const menuRes = await axiosSecure.post('/menu', menuItem)
            console.log(menuRes.data)
            reset() 
        }

    }


    return (
        <div>
            <SectionTitle
                heading={'add an item'}
                subHeading={'whats new'}
            ></SectionTitle>
            <form className="form-control space-y-6 my-6" onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Recipe Name*
                </label>
                <input className="input input-bordered" placeholder="Recipe Name:" {...register("name", { required: true })} />

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="label" >Category*</label>
                        <select defaultValue='default' className="w-full input input-bordered" {...register("category", { required: true })}>
                            <option value="default" disabled>Select a category</option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="dessert">Dessert</option>
                            <option value="soup">Soup</option>
                            <option value="drinks">Drinks</option>

                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="label">Price*</label>
                        <input className="input w-full input-bordered" type="text" placeholder="Price $" {...register("price", { required: true })} />
                    </div>
                </div>
                <div className="w-full">
                    <label>Recipe Details*</label>
                    <textarea {...register("recipe")} cols="20" className="w-full textarea textarea-bordered" rows="5"></textarea>
                </div>
                <input {...register('image', { required: true })} type="file" className="file-input file-input-bordered file-input-accent w-full max-w-xs" />
                <button className="btn w-fit bg-orange-500 text-black">
                    Add Item <FaUtensils></FaUtensils>
                </button>
            </form>
        </div>
    );
};

export default AddItems;