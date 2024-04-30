import React, { useCallback, useEffect,useState } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { Collapse } from 'reactstrap';
import withRouter from '../../Components/Common/withRouter';

// Import Data
import navdata from "../LayoutMenuData";
//i18n
import { withTranslation } from "react-i18next";
import { useSelector } from 'react-redux';

import { getUserPermissions } from "../../helpers/parse_menu";

const VerticalLayout = (props) => {
    const [navData,setnavData] = useState(getUserPermissions())//navdata().props.children;
    /*
    layout settings
    */
    const {
        leftsidbarSizeType, sidebarVisibilitytype, layoutType
    } = useSelector(state => ({
        leftsidbarSizeType: state.Layout.leftsidbarSizeType,
        sidebarVisibilitytype: state.Layout.sidebarVisibilitytype,
        layoutType: state.Layout.layoutType
    }));

    //vertical and semibox resize events
    const resizeSidebarMenu = useCallback(() => {
        var windowSize = document.documentElement.clientWidth;
        if (windowSize >= 1025) {
            if (document.documentElement.getAttribute("data-layout") === "vertical") {
                document.documentElement.setAttribute("data-sidebar-size", leftsidbarSizeType);
            }
            if (document.documentElement.getAttribute("data-layout") === "semibox") {
                document.documentElement.setAttribute("data-sidebar-size", leftsidbarSizeType);
            }
            if ((sidebarVisibilitytype === "show" || layoutType === "vertical" || layoutType === "twocolumn") && document.querySelector(".hamburger-icon")) {
                document.querySelector(".hamburger-icon")?.classList?.remove("open");
            } else {
                document.querySelector(".hamburger-icon")?.classList?.add("open");
            }
        } else if (windowSize < 1025 && windowSize > 767) {
            document.body.classList?.remove("twocolumn-panel");
            if (document.documentElement.getAttribute("data-layout") === "vertical") {
                document.documentElement.setAttribute("data-sidebar-size", "sm");
            }
            if (document.documentElement.getAttribute("data-layout") === "semibox") {
                document.documentElement.setAttribute("data-sidebar-size", "sm");
            }
            if (document.querySelector(".hamburger-icon")) {
                document.querySelector(".hamburger-icon")?.classList?.add("open");
            }
        } else if (windowSize <= 767) {
            document.body.classList?.remove("vertical-sidebar-enable");
            if (document.documentElement.getAttribute("data-layout") !== "horizontal") {
                document.documentElement.setAttribute("data-sidebar-size", "lg");
            }
            if (document.querySelector(".hamburger-icon")) {
                document.querySelector(".hamburger-icon")?.classList?.add("open");
            }
        }
    }, [leftsidbarSizeType, sidebarVisibilitytype, layoutType]);
  
      useEffect(() => {
        window.addEventListener("resize", resizeSidebarMenu, true);
        return () => {
            window.removeEventListener("resize", resizeSidebarMenu, true);
        }
      },[resizeSidebarMenu]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const initMenu = () => {
            let newNavData = [...navData]
            newNavData = newNavData.map((nav) => {
                let found = false
                let newNav = {...nav}
                newNav.subItems = newNav.subItems?.map((subItem) => {
                    let newSubItem = {...subItem}
                    let foundSub = false
                    if(subItem.link === props.router.location.pathname){
                        found = true
                        foundSub = true
                    }
                    newSubItem.isLink = foundSub
                    return newSubItem
                })
                newNav.isLink = found
                return newNav
            })
            setnavData(newNavData)
        };
        initMenu();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.router.location.pathname, props.layoutType]);

    // function activateParentDropdown(item) {

    //     item.classList?.add("active");
    //     let parentCollapseDiv = item.closest(".collapse.menu-dropdown");
    //     console.log(parentCollapseDiv)
    //     if (parentCollapseDiv) {

    //         // to set aria expand true remaining
    //         parentCollapseDiv.classList?.add("show");
    //         parentCollapseDiv.parentElement.children[0].classList?.add("active");
    //         parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
    //         if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
    //             parentCollapseDiv.parentElement.closest(".collapse").classList?.add("show");
    //             if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
    //                 parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList?.add("active");
    //             if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse")) {
    //                 parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse").classList?.add("show");
    //                 parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse").previousElementSibling.classList?.add("active");
    //             }
    //         }
    //         return false;
    //     }
    //     return false;
    // }

    // const removeActivation = (items) => {
    //     let actiItems = items.filter((x) => x.classList?.contains("active"));

    //     actiItems.forEach((item) => {
    //         if (item.classList?.contains("menu-link")) {
    //             if (!item.classList?.contains("active")) {
    //                 item.setAttribute("aria-expanded", false);
    //             }
    //             if (item.nextElementSibling) {
    //                 item.nextElementSibling.classList?.remove("show");
    //             }
    //         }
    //         if (item.classList?.contains("nav-link")) {
    //             if (item.nextElementSibling) {
    //                 item.nextElementSibling.classList?.remove("show");
    //             }
    //             item.setAttribute("aria-expanded", false);
    //         }
    //         item.classList?.remove("active");
    //     });
    // };
    const handleClick = (key) => {
        let temp = [...navData]
        temp.map((el, iTemp) => {
            if(iTemp === key){
                el.stateVariables = !el.stateVariables
            }
            return el
        });
        setnavData([...temp])
    }
    return (
        <React.Fragment>
            {/* menu Items */}
            {(navData || []).map((item, key) => {
                // if (item.isAllowed && !item.isAllowed()) return null;

                return (
                    <React.Fragment key={key}>
                        {/* Main Header */}
                        {item['isHeader'] ?
                            <li className="menu-title"><span data-key="t-menu">{props.t(item.label)}</span></li>
                            : (
                                (item.subItems ? (
                                    <li className={`nav-item`}>
                                        <Link
                                            onClick={() => handleClick(key)}
                                            className={`nav-link menu-link ${item.isLink ? "active" : ""}`}
                                            // to={item.link ? item.link : "/#"}
                                            data-bs-toggle="collapse"
                                        >
                                            <i className={item.icon} ></i> <span data-key="t-apps">{props.t(item.label)}</span>
                                        </Link>
                                        <Collapse
                                            className="menu-dropdown"
                                            isOpen={item.stateVariables}
                                            id="sidebarApps">
                                            <ul className="nav nav-sm flex-column test">
                                                {/* subItms  */}
                                                {item.subItems && ((item.subItems || []).map((subItem, key) => {
                                                    return (
                                                        <React.Fragment key={key}>
                                                            {!subItem.isChildItem ? (
                                                                <li className="nav-item">
                                                                    <Link
                                                                        to={subItem.link ? subItem.link : "/#"}
                                                                        className={`nav-link ${subItem.isLink ? "active" : ""}`}
                                                                        
                                                                    >
                                                                        {props.t(subItem.label)}
                                                                        {subItem.badgeName ?
                                                                            <span className={"badge badge-pill bg-" + subItem.badgeColor} data-key="t-new">{subItem.badgeName}</span>
                                                                            : null}
                                                                    </Link>
                                                                </li>
                                                            ) : (
                                                                <li className="nav-item">
                                                                    <Link
                                                                        onClick={subItem.click}
                                                                        className="nav-link"
                                                                        to="/#"
                                                                        data-bs-toggle="collapse"
                                                                    > {props.t(subItem.label)}
                                                                    {subItem.badgeName ?
                                                                        <span className={"badge badge-pill bg-" + subItem.badgeColor} data-key="t-new">{subItem.badgeName}</span>
                                                                    : null}
                                                                    </Link>
                                                                    <Collapse className="menu-dropdown" isOpen={subItem.stateVariables} id="sidebarEcommerce">
                                                                        <ul className="nav nav-sm flex-column">
                                                                            {/* child subItms  */}
                                                                            {subItem.childItems && (
                                                                                (subItem.childItems || []).map((childItem, key) => {
                                                                                    // if (item.isAllowed && !item.isAllowed()) return null;
                                                                                    
                                                                                    return (
                                                                                        <React.Fragment key={key}>
                                                                                            {!childItem.childItems ?
                                                                                                <li className="nav-item">
                                                                                                    <Link
                                                                                                        to={childItem.link ? childItem.link : "/#"}
                                                                                                        className="nav-link">
                                                                                                        {props.t(childItem.label)}
                                                                                                    </Link>
                                                                                                </li>
                                                                                                : <li className="nav-item">
                                                                                                    <Link to="/#" className="nav-link" onClick={childItem.click} data-bs-toggle="collapse">
                                                                                                        {props.t(childItem.label)}
                                                                                                    </Link>
                                                                                                    <Collapse className="menu-dropdown" isOpen={childItem.stateVariables} id="sidebaremailTemplates">
                                                                                                        <ul className="nav nav-sm flex-column">
                                                                                                            {childItem.childItems.map((subChildItem, key) => (
                                                                                                                <li className="nav-item" key={key}>
                                                                                                                    <Link to={subChildItem.link} className="nav-link" data-key="t-basic-action">{props.t(subChildItem.label)} </Link>
                                                                                                                </li>
                                                                                                            ))}
                                                                                                        </ul>
                                                                                                    </Collapse>
                                                                                                </li>
                                                                                            }
                                                                                        </React.Fragment>
                                                                                    );
                                                                                })
                                                                            )}
                                                                        </ul>
                                                                    </Collapse>
                                                                </li>
                                                            )}
                                                        </React.Fragment>
                                                    )
                                                })
                                                )}
                                            </ul>

                                        </Collapse>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link menu-link"
                                            to={item.link ? item.link : "/#"}>
                                            <i className={item.icon}></i> <span>{props.t(item.label)}</span>
                                        </Link>
                                    </li>
                                ))
                            )
                        }
                    </React.Fragment>
                );
            })}
        </React.Fragment>
    );
};

VerticalLayout.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any,
};

export default withRouter(withTranslation()(VerticalLayout));
