import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import SCSS from "./profilePhoto.module.scss";

interface Props {
    userImage: string | null;
    updateImageUpload: (image: FileList | null) => void;
}

export const ProfilePhoto = ({ userImage, updateImageUpload }: Props) => {
    return (
        <div className={SCSS.profileImg}>
            <div className={SCSS.profileImg__photoIconWrapper}>
                <input
                    type="file"
                    onChange={e => {
                        updateImageUpload(e.target.files);
                    }}
                />
                <AddAPhotoIcon
                    className={SCSS.profileImg__addPhotoIcon}
                    color="primary"
                />
            </div>
            {userImage ? (
                <div
                    className={SCSS.userImage}
                    style={{
                        backgroundImage: `url(${userImage})`,
                    }}
                ></div>
            ) : (
                <AccountCircleIcon />
            )}
        </div>
    );
};

export default ProfilePhoto;
