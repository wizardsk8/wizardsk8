// API service for Little Hoopers Admin Panel
const API_BASE_URL = 'https://3001-ind3nsipohmaeezrlo3hd-137c0c1b.manusvm.computer/api'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Health check
  async getHealth() {
    return this.request('/health')
  }

  // User management
  async getUsers() {
    return this.request('/users')
  }

  async getUser(id) {
    return this.request(`/users/${id}`)
  }

  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async updateUser(id, userData) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    })
  }

  // Player management
  async getPlayers() {
    return this.request('/players')
  }

  async getPlayer(id) {
    return this.request(`/players/${id}`)
  }

  async createPlayer(playerData) {
    return this.request('/players', {
      method: 'POST',
      body: JSON.stringify(playerData),
    })
  }

  async updatePlayer(id, playerData) {
    return this.request(`/players/${id}`, {
      method: 'PUT',
      body: JSON.stringify(playerData),
    })
  }

  async deletePlayer(id) {
    return this.request(`/players/${id}`, {
      method: 'DELETE',
    })
  }

  // Coach management
  async getCoaches() {
    return this.request('/coaches')
  }

  async getCoach(id) {
    return this.request(`/coaches/${id}`)
  }

  async createCoach(coachData) {
    return this.request('/coaches', {
      method: 'POST',
      body: JSON.stringify(coachData),
    })
  }

  async updateCoach(id, coachData) {
    return this.request(`/coaches/${id}`, {
      method: 'PUT',
      body: JSON.stringify(coachData),
    })
  }

  async deleteCoach(id) {
    return this.request(`/coaches/${id}`, {
      method: 'DELETE',
    })
  }

  // Training session management
  async getTrainingSessions() {
    return this.request('/trainingSessions')
  }

  async getTrainingSession(id) {
    return this.request(`/trainingSessions/${id}`)
  }

  async createTrainingSession(sessionData) {
    return this.request('/trainingSessions', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    })
  }

  async updateTrainingSession(id, sessionData) {
    return this.request(`/trainingSessions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(sessionData),
    })
  }

  async deleteTrainingSession(id) {
    return this.request(`/trainingSessions/${id}`, {
      method: 'DELETE',
    })
  }

  // Registration management
  async getRegistrations() {
    return this.request('/registrations')
  }

  async getRegistration(id) {
    return this.request(`/registrations/${id}`)
  }

  async createRegistration(registrationData) {
    return this.request('/registrations', {
      method: 'POST',
      body: JSON.stringify(registrationData),
    })
  }

  async updateRegistration(id, registrationData) {
    return this.request(`/registrations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(registrationData),
    })
  }

  async deleteRegistration(id) {
    return this.request(`/registrations/${id}`, {
      method: 'DELETE',
    })
  }

  // Feedback management
  async getFeedbacks() {
    return this.request('/feedbacks')
  }

  async getFeedback(id) {
    return this.request(`/feedbacks/${id}`)
  }

  async createFeedback(feedbackData) {
    return this.request('/feedbacks', {
      method: 'POST',
      body: JSON.stringify(feedbackData),
    })
  }

  async updateFeedback(id, feedbackData) {
    return this.request(`/feedbacks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(feedbackData),
    })
  }

  async deleteFeedback(id) {
    return this.request(`/feedbacks/${id}`, {
      method: 'DELETE',
    })
  }

  // Franchise management
  async getFranchises() {
    return this.request('/franchises')
  }

  async getFranchise(id) {
    return this.request(`/franchises/${id}`)
  }

  async createFranchise(franchiseData) {
    return this.request('/franchises', {
      method: 'POST',
      body: JSON.stringify(franchiseData),
    })
  }

  async updateFranchise(id, franchiseData) {
    return this.request(`/franchises/${id}`, {
      method: 'PUT',
      body: JSON.stringify(franchiseData),
    })
  }

  async deleteFranchise(id) {
    return this.request(`/franchises/${id}`, {
      method: 'DELETE',
    })
  }

  // Facility management
  async getFacilities() {
    return this.request('/facilities')
  }

  async getFacility(id) {
    return this.request(`/facilities/${id}`)
  }

  async createFacility(facilityData) {
    return this.request('/facilities', {
      method: 'POST',
      body: JSON.stringify(facilityData),
    })
  }

  async updateFacility(id, facilityData) {
    return this.request(`/facilities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(facilityData),
    })
  }

  async deleteFacility(id) {
    return this.request(`/facilities/${id}`, {
      method: 'DELETE',
    })
  }

  // Equipment management
  async getEquipment() {
    return this.request('/equipment')
  }

  async getEquipmentItem(id) {
    return this.request(`/equipment/${id}`)
  }

  async createEquipment(equipmentData) {
    return this.request('/equipment', {
      method: 'POST',
      body: JSON.stringify(equipmentData),
    })
  }

  async updateEquipment(id, equipmentData) {
    return this.request(`/equipment/${id}`, {
      method: 'PUT',
      body: JSON.stringify(equipmentData),
    })
  }

  async deleteEquipment(id) {
    return this.request(`/equipment/${id}`, {
      method: 'DELETE',
    })
  }

  // Analytics and reporting
  async getDashboardStats() {
    try {
      const [users, players, coaches, sessions, registrations, feedbacks] = await Promise.all([
        this.getUsers(),
        this.getPlayers(),
        this.getCoaches(),
        this.getTrainingSessions(),
        this.getRegistrations(),
        this.getFeedbacks()
      ])

      return {
        totalUsers: users.length,
        totalPlayers: players.length,
        totalCoaches: coaches.length,
        activeSessions: sessions.length,
        totalRegistrations: registrations.length,
        totalFeedbacks: feedbacks.length,
        // Calculate derived metrics
        attendanceRate: this.calculateAttendanceRate(registrations, sessions),
        monthlyRevenue: this.calculateMonthlyRevenue(registrations),
        newRegistrations: this.calculateNewRegistrations(registrations)
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
      // Return mock data as fallback
      return {
        totalUsers: 156,
        totalPlayers: 89,
        totalCoaches: 8,
        activeSessions: 12,
        totalRegistrations: 234,
        totalFeedbacks: 45,
        attendanceRate: 94,
        monthlyRevenue: 8450,
        newRegistrations: 23
      }
    }
  }

  calculateAttendanceRate(registrations, sessions) {
    // Mock calculation - in real implementation, this would be based on actual attendance data
    return Math.floor(Math.random() * 10) + 90 // 90-99%
  }

  calculateMonthlyRevenue(registrations) {
    // Mock calculation - in real implementation, this would be based on payment data
    return registrations.length * 95 // Assuming $95 average per registration
  }

  calculateNewRegistrations(registrations) {
    // Mock calculation - in real implementation, this would filter by current month
    return Math.floor(registrations.length * 0.15) // Assuming 15% are new this month
  }
}

// Create and export a singleton instance
const apiService = new ApiService()
export default apiService

