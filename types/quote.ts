export interface QuoteRequest {
  id: string
  customer_name: string
  company_name: string
  phone: string
  email: string
  product_type: string
  size: string
  quantity: string
  technical_requirement: string
  ai_suggestion: string
  created_at: string
}

export type QuoteFormData = Omit<QuoteRequest, 'id' | 'ai_suggestion' | 'created_at'>
