
const SectionTitle = ({heading, subHeading}) => {

    return (
        <div className="w-fit mx-auto mb-8">
            <p className="text-yellow-600 text-center">---{subHeading}---</p>
            <h2 className=" text-center uppercase text-4xl py-4 border-y-2">{heading}</h2>
        </div>
    );
};

export default SectionTitle;