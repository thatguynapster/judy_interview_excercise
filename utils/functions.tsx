import Router from 'next/router'

export function navigate(page_name = '', query = null) {
  Router.push({
    pathname: `/${page_name}`,
    query: query
  })
}

// let reqOptions = {
//     endpoint: '',
//     queries: '',
// }
export async function mkGetReq(reqOptions: { endpoint: string; queries: string }) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}${reqOptions.endpoint}?${reqOptions.queries}`
  // console.log(url)

  const options = {
    method: 'GET',
    cors: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
      // 'x-user-agent': 'Agency Swoove Agency-Panel 1.0.0'
    }
  }

  const request = await fetch(`${reqOptions.endpoint}?${reqOptions.queries}`, options)
  const results = await request.json()

  return results
}