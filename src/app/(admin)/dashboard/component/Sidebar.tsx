"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { BellIcon, BoxIcon, HomeIcon } from "@radix-ui/react-icons";
import { FaChartBar, FaQuestion, FaServicestack, FaUser } from "react-icons/fa6";
const Sidebar = () => {

  const [focusedLink, setFocusedLink] = useState(false);
  const [color, setColor] = useState(false);

  const dataSidebar = [{
    link: "/dashboard",
    title: "Home",
    icon: HomeIcon,
  }, {
    link: "/dashboard/users",
    title: "Users"

    , icon: FaUser
  }, {
    link: "/dashboard/services",
    title: "Services",
    icon: FaServicestack

  }, {
    link: "/dashboard/faq",
    title: "FAQ",
    icon: FaQuestion

  },
  {
    link: "/dashboard/statistic",
    title: "Statistic",
    icon: FaChartBar

  },]


  useEffect(() => {
    setColor(focusedLink)
  }, [focusedLink])

  return (
    <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <BoxIcon className="h-6 w-6" />
            <span className="">SNB ADMIN</span>
          </Link>
          <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Toggle notifications SNB</span>
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {dataSidebar.map((data, index) => {
              return (
                <Link
                  key={index}
                  href={data.link}
                >
                  <Button onClick={() => setFocusedLink(!focusedLink)} className={`flex gap-3 w-[200px] rounded-lg my-2 transition-all duration-500 ${color ? " focus:bg-yellow-300" : "focus:bg-gray-100"}`}>
                    <data.icon className="h-4 w-4" />
                    {data.title}
                  </Button>

                </Link>

              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar