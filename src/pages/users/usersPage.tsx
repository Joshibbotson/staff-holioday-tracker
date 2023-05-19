import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/auth/auth";
import { useNavigate } from "react-router-dom";
import UserPanel from "../../components/user-panel/UserPanel";
import SCSS from "./users.module.scss";
import CurrentUserProvider from "../../context/CurrentUserContext";
import { HandleUsers } from "../../components/admin/users/HandleUsers";

const UsersPage = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, loading]);

    return (
        <>
            <div className={SCSS.homeContainer}>
                <CurrentUserProvider>
                    <UserPanel />
                    <main className={SCSS.mainContainer}>
                        <HandleUsers />
                    </main>
                </CurrentUserProvider>
            </div>
        </>
    );
};

export default UsersPage;
