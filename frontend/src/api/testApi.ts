import api from './api'

export const testApi = async () => {
  try {
    const response = await api.get('/')

    console.log('Backend Response:', response.data)
  } catch (error) {
    console.error('Backend Connection Error:', error)
  }
}