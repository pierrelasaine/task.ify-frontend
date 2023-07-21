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

    /**
     * Constructor for the ApiClient class
     * @param remoteHostUrl - Base URL for the API
     */
    constructor(remoteHostUrl: string) {
        this.remoteHostUrl = remoteHostUrl
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
            'Content-Type': 'application/json'
        }

        try {
            const res: AxiosResponse<IResponse> = await axios({
                url,
                method,
                data,
                headers,
                withCredentials: true
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
    async spotifyOAuth() {
        window.location.href = 'http://localhost:3001/oauth/login'
    }

    /**
     * Checks session status to see if user is authenticated.
     * @returns {Promise<IResponse>} Response from the server
     */
    async checkSessionStatus() {
        const sessionStatus = this.request({
            endpoint: 'oauth/session-status',
            method: 'GET'
        })

        return sessionStatus
    }

    async logout() {
        return this.request({ endpoint: 'oauth/logout', method: 'GET' })
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
