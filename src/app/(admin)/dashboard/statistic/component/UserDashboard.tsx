'use client'
import { baseUrl } from "@/app/utils/databases";
import { BoxIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { BarChart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface IUser {
  name: string,
  email: string,
  contact: string,
}



const UsersDashboard = () => {

  const [dataUsers, setdataUsrs] = useState<IUser[]>([]);

  const getdataUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/`)
      setdataUsrs(response.data.data)
      console.log(response.data.data);

    } catch (error) {
      console.log('data error');

    }
  }

  useEffect(() => {
    getdataUsers()
  }, [])

  const data = [
    {
      name: 'User A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'User B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'User C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'User D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'User E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'User F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'User G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px]">
        <Link className="lg:hidden" href="#">
          <BoxIcon className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </Link>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Statistic</h1>

        </div>
        <div className="rounded-lg border shadow-sm">
          <div className="grid  gap-5 m-5">
            <div className="">

              <ResponsiveContainer width="100%" height={200} className="my-5">
                <LineChart
                  width={500}
                  height={300}
                  data={data}
                  syncId="anyId"
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                </LineChart>
              </ResponsiveContainer>


              <ResponsiveContainer width="100%" height={200} className="my-5">
                <LineChart
                  width={500}
                  height={300}
                  data={data}
                  syncId="anyId"
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
                  <Brush />
                </LineChart>
              </ResponsiveContainer>

              <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                  width={500}
                  height={300}
                  data={data}
                  syncId="anyId"
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
              </ResponsiveContainer>



            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

export default UsersDashboard