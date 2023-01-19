import Head from 'next/head'
import Image from 'next/image'

import { useState } from 'react'

import { Configuration, OpenAIApi } from 'openai'

import styles from 'styles/Home.module.css'

const Home = () => {
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState('')

  const size = '400'

  const config = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY
  })

  const openai = new OpenAIApi(config)

  const generateImage = async () => {
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: '1024x1024'
    })

    setImage(res.data.data[0].url)
  }

  return <>
    <Head>
      <title>Generador de imágenes | ChatGPT</title>
      <meta name='description' content='Generated by create next app' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='favicon.png' />
    </Head>

    <div className={styles.app__main}>
      <h3>Genera una imagen usando Open AI Api</h3>
      <form>
        <input
          className={styles.app__input}
          placeholder='Escriba algo para generar una imagen...'
          onChange={e => setPrompt(e.target.value)}
        />
        <input
        type='button'
        value='Generar'
        onClick={generateImage}
        className={styles.app__button}
        />
      </form>

      {
        image.length > 0 ?
          <Image
            src={image}
            alt='Imagen generada'
            width={size}
            height={size}
            className={styles.image}
          />
        : <></>
      }
    </div>
  </>
}

export default Home