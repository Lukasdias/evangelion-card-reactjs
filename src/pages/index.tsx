import Head from 'next/head'
import { GetServerSideProps } from 'next';

import { ExperienceBar } from "../components/ExperienceBar";

import { Header } from '../components/Header';
import { TitleForm } from '../components/TitleForm';
import { AccountProvider } from '../contexts/AccountContext';

interface HomeProps {
  level: number;
  currentExperience: number,
  picturesCompleted: number,
}


export default function Home(props: HomeProps) {
  return (

    <AccountProvider
      level={props.level}
      currentExperience={props.currentExperience}
      picturesCompleted={props.picturesCompleted}
    >
      <div className='container'>
        <Head>
          <title>
            Inicio | Card Generator
          </title>
        </Head>

        <Header />
        <TitleForm />
      </div>

    </AccountProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //chamada api
  const { level, currentExperience, picturesCompleted } = ctx.req.cookies;


  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      picturesCompleted: Number(picturesCompleted),
    }
  }
}