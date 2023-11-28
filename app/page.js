'use client';
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react';

export default function Home() {

  const [zip, setZip] = useState()
  const [age, setAge] = useState()
  const [rooms, setRooms] = useState()
  const [baths, setBaths] = useState()
  const [garages, setGarages] = useState()
  const [stories, setStories] = useState()
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [price, setPrice] = useState()
  const [location, setLocation] = useState()
  const [query, setQuery] = useState();

  const Submit = async () => {
    setLoading(true)
    const res = await fetch('http://localhost:3000/api', {
      method: "POST",
      body: JSON.stringify({
        zip, age, rooms, baths, garages, stories
      })
    })
    const { price, location } = await res.json()
    setPrice(price)
    setLoading(false)
    setLocation(location)
  }

  const SubmitString = async () => {
    setLoading2(true)
    const res = await fetch('http://localhost:3000/api/string', {
      method: "POST",
      body: JSON.stringify({query})
    })
    const { price, location } = await res.json()
    setPrice(price)
    setLoading2(false)
    setLocation(location)

  }

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>House Price Estimator Tool</h1>
      <p className={styles.description}>Get an instant house price estimation. Fill out the following information.</p>
      <div className={styles.row}>
        <input onChange={e => setZip(e.target.value)} className={styles.textInput} type='text' placeholder='Zip Code'></input>
        <input onChange={e => setAge(e.target.value)} className={styles.textInput} type='text' placeholder='House Age (in years)'></input>
        <input onChange={e => setRooms(e.target.value)} className={styles.textInput} type='text' placeholder='Number of bedrooms'></input>
      </div>
      <div className={styles.row}>
        <input onChange={e => setBaths(e.target.value)} className={styles.textInput} type='text' placeholder='Number of bathrooms'></input>
        <input onChange={e => setGarages(e.target.value)} className={styles.textInput} type='text' placeholder='Number of garages'></input>
        <input onChange={e => setStories(e.target.value)} className={styles.textInput} type='text' placeholder='Number of stories'></input>
      </div>
      <div className={styles.row}>
        {!loading && <button onClick={Submit} className={styles.button}>Get Price </button>}
        {loading && <div className={styles.ldsDualRing}></div>}
      </div><br />
        <h1 className={styles.description}>OR</h1><br />
        <input placeholder='Enter your housing query here with the above information...' onChange={e => setQuery(e.target.value)} type='text' className={styles.queryInput}></input>
        <div className={styles.row}>
        {!loading2 && <button onClick={SubmitString} className={styles.button}>Get Price </button>}
        {loading2 && <div className={styles.ldsDualRing}></div>}
      </div><br />
      {price &&
        <div className={styles.overlay}>
          <div className={styles.response}>
            <h3>Your Property is valued at:</h3>
            <h1 className={styles.price}>${price}.00</h1>
            <p className={styles.desc}>Based on the following details:</p>
            <div className={styles.attributesWrapper}>
              <p className={styles.attributes}><b>Zip Code: </b>{zip}({location})</p>
              <p className={styles.attributes}><b>House Age: </b>{age}</p>
              <p className={styles.attributes}><b>Bedroom Count: </b>{rooms}</p>
              <p className={styles.attributes}><b>Bathroom Count: </b>{baths}</p>
              <p className={styles.attributes}><b>Garage Count: </b>{garages}</p>
              <p className={styles.attributes}><b>Stories: </b>{stories}</p>
            </div>
          <div className={styles.closeButton} onClick={() => setPrice()}>Start Again</div>
          </div>
        </div>}
    </main>
  )
}
