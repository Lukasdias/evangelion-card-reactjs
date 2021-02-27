import Head from 'next/head'

import { ExperienceBar } from "../components/ExperienceBar";
import { Header } from '../components/Header';
import { TitleForm } from '../components/TitleForm';


export default function Home() {
  return (
    <div className='container'>
      <Header />
      <TitleForm />
    </div>
  )
}
