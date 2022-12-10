import React, { useState, useEffect } from 'react';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {api} from '../../api'


export const getStaticPaths = async (context) => {
		
    
    // api.alerts().get(1).then((response)=>{

    //   totalPages = Math.ceil(response.data.count / 5)

    // })

    return { paths: [], fallback: true };
  }


export const getStaticProps = async (context) => {
	const id = context.params.id
	// const resp = MAKE API CALL FOR 1 OBJ
	let alert = {}
	console.log(id)
	if(!id)
		return {
			props: {  }
		}
  api.alerts().one(id).then((response)=>{
    alert = response.data
  })

	return {
		props: { alert, id }
	}
}


const AlertDetails = (props) => {
	const [alert, setAlert] = useState({})
  const getData = () => {

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    let page = urlParams.get('page') || 1;
    if (!props.id)
    	return
    api.alerts().one(props.id).then((response)=>{
    	setAlert(response.data)
    	console.log(response)
    })
  }

  useEffect(() => {
  	console.log(props)
    getData()

  }, [props])

	return (
    <div className="max-w-screen-xl mx-auto">
      <Header/>

          <div className="mx-auto mt-8 w-full gap-6 sm:px-6 lg:grid-flow-col-dense lg:grid-cols-3">

              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                      Alert Information
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">

<div className="sm:col-span-1">
  <dt className="text-sm font-medium text-gray-500">Alarm_date</dt>
  <dd className="mt-1 text-sm text-gray-900">{alert?.alarm_date}</dd>
</div>
<div className="sm:col-span-1">
  <dt className="text-sm font-medium text-gray-500">End</dt>
  <dd className="mt-1 text-sm text-gray-900">{alert?.end}</dd>
</div>
<div className="sm:col-span-1">
  <dt className="text-sm font-medium text-gray-500">Journalist</dt>
  <dd className="mt-1 text-sm text-gray-900">{alert?.journalist}</dd>
</div>
<div className="sm:col-span-1">
  <dt className="text-sm font-medium text-gray-500">Key_words</dt>
  <dd className="mt-1 text-sm text-gray-900">{alert?.key_words}</dd>
</div>
<div className="sm:col-span-1">
  <dt className="text-sm font-medium text-gray-500">Program</dt>
  <dd className="mt-1 text-sm text-gray-900">{alert?.program}</dd>
</div>
<div className="sm:col-span-1">
  <dt className="text-sm font-medium text-gray-500">Source</dt>
  <dd className="mt-1 text-sm text-gray-900">{alert?.source}</dd>
</div>
<div className="sm:col-span-1">
  <dt className="text-sm font-medium text-gray-500">Start</dt>
  <dd className="mt-1 text-sm text-gray-900">{alert?.start}</dd>
</div>
<div className="sm:col-span-1">
  <dt className="text-sm font-medium text-gray-500">Summary</dt>
  <dd className="mt-1 text-sm text-gray-900">{alert?.summary}</dd>
</div>
<div className="sm:col-span-1">
  <dt className="text-sm font-medium text-gray-500">Title</dt>
  <dd className="mt-1 text-sm text-gray-900">{alert?.title}</dd>
</div>
<div className="sm:col-span-1">
  <dt className="text-sm font-medium text-gray-500">Video_link</dt>
  <dd className="mt-1 text-sm text-gray-900">{alert?.video_link}</dd>
</div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">About</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat.
                          Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                          proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                        </dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                        <dd className="mt-1 text-sm text-gray-900">

                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <a
                      href="#"
                      className="block bg-gray-50 px-4 py-4 text-center text-sm font-medium text-gray-500 hover:text-gray-700 sm:rounded-b-lg"
                    >
                      Read full application
                    </a>
                  </div>
                </div>
              </section>
            </div>
      <Footer/>
		</div>
	)
}

export default AlertDetails