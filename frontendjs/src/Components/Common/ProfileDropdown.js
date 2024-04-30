import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { useSelector } from 'react-redux';

//import images
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import userDummy from "../../assets/images/users/user-dummy-img.jpg";
import ModalGantiPassword from '../ModalGantiPassword/ModalGantiPassword';

const ProfileDropdown = () => {

    const { user } = useSelector(state => ({
        user: state.Profile.user,
    }));

    const [userName, setUserName] = useState("Admin");
    const [openPassword, setOpenPassword] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            // setUserName(process.env.REACT_APP_DEFAULTAUTH === "fake" ? obj.username === undefined ? user.first_name ? user.first_name : obj.data.first_name : "Admin" || "Admin" :
            //     process.env.REACT_APP_DEFAULTAUTH === "firebase" ? obj.providerData[0].email : "Admin"
            // );
            setUserName(obj.username);
        }
    }, [userName, user]);

    //Dropdown Toggle
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };
    return (
        <React.Fragment>
            <ModalGantiPassword isOpen={openPassword} toggle={() => setOpenPassword(!openPassword)}/>
            <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user" >
                <DropdownToggle tag="button" type="button" className="btn">
                    <span className="d-flex align-items-center">
                        <img className="rounded-circle header-profile-user" src={userDummy}
                            alt="Header Avatar" />
                        <span className="text-start ms-xl-2">
                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{userName}</span>
                            {/* <span className="d-none d-xl-block ms-1 fs-13 text-muted user-name-sub-text">Founder</span> */}
                        </span>
                    </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <h6 className="dropdown-header">Welcome {userName}!</h6>
                    <DropdownItem onClick={() => setOpenPassword(!openPassword)}><i
                            className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i> <span
                                className="align-middle" >Ubah Password</span></DropdownItem>
                    <DropdownItem href={process.env.PUBLIC_URL + "/logout"}><i
                        className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle" data-key="t-logout">Logout</span></DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ProfileDropdown;