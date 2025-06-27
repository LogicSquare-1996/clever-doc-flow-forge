
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('authToken');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API request failed');
    }

    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userType?: string;
  }) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async updateProfile(profileData: any) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Document endpoints
  async getDocumentTemplates() {
    return this.request('/documents/templates');
  }

  async generatePrompt(data: any) {
    return this.request('/documents/generate-prompt', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async generateDocument(data: any) {
    return this.request('/documents/generate-document', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getUserDocuments(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/documents${queryString}`);
  }

  async getDocument(id: string) {
    return this.request(`/documents/${id}`);
  }

  async downloadDocument(id: string, guestEmail?: string) {
    return this.request(`/documents/${id}/download`, {
      method: 'POST',
      body: JSON.stringify({ guestEmail }),
    });
  }

  // Payment endpoints
  async createSinglePayment(documentId: string, guestEmail?: string) {
    return this.request('/payments/create-single-payment', {
      method: 'POST',
      body: JSON.stringify({ documentId, guestEmail }),
    });
  }

  async createSubscription(planType: string) {
    return this.request('/payments/create-subscription', {
      method: 'POST',
      body: JSON.stringify({ planType }),
    });
  }

  async checkSubscription() {
    return this.request('/payments/check-subscription');
  }

  // Notification endpoints
  async getNotifications() {
    return this.request('/notifications');
  }

  async markNotificationAsRead(id: string) {
    return this.request(`/notifications/${id}/read`, { method: 'PUT' });
  }

  async markAllNotificationsAsRead() {
    return this.request('/notifications/mark-all-read', { method: 'PUT' });
  }

  async deleteNotification(id: string) {
    return this.request(`/notifications/${id}`, { method: 'DELETE' });
  }

  // Admin endpoints
  async getUsers(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/admin/users${queryString}`);
  }

  async getAdminDocuments(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/admin/documents${queryString}`);
  }

  async getAnalytics() {
    return this.request('/admin/analytics');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
