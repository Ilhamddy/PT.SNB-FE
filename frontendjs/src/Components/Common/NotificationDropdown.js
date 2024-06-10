import React, { useEffect, useState } from 'react';
import { Col, Dropdown, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import socketIOClient from 'socket.io-client';

//import images
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import bell from "../../assets/images/svg/bell.svg";

//SimpleBar
import SimpleBar from "simplebar-react";
import { useDispatch, useSelector } from 'react-redux';
import { getListNotifikasi, updateStatusBaca } from '../../store/notifikasi/notifikasiSlice';
import socket from '../../utils/socket';

const NotificationDropdown = () => {
    const dispatch = useDispatch()
    //Dropdown Toggle
    const [isNotificationDropdown, setIsNotificationDropdown] = useState(false);
    const toggleNotificationDropdown = () => {
        setIsNotificationDropdown(!isNotificationDropdown);
    };

    //Tab 
    const [activeTab, setActiveTab] = useState('1');
    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            // console.log('masukkk')
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          dispatch(getListNotifikasi());
        };
      
        if (socket) {
          socket.on('receiveMessage', handleNewMessage);
        }
      
        return () => {
          if (socket) {
            socket.off('receiveMessage', handleNewMessage); // Remove specific event listener
          }
        };
      }, [socket, dispatch]);
      const response = useSelector(
        (state) => state.notifikasiSlice.getListNotifikasi.data?.list || []
      )
      const response2 = useSelector(
        (state) => state.notifikasiSlice.getListNotifikasi.data?.unread || []
      )
    function timeDifference(date) {
        const now = new Date();
        const pastDate = new Date(date);

        const diffInMs = now - pastDate;

        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const response = `${diffInDays} Hari ${diffInHours % 24} Jam ${diffInMinutes % 60} Menit`;
        return response;
    }
    const clickupdateStatusBaca = (e,temp)=>{
        if(e===true){
            let value ={norec:temp}
            dispatch(updateStatusBaca(value,()=>{
                dispatch(
                    getListNotifikasi()
                )
            }))
            console.log(e)
        }
    }
    return (
        <React.Fragment>
                    <Dropdown isOpen={isNotificationDropdown} toggle={toggleNotificationDropdown} className="topbar-head-dropdown ms-1 header-item">
                        <DropdownToggle type="button" tag="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle">
                            <i className='bx bx-bell fs-22'></i>
                            <span
                                className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">{response2.length}<span
                                    className="visually-hidden">Belum dibaca</span></span>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
                            <div className="dropdown-head bg-pattern rounded-top" style={{backgroundColor:'#17a2b8'}}>
                                <div className="p-3">
                                    <Row className="align-items-center">
                                        <Col>
                                            <h6 className="m-0 fs-16 fw-semibold text-white"> Notifications </h6>
                                        </Col>
                                        <div className="col-auto dropdown-tabs">
                                            <span className="badge badge-soft-light fs-13"> {response2.length} Baru</span>
                                        </div>
                                    </Row>
                                </div>

                                <div className="px-2 pt-2">
                                    <Nav className="nav-tabs dropdown-tabs nav-tabs-custom">
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({ active: activeTab === '1' })}
                                                onClick={() => { toggleTab('1'); }}
                                            >
                                                <h5>all</h5>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </div>

                            </div>

                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1" className="py-2 ps-2">
                                    <SimpleBar style={{ maxHeight: "300px" }} className="pe-2">
                                    {response.map((item, key) => (
                                        <div className="text-reset notification-item d-block dropdown-item position-relative" style={{backgroundColor:item?.color}} key={key}>
                                            <div className="d-flex">
                                                <div className="avatar-xs me-3">
                                                    <span className="avatar-title bg-soft-info text-info rounded-circle fs-16">
                                                        <i className="bx bx-badge-check"></i>
                                                    </span>
                                                </div>
                                                
                                                
                                                {item?.isbaca === false ?(
                                                    <>
                                                    <div className="flex-1">
                                                        <Link to={item.link} onClick={()=>clickupdateStatusBaca(true, item?.norec)} className="stretched-link">
                                                            <h6 className="mt-0 mb-2 lh-base">{item.label}
                                                            </h6>
                                                        </Link>
                                                        <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                            <span><i className="mdi mdi-clock-outline"></i> {timeDifference(item?.tglinput)}</span>
                                                        </p>
                                                    </div>
                                                    <div className="px-2 fs-15">
                                                            <div className="form-check notification-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    checked={item?.isbaca}
                                                                    value=""
                                                                    id="all-notification-check01"
                                                                    onChange={(e) => {
                                                                        clickupdateStatusBaca(e.target.checked, item?.norec);
                                                                    }}
                                                                />
                                                                <label className="form-check-label" htmlFor="all-notification-check01"></label>
                                                            </div>
                                                    </div>
                                                    </>
                                                ):(
                                                <div className="flex-1">
                                                        <Link to='#' className="stretched-link">
                                                            <h6 className="mt-0 mb-2 lh-base">{item.label}
                                                            </h6>
                                                        </Link>
                                                        <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                            <span><i className="mdi mdi-clock-outline"></i> {timeDifference(item?.tglinput)}</span>
                                                        </p>
                                                    </div>)}
                                            </div>
                                        </div>
                                    ))}

                                        {/* <div className="my-3 text-center">
                                            <button type="button" className="btn btn-soft-success waves-effect waves-light">View
                                                All Notifications <i className="ri-arrow-right-line align-middle"></i></button>
                                        </div> */}
                                    </SimpleBar>

                                </TabPane>

                                <TabPane tabId="2" className="py-2 ps-2">
                                    <SimpleBar style={{ maxHeight: "300px" }} className="pe-2">
                                        <div className="text-reset notification-item d-block dropdown-item">
                                            <div className="d-flex">
                                                <img src={avatar3}
                                                    className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                <div className="flex-1">
                                                    <Link to="#" className="stretched-link"><h6 className="mt-0 mb-1 fs-13 fw-semibold">James Lemire</h6></Link>
                                                    <div className="fs-13 text-muted">
                                                        <p className="mb-1">We talked about a project on linkedin.</p>
                                                    </div>
                                                    <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                        <span><i className="mdi mdi-clock-outline"></i> 30 min ago</span>
                                                    </p>
                                                </div>
                                                <div className="px-2 fs-15">
                                                    <div className="form-check notification-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="messages-notification-check01" />
                                                        <label className="form-check-label" htmlFor="messages-notification-check01"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-reset notification-item d-block dropdown-item">
                                            <div className="d-flex">
                                                <img src={avatar2}
                                                    className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                <div className="flex-1">
                                                    <Link to="#" className="stretched-link"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6></Link>
                                                    <div className="fs-13 text-muted">
                                                        <p className="mb-1">Answered to your comment on the cash flow forecast's
                                                            graph 🔔.</p>
                                                    </div>
                                                    <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                        <span><i className="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                                                    </p>
                                                </div>
                                                <div className="px-2 fs-15">
                                                    <div className="form-check notification-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="messages-notification-check02" />
                                                        <label className="form-check-label" htmlFor="messages-notification-check02"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-reset notification-item d-block dropdown-item">
                                            <div className="d-flex">
                                                <img src={avatar6}
                                                    className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                <div className="flex-1">
                                                    <Link to="#" className="stretched-link"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Kenneth Brown</h6></Link>
                                                    <div className="fs-13 text-muted">
                                                        <p className="mb-1">Mentionned you in his comment on 📃 invoice #12501. </p>
                                                    </div>
                                                    <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                        <span><i className="mdi mdi-clock-outline"></i> 10 hrs ago</span>
                                                    </p>
                                                </div>
                                                <div className="px-2 fs-15">
                                                    <div className="form-check notification-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="messages-notification-check03" />
                                                        <label className="form-check-label" htmlFor="messages-notification-check03"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-reset notification-item d-block dropdown-item">
                                            <div className="d-flex">
                                                <img src={avatar8}
                                                    className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                <div className="flex-1">
                                                    <Link to="#" className="stretched-link"><h6 className="mt-0 mb-1 fs-13 fw-semibold">Maureen Gibson</h6></Link>
                                                    <div className="fs-13 text-muted">
                                                        <p className="mb-1">We talked about a project on linkedin.</p>
                                                    </div>
                                                    <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                        <span><i className="mdi mdi-clock-outline"></i> 3 days ago</span>
                                                    </p>
                                                </div>
                                                <div className="px-2 fs-15">
                                                    <div className="form-check notification-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="messages-notification-check04" />
                                                        <label className="form-check-label" htmlFor="messages-notification-check04"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="my-3 text-center">
                                            <button type="button" className="btn btn-soft-success waves-effect waves-light">View
                                                All Messages <i className="ri-arrow-right-line align-middle"></i></button>
                                        </div>
                                    </SimpleBar>
                                </TabPane>
                                <TabPane tabId="3" className="p-4">
                                    <div className="w-25 w-sm-50 pt-3 mx-auto">
                                        <img src={bell} className="img-fluid" alt="user-pic" />
                                    </div>
                                    <div className="text-center pb-5 mt-2">
                                        <h6 className="fs-18 fw-semibold lh-base">Hey! You have no any notifications </h6>
                                    </div>
                                </TabPane>
                            </TabContent>
                        </DropdownMenu>
                    </Dropdown>
                </React.Fragment>
    );
};

export default NotificationDropdown;