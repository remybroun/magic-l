import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

const documentTypes = [
  { id: 1, title: 'Rapport' },
  { id: 2, title: 'Panorama' },
  { id: 3, title: 'Analyse' },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function SaveDocumentModal(props) {
  let [isOpen, setIsOpen] = useState(props.show)
  const [selectedDocumentType, setSelectedDocumentType] = useState(documentTypes[0])
  const [documentName, setDocumentName] = useState("")

  useEffect(() => {
    setIsOpen(props.show)
  }, [props])

  function closeModal() {
    setIsOpen(false)
    props.close()
  }

  function openModal() {
    setIsOpen(true)
  }



  return (

     <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 space-y-4">
                  <h3 className="text-xl text-gray-900 font-bold">Créer un document avec la selection</h3>
                    <div>
                      <p className="text-sm">Nom</p>
                      <input 
                        value={documentName}
                        onChange={(e)=>setDocumentName(e.target.value)}
                        type="text" 
                        className="rounded-lg w-full"
                        placeholder="Entrer un nom de document"/>
                    </div>



                    <div className="text-sm text-gray-900">Selectionner un type de document</div>
                    
                    {/*<div><div className="text-sm font-bold text-green-600">21 Selected items</div></div>*/}



                      <ul className="grid gap-3 w-full md:grid-cols-3">
                          <li>
                              <input type="radio" id="rapport" name="hosting" value="rapport" className="hidden peer" onClick={()=>{setSelectedDocumentType("rapport")}}/>
                              <label for="rapport" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                  <div className="block">
                                      <div className="w-full text-lg font-semibold">Rapport</div>
                                  </div>
                                  <CheckCircleIcon className="w-4 h-4"/>
                              </label>
                          </li>
                          <li>
                              <input type="radio" id="panorama" name="hosting" value="panorama" className="hidden peer" onClick={()=>{setSelectedDocumentType("panorama")}}/>
                              <label for="panorama" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                  <div className="block">
                                      <div className="w-full text-lg font-semibold">Panorama</div>
                                  </div>
                                  <CheckCircleIcon className="w-4 h-4"/>
                              </label>
                          </li>
                          <li>
                              <input type="radio" id="analyse" name="hosting" value="analyse" className="hidden peer" onClick={()=>{setSelectedDocumentType("analyse")}}/>
                              <label for="analyse" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                  <div className="block">
                                      <div className="w-full text-lg font-semibold">Analyse</div>
                                  </div>
                                  <CheckCircleIcon className="w-4 h-4"/>
                              </label>
                          </li>
                      </ul>
                      {/*{documentTypes.map((mailingList) => (
                        <RadioGroup.Option
                          key={mailingList.id}
                          value={mailingList}
                          className={({ checked, active }) =>
                            classNames(
                              checked ? 'border-transparent' : 'border-gray-300',
                              active ? 'border-green-600 ring-2 ring-green-600' : '',
                              'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <div>
                              <span className="flex flex-1">
                                <span className="flex flex-col">
                                  <RadioGroup.Label as="span" className="block text-lg font-bold text-gray-900 py-2">
                                    {mailingList.title}
                                  </RadioGroup.Label>
                                </span>
                              </span>
                              <CheckCircleIcon
                                className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-green-600')}
                                aria-hidden="true"
                              />
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-green-600' : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-lg'
                                )}
                                aria-hidden="true"
                              />
                            </div>
                          )}
                        </RadioGroup.Option>
                      ))}*/}


                <div className="sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => props.createDocument({name:documentName, type:selectedDocumentType})}
                  >
                    Create document
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => closeModal()}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

  )
}
