import React, { useState, useEffect } from 'react';
import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {api} from '../../api'
import * as moment from 'moment';
import { useRouter } from 'next/router';



export const POSTS_PER_PAGE = 5


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export async function getStaticProps() {

  const posts = await getAllFilesFrontMatter('blog')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

export default function Transcripts({ posts, initialDisplayPosts, pagination }) {
  const [alerts, setAlerts] = useState([])
  const router = useRouter()

  const getData = () => {

    api.transcripts().get().then((response)=>{
      console.log(response)
      setAlerts(response.data.results)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="max-w-screen-xl mx-auto">
      <Header/>
      <div className="max-w-screen-xl mx-auto">

        <div className="px-4 sm:px-6 lg:px-8  max-w-screen-xl mx-auto">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Transcripts</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the alerts.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
              >
                Add entry
              </button>
            </div>
          </div>

            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                            Date
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                            Program
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                            Source
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                            Text
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
                            className={classNames(index === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t hover:bg-gray-100 cursor-pointer')}
                          >
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">{moment(alert.start).format('ll')}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">{alert.program}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">{alert.source}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white max-w-sm truncate">{alert.text}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <div className="text-green-600 hover:text-green-900 cursor-pointer" onClick={()=>{ router.push("alerts/" + alert.pk) }}>
                                See details &rarr;
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
