export default async function makeApiCall(url) {
    const response = await fetch(url)
    if(!response.ok) {
        throw new Error(`Could not make API call, url: ${url}, status: ${response.status}`)
    }
    const json = await response.json()
    return json
}