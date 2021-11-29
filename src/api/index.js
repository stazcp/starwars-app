const BASE_URL = 'https://swapi.dev/api/'

export const fetchData = async (meta) => {
  return fetchUrl(BASE_URL + meta)
}

export const fetchPage = async (page) => {
  return fetchUrl(`${BASE_URL}people/?page=${page}`)
}

export const fetchPerson = async (id) => {
  return fetchUrl(`${BASE_URL}people/${id}/`)
}

export const fetchArray = async (array) => {
  let result = await Promise.all(
    array.map(async (x) => {
      let data = await fetchUrl(x)
      return data?.name
    })
  )
  return result?.length ? result : ['Not found']
}

export const fetchSearch = async (value) => {
  return fetchUrl(`${BASE_URL}people/?search=${value}`)
}

export const fetchUrl = async (url) => {
  try {
    let resp = await fetch(url)
    if (!resp.ok) throw new Error('Fetch failed!')
    let data = await resp.json()
    return data
  } catch (error) {
    console.error(error)
  }
}
