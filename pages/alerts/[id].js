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
	
	if(!id)
		return {
			props: {  }
		}

	return {
		props: { id }
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
	  
	  try {
	    api.alerts().one(props.id).then((response)=>{
	    	setAlert(response.data)
	    })
	  } catch (err) { console.log(err) };

  }

  useEffect(() => {

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
											  <dt className="text-sm font-medium text-gray-500">Title</dt>
											  <dd className="mt-1 text-sm text-gray-900">{alert?.title}</dd>
											</div>
											<div className="sm:col-span-1">
											  <dt className="text-sm font-medium text-gray-500">Alarm date</dt>
											  <dd className="mt-1 text-sm text-gray-900">{moment(alert?.alarm_date).format('llll')}</dd>
											</div>
											<div className="sm:col-span-1">
											  <dt className="text-sm font-medium text-gray-500">End</dt>
											  <dd className="mt-1 text-sm text-gray-900">{moment(alert?.end).format('llll')}</dd>
											</div>
											<div className="sm:col-span-1">
											  <dt className="text-sm font-medium text-gray-500">Journalist</dt>
											  <dd className="mt-1 text-sm text-gray-900">{alert?.journalist}</dd>
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
											  <dt className="text-sm font-medium text-gray-500">Start</dt>
											  <dd className="mt-1 text-sm text-gray-900">{moment(alert?.start).format('llll')}</dd>
											</div>
											<div className="sm:col-span-1">
											  <dt className="text-sm font-medium text-gray-500">Summary</dt>
											  <dd className="mt-1 text-sm text-gray-900">{alert?.summary}</dd>
											</div>
											<div className="sm:col-span-1">
											  <dt className="text-sm font-medium text-gray-500">Video Link</dt>
											  <a className="mt-1 text-sm text-indigo-500" href={alert?.video_link} >{alert?.video_link}</a>
											</div>
                    </dl>
                  </div>
{/*                  <div>
                    <a
                      href="#"
                      className="block bg-gray-50 px-4 py-4 text-center text-sm font-medium text-gray-500 hover:text-gray-700 sm:rounded-b-lg"
                    >
                      Read full application
                    </a>
                  </div>*/}
                </div>
              </section>
            </div>
      <Footer/>
		</div>
	)
}

export default AlertDetails