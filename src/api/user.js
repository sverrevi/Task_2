import { createHeaders } from "./index" 
const apiURL = process.env.REACT_APP_API_URL

//methos that checks if user exists upon login
const checkForUser = async (username) => { 
    try {
        const response = await fetch(`${apiURL}?username=${username}`)
        if (!response.ok){
            throw new Error('Could not complete request.')
        }
        const data = await response.json()
        return [ null, data ]
    }
    catch (error) {
        return [ error.message, [] ]

    }
}

//creates new user in the backend
const createUser = async (username) => {
    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify({
                username,
                translations: []
            })
        })
        if (!response.ok){
            throw new Error('Could not create user with username' + username)
        }
        const data = await response.json()
        return [ null, data ]
    }
    catch (error) {
        return [ error.message, [] ]

    }

}

//Method that updates the list of translations in the user object
export const storeTranslationData = async (id, translations) =>{
    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'PATCH',
            headers: createHeaders(),
            body: JSON.stringify({
                translations: translations
            })
        })
        if (!response.ok){
            throw new Error('Could not save translations')
        }
        const data = await response.json()
        return [ null, data ]
    }
        catch (error){
            return [ error.message, [] ]
        }


}


//method that either returns an existsing user, or returns a new one if one already exists
export const loginUser = async (username) =>{
    const [ checkError, user ] = await checkForUser(username)

    if (checkError !== null){
        return [checkError, null]
    }

    if (user.length > 0){
        return [null, user.pop()]
    }
    
    return await createUser(username)

}
