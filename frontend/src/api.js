const urlBase = 'https://dummy/'

export async function callBackend(url,method,params,body){


    const urlFull = urlBase + url

    let globalHeaders  = {}

    if (body) {
        globalHeaders['Content-Type'] = 'application/json'
    }

    let urlObj = new URL(urlFull)

    if (params) {
        Object.keys(params).forEach(key => urlObj.searchParams.append(key, params[key]))
    }

    const response = await fetch(`/${url}`, {
        method: method,
        headers: globalHeaders,
        credentials:'include',
        body: body && JSON.stringify(body),
    })

    if (response.status >= 400) {
        let returnError = {}
        returnError.code = response.status
        returnError.message = response.statusText
        returnError.details = await response.json().catch(ex => null)


        throw returnError
    }

    try {
        const json = await response.json()
        return json
    }
    catch (ex) {
        
        console.error(ex)
        throw ex
    }   

}