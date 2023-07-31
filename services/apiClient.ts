// External libraries
import axios, { AxiosResponse, Method } from 'axios'

// Internal modules
import { API_BASE_URL } from './constants'
import { APIError, ERROR_MAP, HttpStatusCodes } from './apiError'
import Task from '../interfaces/Task'
import Response from '../interfaces/Response'
import SessionResponse from '../interfaces/SessionResponse'
import PlaylistCover from '../interfaces/PlaylistCover'

interface Config {
    endpoint: string
    method: Method
    data?: unknown
}

interface TaskFormData {
    task: {
        taskName: string
        category: string
        vibe: string
        timer: number
    }
    token: string
}

enum HTTPMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

class ApiClient {
    private axiosInstance: typeof axios
    private windowObject: Window | null

    constructor(axiosInstance: any, windowObject?: any) {
        this.axiosInstance = axiosInstance
        this.axiosInstance.defaults.headers.common['Content-Type'] =
            'application/json'
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}'`
        this.windowObject =
            windowObject || (typeof window !== 'undefined' ? window : null)
    }

    /**
     * Sends a request to the specified endpoint.
     */
    async request<T>({
        endpoint,
        method,
        data = {}
    }: Config): Promise<Response<T>> {
        try {
            const res: AxiosResponse<Response<T>> = await this.axiosInstance({
                url: `${API_BASE_URL}/${endpoint}`,
                method,
                data,
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            return res.data
        } catch (error: any) {
            const errorMessage =
                error.response &&
                typeof error.response.status === 'number' &&
                error.response.status in HttpStatusCodes
                    ? ERROR_MAP[error.response.status] ||
                      error.response.data.error
                    : 'An unexpected error occurred.'

            throw new APIError(
                errorMessage,
                error.response.status,
                endpoint,
                error
            )
        }
    }

    /**
     * Starts Spotify OAuth process.
     */
    async spotifyOAuth() {
        if (this.windowObject) {
            this.windowObject.location.href = `${API_BASE_URL}/oauth/login`
        } else {
            console.error('Window object is not available.')
        }
    }

    /**
     * Ends the user session.
     */
    async logout() {
        return this.request({
            endpoint: 'oauth/logout',
            method: HTTPMethods.GET
        })
    }

    /**
     * Verifies user session status.
     */
    async checkSessionStatus(): Promise<Response<SessionResponse>> {
        return this.request({
            endpoint: 'oauth/session-status',
            method: HTTPMethods.GET
        })
    }

    /**
     * Retrieves all tasks.
     */
    async getTasks(token: string): Promise<Response<Task[]>> {
        return this.request({
            endpoint: 'tasks',
            method: HTTPMethods.POST,
            data: { token }
        })
    }

    /**
     * Adds a new task.
     */
    async addTask({ task, token }: TaskFormData): Promise<Response> {
        return this.request({
            endpoint: 'gpt/generateplaylist',
            method: HTTPMethods.POST,
            data: { task, token }
        })
    }

    /**
     * Removes a task based on its ID.
     */
    async deleteTask(playlistId: string): Promise<Response> {
        return this.request({
            endpoint: `tasks/delete/${playlistId}`,
            method: HTTPMethods.DELETE
        })
    }

    /**
     * Fetches playlist cover by task ID.
     */
    async getPlaylistCover(
        playlistId: string
    ): Promise<Response<PlaylistCover>> {
        return this.request({
            endpoint: `tasks/${playlistId}/playlistcover`,
            method: HTTPMethods.GET
        })
    }

    /**
     * Fetches users access token
     */
    async fetchAccessToken(): Promise<Response> {
        return this.request({endpoint: 'oauth/spotifyuser', method: 'GET'})
    }
}

export default new ApiClient(axios)
export { ApiClient }
