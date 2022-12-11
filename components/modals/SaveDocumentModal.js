import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

const documentTypes = [
  { id: 1, title: 'Rapport', description: 'Last message sent an hour ago', users: '621 users' },
  { id: 2, title: 'Panorama', description: 'Last message sent 2 weeks ago', users: '1200 users' },
  { id: 3, title: 'Analyse', description: 'Last message sent 4 days ago', users: '2740 users' },
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
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all space-y-4">
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
                  <RadioGroup value={selectedDocumentType} onChange={setSelectedDocumentType}>


                    <RadioGroup.Label className="text-sm text-gray-900">Selectionner un type de document</RadioGroup.Label>
                    
                    {/*<div><RadioGroup.Label className="text-sm font-bold text-green-600">21 Selected items</RadioGroup.Label></div>*/}


                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                      {documentTypes.map((mailingList) => (
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
                            <>
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
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                <div className="sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => props.createDocument({name:documentName, type:selectedDocumentType.title})}
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
      </Transition>
    </>
  )
}
