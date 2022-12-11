import React, { useState, useEffect } from 'react';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {api} from '../../api'
import * as moment from 'moment';


export const getStaticPaths = async (context) => {
    return { paths: [], fallback: true };
  }


export const getStaticProps = async (context) => {
	const id = context.params.id
	// const resp = MAKE API CALL FOR 1 OBJ
	let alert = {}

	if(!id)
		return {
			props: {  }
		}
  api.transcripts().one(id).then((response)=>{
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
    api.transcripts().one(props.id).then((response)=>{
    	setAlert(response.data)
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
                      Transcript Information
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
		                  <div className="sm:col-span-2">
		                    <dt className="text-sm font-medium text-gray-500">Text</dt>
		                    <dd className="mt-1 text-sm text-gray-900">
		                      {alert?.text}
		                    </dd>
		                  </div>
											<div className="sm:col-span-1">
											  <dt className="text-sm font-medium text-gray-500">Alarm date</dt>
											  <dd className="mt-1 text-sm text-gray-900">{moment(alert?.alarm_date).format('llll')}</dd>
											</div>
											<div className="sm:col-span-1">
											  <dt className="text-sm font-medium text-gray-500">Participants</dt>
											  <dd className="mt-1 text-sm text-gray-900">{alert?.participants}</dd>
											</div>
											<div className="sm:col-span-1">
											  <dt className="text-sm font-medium text-gray-500">Start</dt>
											  <dd className="mt-1 text-sm text-gray-900">{moment(alert?.start).format('llll')}</dd>
											</div>
											<div className="sm:col-span-1">
											  <dt className="text-sm font-medium text-gray-500">End</dt>
											  <dd className="mt-1 text-sm text-gray-900">{moment(alert?.end).format('llll')}</dd>
											</div>
											<div className="sm:col-span-1">
											  <dt className="text-sm font-medium text-gray-500">Key words</dt>
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
											  <dt className="text-sm font-medium text-gray-500">Video Link</dt>
											  <a className="mt-1 text-sm text-indigo-500" href={alert?.video_link} >{alert?.video_link}</a>
											</div>
                    </dl>
                  </div>

                </div>
              </section>
            </div>
      <Footer/>
		</div>
	)
}

export default AlertDetails