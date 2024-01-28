import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const UserHome = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>
            <h2>
                <span>Hi, welcome </span>
                {user?.displayName}
            </h2>
        </div>
    );
};

export default UserHome;