import React, { useState, useEffect } from 'react';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {api} from '../../api'
import * as moment from 'moment';
import { useRouter } from 'next/router';
import Pagination from '@/components/Pagination'
import SearchBar from '@/components/Searchbar'
import SaveDocumentModal from '@/components/modals/SaveDocumentModal'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Transcripts(props) {
  const [transcripts, setTranscripts] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])
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
    let search = urlParams.get('search');

    api.transcripts().get({page, search}).then((response)=>{
      setPagination({
        totalPages:Math.ceil(response.data.count / 5),
        currentPage:page,
        count:response.data.count,
      })
      setTranscripts(response.data.results)
    })
  }

  const exportData = (e) => {
    setModalOpen(!modalOpen);
  }

  const removeParams = (param) => {
    const params = new URLSearchParams(router.query);
    params.delete(param);
    router.replace({ pathname:router.pathname, query: params.toString() }, undefined, { shallow: true });
  };

  const createDocument = ({type, name}) => {
    let items = Object.keys(selectedItems).map(key => {return parseInt(key)});
    api.documents().createDocument({type:type.toLowerCase(), name, alerts:items})
    setSelectedItems([])
    setModalOpen(false)
  }

  const searchForTerm = (term) => {
    let page = 0

    if (!term){
      removeParams('search')
      return
    }

    router.query.search = term
    router.push(router)

    getData()

  }

  const addToList = (e) => {
    let newSelectedTranscripts = {...selectedItems};

    if (newSelectedTranscripts[e.target.id])
      delete newSelectedTranscripts[e.target.id]
    else
      newSelectedTranscripts[e.target.id] = true
    setSelectedItems(newSelectedTranscripts)
  }

  useEffect(() => {
    getData()
  }, [props])


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
            <SearchBar/>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                onClick={exportData}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto"
              >
                Export
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
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                            Select
                          </th>
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
                        {transcripts.map((transcript, index) => (
                          <tr
                            key={index}
                            className={classNames(index === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t hover:bg-gray-100 cursor-pointer')}
                          >
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white flex items-center">
                              <input
                                id={transcript.pk}
                                name={transcript.pk}
                                type="checkbox"
                                onChange={addToList}
                                checked={selectedItems[transcript.pk]}
                                className="h-6 w-6 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                              />
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">{moment(transcript.start).format('ll')}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">{transcript.program}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">{transcript.source}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white max-w-sm truncate">{transcript.text}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <div className="text-green-600 hover:text-green-900 cursor-pointer" onClick={()=>{ router.push("transcripts/" + transcript.pk) }}>
                                See details &rarr;
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Pagination path="/transcripts" pagination={pagination}/>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <SaveDocumentModal 
        show={modalOpen} 
        close={()=>setModalOpen(false)}
        createDocument={createDocument}/>
      <Footer/>
    </div>
  )
}
