const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface ApiResponse<T = any> {
  data?: T
  error?: string
  status?: string
}

export const api = {
  get: async <T>(endpoint: string): Promise<T> => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 120000); // 120s timeout

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      })
      
      clearTimeout(id);

      if (!res.ok) {
        throw new Error(`API Error: ${res.statusText}`)
      }
      
      return res.json()
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  },

  post: async <T>(endpoint: string, body: any): Promise<T> => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 120000); // 120s timeout

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      })

      clearTimeout(id);

      if (!res.ok) {
        throw new Error(`API Error: ${res.statusText}`)
      }

      return res.json()
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  },

  // Specific Methods
  generateReport: async (topic: string) => {
    return api.post<{ report: string }>('/api/generate-report', { topic })
  },

  getReports: async () => {
    return api.get<{id: string, topic: string, content: string, created_at: string}[]>('/api/reports')
  }
}
