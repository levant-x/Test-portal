import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    fetch('/api/articles/all', {
      method: 'GET',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(
      resp => resp.json().then(data => console.warn(data))
    ).catch(er => console.error(er));
    console.log('test api call sent');
  }, [])

  return (
    <>
      Will be feed here
    </>
  )
}