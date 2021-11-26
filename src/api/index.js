const BASE_URL = 'https://swapi.dev/api/'

export const fetchData = async (meta) => {
  try {
    let resp = await fetch(BASE_URL + meta)
    if (!resp.ok) throw new Error('Fetch failed!')
    let data = await resp.json()
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
  }
}

export const fetchNextPage = async (url) => {
  try {
    let resp = await fetch(url)
    if (!resp.ok) throw new Error('Fetch failed!')
    let data = await resp.json()
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
  }
}
