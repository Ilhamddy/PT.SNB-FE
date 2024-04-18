"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { dataNav } from "@/hooks/dataNavbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaAmazon,
  FaApple,
  FaAws,
  FaBarsStaggered,
  FaBrain,
  FaHospital,
  FaUser,
} from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { FaClinicMedical } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { loginAction, logoutAction } from "@/lib/features/userSlice";
import { baseUrl } from "../utils/databases";
import axios from "axios";

const Navbarsection = () => {
  const [open, setOpen] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [isTheme, setIsTheme] = useState(false);
  const {theme , setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users);
  console.log("data navbar", users);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutAction());
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    // console.log(token);

    const keepLogin = async () => {
      try {
        const { data } = await axios.get(baseUrl + `/user/keep`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(loginAction(data.data.dataValues));
        console.log("dispatch action", data.data.dataValues);
      } catch (error) {
        console.log("error global state", error);
      }
    };
    keepLogin();
  }, []);

  const [scrollPosisition, setScorllPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScorllPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarStyle = {
    transition: "background-color 0.9s ease",
    backgroundColor: scrollPosisition > 0 ? "#08080D" : "transparent",
    backdropFilter: "blur(4px)",
  };

  const textStyle = {
    color: scrollPosisition > 0 ? "#FFC800" : "#08080D",
    // textShadow: scrollPosisition > 0 ? "1px 1px 2px #ffffff" : "1px 1px 2px #000000",
  };

  const logoStyle = {
    src:
      scrollPosisition > 0 ? "/image/logoSNB.png" : "/image/logoSNB1putih.png",
  };

  useEffect(() => {
    setOpen(navbar);
    setIsTheme(isTheme);
  }, [navbar]);

  return (
    //navbar
    <header className="fixed  top-0 w-full" style={navbarStyle}>
      <nav className="mx-0 items-center justify-between rounded-xl p-3  px-10 md:mx-10 md:rounded-none">
        <div className="grid-flow-col justify-between md:grid md:w-full">
          {/* NAVBAR MOBILE */}
          <div className="flex justify-between  gap-5 sm:w-full md:w-full">
            <div className="flex items-center sm:w-[200px] md:w-[200px]">
              <Link href="/">
                <Image
                  src={
                    scrollPosisition > 0
                      ? "/image/logoSNB1putih.png"
                      : "/image/logoSNB.png"
                  }
                  height={200}
                  width={200}
                  alt="logo PT. SOLUSI NUSANTARA BERDIKARI"
                />
              </Link>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center justify-center gap-5 md:hidden">
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      {/* <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setTheme("dark")}
                      >
                        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                      </Button> */}
                    </DropdownMenuTrigger>
                  </DropdownMenu>
                </div>
                <div>
                  {users.id ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-800"
                          size="icon"
                          variant="ghost"
                          style={textStyle}
                        >
                          <FaUser />
                          <span className="sr-only">Toggle user menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={"/dashboard"}>
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        </Link>
                        <DropdownMenuSeparator />

                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-800"
                          size="icon"
                          variant="ghost"
                          style={textStyle}
                        >
                          <FaUser />
                          <span className="sr-only">Toggle user menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuSeparator />
                        <Link href={"/register"}>
                          <DropdownMenuItem>Register</DropdownMenuItem>
                        </Link>
                        <Link href={"/login"}>
                          <DropdownMenuItem>Login</DropdownMenuItem>
                        </Link>{" "}
                        <DropdownMenuSeparator />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
                <Button onClick={() => setNavbar(!navbar)}>
                  {!navbar ? <FaBarsStaggered /> : <IoMdClose />}
                </Button>
              </div>
            </div>
          </div>

          {/* NAVBAR DEKSTOP */}
          <div className="col-span-2 flex items-center gap-5" >
            <div
              className={`w-full gap-5 justify-self-center md:flex  md:bg-transparent  ${open ? "grid place-items-center p-3  md:p-0" : "hidden sm:hidden "}`} style={textStyle}
            >
              {dataNav.map((data) => {
                return (
                  <NavigationMenu className="border-b-2 md:border-b-0 ">
                    <NavigationMenuList>
                      <NavigationMenuItem
                        key={data.title}
                        className=" my-2 flex w-64 justify-center md:my-0 md:w-full dark:text-white"
                      >
                        {data.list ? (
                          <>
                            <NavigationMenuTrigger className="rounded-md bg-transparent px-5 py-2 text-sm hover:bg-transparent hover:text-white dark:bg-transparent ">
                              {data.title}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="w-full bg-transparent hover:bg-transparent ">
                              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                  <NavigationMenuLink asChild>
                                    <a
                                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                      href="/product"
                                    >
                                      <FaBrain className="h-6 w-6 text-based1" />
                                      <div className="mb-2 mt-4 text-lg font-medium">
                                        Semua Produk
                                      </div>
                                      <div className="text-justify text-xs leading-tight text-muted-foreground">
                                        Aplikasi Kesehatan menawarkan alat yang
                                        kuat untuk manajemen sumber daya, yang
                                        memungkinkan rumah sakit mengoptimalkan
                                        sumber daya mereka secara efisien.
                                      </div>
                                    </a>
                                  </NavigationMenuLink>
                                </li>
                                <a href="/product-detail">
                                  <li
                                    className="h-24 rounded-md bg-gradient-to-b from-muted/50  to-muted p-4 no-underline outline-none focus:shadow-md"
                                    title="Introduction"
                                  >
                                    <FaHospital className="h-6 w-6 text-based1 " />
                                    SIMRS (Sistem Informasi Manajemen Rumah
                                    Sakit)
                                  </li>
                                </a>
                                <a href="/product-detail-klinik">
                                  <li
                                    className=" h-24 rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
                                    title="Installation"
                                  >
                                    <FaClinicMedical className="h-6 w-6  text-based1" />
                                    E-Klinik
                                  </li>
                                </a>
                              </ul>
                            </NavigationMenuContent>
                          </>
                        ) : (
                          <>
                            <NavigationMenuLink
                              asChild
                              className={`${navigationMenuTriggerStyle()} text-md rounded-md bg-transparent px-5 py-2 hover:bg-transparent hover:text-third dark:bg-transparent`}
                            >
                              <div>
                                <a href={data.link}>
                                  <div>{data.title}</div>
                                </a>
                              </div>
                            </NavigationMenuLink>
                          </>
                        )}
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                );
              })}
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-2 place-items-center gap-5">
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
  {theme === "light" ? "Dark" : "Light"}
</DropdownMenuItem>

                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div>
                  {users.id ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-800"
                          size="icon"
                          variant="ghost"
                        >
                          <FaUser />
                          <span className="sr-only">Toggle user menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={"/dashboard"}>
                          <DropdownMenuLabel>Dashboard</DropdownMenuLabel>
                        </Link>
                        <DropdownMenuSeparator />

                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-800"
                          size="icon"
                          variant="ghost"
                        >
                          <FaUser />
                          <span className="sr-only">Toggle user menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuSeparator />
                        <Link href={"/register"}>
                          <DropdownMenuItem>Register</DropdownMenuItem>
                        </Link>
                        <Link href={"/login"}>
                          <DropdownMenuItem>Login</DropdownMenuItem>
                        </Link>{" "}
                        <DropdownMenuSeparator />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbarsection;
