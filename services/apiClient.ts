import axios, { AxiosResponse } from 'axios'
import { API_BASE_URL } from './constants'

/**
 * Configuration for API requests
 */
interface IConfig {
    endpoint: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    data?: any
}

/**
 * Structure of the response from API requests
 */
interface IResponse {
    data: any
    error: any | null
}

/**
 * Class for making requests to the API
 */
class ApiClient {
    private remoteHostUrl: string
    private token: string | null

    /**
     * Constructor for the ApiClient class
     * @param remoteHostUrl - Base URL for the API
     */
    constructor(remoteHostUrl: string) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
    }

    /**
     * Sets the token for authentication
     * @param token - JWT token
     */
    setToken(token: string): void {
        this.token = token
    }

    /**
     * Makes a request to the API
     * @param {IConfig} config - Configuration for the request
     * @returns {Promise<IResponse>} Response from the server
     */
    async request({
        endpoint,
        method,
        data = {}
    }: IConfig): Promise<IResponse> {
        const url = `${this.remoteHostUrl}/${endpoint}`
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        }

        try {
            const res: AxiosResponse<IResponse> = await axios({
                url,
                method,
                data,
                headers
            })
            return { data: res.data, error: null }
        } catch (error: any) {
            console.error(error.response?.status, error.response?.data.error)
            throw error
        }
    }

    /**
     * Initiates OAuth with Spotify
     * @returns {Promise<IResponse>} Response from the server
     */
    async spotifyOAuth(): Promise<IResponse> {
        return this.request({
            endpoint: '/login',
            method: 'GET'
        })
    }

    /**
     * Fetches the current user's profile from Spotify
     * @returns {Promise<IResponse>} The current user's profile data or an error message
     */
    async spotifyGetMe(): Promise<IResponse> {
        return this.request({ endpoint: 'auth/me', method: 'GET' })
    }
}

export default new ApiClient(API_BASE_URL)
