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
export interface IResponse {
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
     * <>@todo set up endpoint for fetching tasks from database
     */
    async getTasks(): Promise<IResponse> {
        return this.request({ endpoint: 'tasks/', method: 'GET' })
    }

    async addTask(task: any): Promise<IResponse> {
        return this.request({ endpoint: 'gpt/generateplaylist', method: 'POST', data: task })
    }

    async deleteTask(taskId: string): Promise<IResponse> {
        return this.request({ endpoint: `tasks/${taskId}`, method: 'DELETE' })
    }

    /**
     * @todo modify route response interfaces/types
     */
    async getPlaylistCover(taskId: string): Promise<IResponse> {
        return this.request({ endpoint: `tasks/${taskId}/playlistcover`, method: 'GET' })
    }
}

export default new ApiClient(API_BASE_URL)
