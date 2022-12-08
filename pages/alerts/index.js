import React, { useState, useEffect } from 'react';
import ListLayout from '@/layouts/ListLayout'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Pagination from '@/components/Pagination'
import {api} from '../../api'
import * as moment from 'moment';
import { useRouter } from 'next/router';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Alerts(props) {
  const [alerts, setAlerts] = useState([])
  const [pagination, setPagination] = useState({
        totalPages:0,
        currentPage:0,
        count:0,
      })
  const router = useRouter()

  const getData = () => {

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    let page = urlParams.get('page') || 1;


    api.alerts().get(page).then((response)=>{
      setPagination({
        totalPages:Math.ceil(response.data.count / 5),
        currentPage:page,
        count:response.data.count,
      })
      setAlerts(response.data.results)
    })
  }

  useEffect(() => {

    getData()

  }, [props])

  return (
    <div className="max-w-screen-xl mx-auto">
      <Header/>
      <div className="mx-auto">

        <div className="px-4 sm:px-6 lg:px-8  max-w-screen-xl mx-auto">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Alerts</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the alerts.
              </p>
            </div>
{/*            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
              >
                Add entry
              </button>
            </div>*/}
          </div>

            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                            Name
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                            Program
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                            Journalist
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                            Date
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y dark:divide-gray-700 divide-gray-200 bg-white dark:bg-gray-800">
                        {alerts.map((alert, index) => (
                          <tr
                            key={index}
                            className={classNames(index === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                              {alert.title}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">{alert.program}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">{alert.journalist}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">{moment(alert.start).format('llll')}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <div className="text-green-600 hover:text-green-900 cursor-pointer" onClick={()=>{ router.push("alerts/" + alert.pk) }}>
                                See details &rarr;
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Pagination path="/alerts" pagination={pagination}/>
                  </div>
                </div>
              </div>
            </div>
      </div>


      </div>
      <Footer/>
    </div>
  )
}
