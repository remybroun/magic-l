import React, { useState, useEffect } from 'react';
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import { useRouter } from 'next/router';

import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  const router = useRouter()

  useEffect(() => {
      router.push('/alerts');
  }, [])

  return (
    <div className="max-w-screen-xl mx-auto">
      <Header/>
      
      <Footer/>
    </div>
  )
}
