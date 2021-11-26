const BASE_URL = 'https://swapi.dev/api/'

export const fetchData = async (meta) => {
  return fetchUrl(BASE_URL + meta)
}

export const fetchPage = async (page) => {
  return fetchUrl(`${BASE_URL}people/?page=${page}`)
}

export const fetchUrl = async (url) => {
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
