// External Libraries
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { describe, expect, it, beforeEach, afterEach } from '@jest/globals'

// Internal Modules
import { ApiClient } from './apiClient'
import { API_BASE_URL } from './constants'

describe('ApiClient', () => {
    // Variables for mocks and instances
    let mock: MockAdapter
    let apiClient: any
    let mockWindow: any

    // Set up mocks and instances before each test
    beforeEach(() => {
        mockWindow = { location: { href: '' } }
        mock = new MockAdapter(axios)
        apiClient = new ApiClient(axios, mockWindow)
    })

    // Reset mocks after each test
    afterEach(() => {
        mock.reset()
    })

    describe('spotifyOAuth', () => {
        it('should redirect to the Spotify OAuth login page', () => {
            apiClient.spotifyOAuth()
            expect(mockWindow.location.href).toBe(`${API_BASE_URL}/oauth/login`)
        })
    })

    describe('logout', () => {
        it('should logout the user and end the session', async () => {
            const mockData = { success: true }
            mock.onGet(`${API_BASE_URL}/oauth/logout`).reply(200, mockData)

            const response = await apiClient.logout()

            expect(response).toEqual(mockData)
        })
    })

    describe('checkSessionStatus', () => {
        it('should return session status data', async () => {
            const mockData = { isAuthenticated: true }
            mock.onGet(`${API_BASE_URL}/oauth/session-status`).reply(
                200,
                mockData
            )

            const response = await apiClient.checkSessionStatus()

            expect(response).toEqual(mockData)
        })
    })

    describe('getTasks', () => {
        it('should fetch tasks from the database', async () => {
            const mockTasks = [{ id: '1', title: 'Task 1' }]
            mock.onGet(`${API_BASE_URL}/tasks`).reply(200, mockTasks)

            const response = await apiClient.getTasks()

            expect(response).toEqual(mockTasks)
        })
    })

    describe('addTask', () => {
        it('should add a new task', async () => {
            const newTask = { title: 'New Task' }
            const responseData = { success: true, task: newTask }
            mock.onPost(`${API_BASE_URL}/gpt/generateplaylist`).reply(
                200,
                responseData
            )

            const response = await apiClient.addTask(newTask)

            expect(response).toEqual(responseData)
        })
    })

    describe('deleteTask', () => {
        it('should delete a task based on its ID', async () => {
            const mockData = { success: true }
            const taskId = '1234'
            mock.onDelete(`${API_BASE_URL}/tasks/${taskId}`).reply(
                200,
                mockData
            )

            const response = await apiClient.deleteTask(taskId)

            expect(response).toEqual(mockData)
        })
    })

    describe('getPlaylistCover', () => {
        it('should fetch a playlist cover based on task ID', async () => {
            const mockData = { coverURL: 'http://example.com/cover.jpg' }
            const taskId = '1234'
            mock.onGet(`${API_BASE_URL}/tasks/${taskId}/playlistcover`).reply(
                200,
                mockData
            )

            const response = await apiClient.getPlaylistCover(taskId)

            expect(response).toEqual(mockData)
        })
    })

    describe('error handling', () => {
        it('should throw error on checkSessionStatus failure', async () => {
            const errorResponse = { error: 'Server error' }
            mock.onGet(`${API_BASE_URL}/oauth/session-status`).reply(
                500,
                errorResponse
            )

            await expect(apiClient.checkSessionStatus()).rejects.toThrow(
                'Internal server error. Please try again later.'
            )
        })

        it('should throw error on resource not found', async () => {
            mock.onGet(`${API_BASE_URL}/oauth/session-status`).reply(404)

            await expect(apiClient.checkSessionStatus()).rejects.toThrow(
                'The requested resource was not found.'
            )
        })
    })
})
