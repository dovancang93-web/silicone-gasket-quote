'use client'

import { useState, FormEvent } from 'react'

const productTypes = [
  'Gioăng silicone tròn',
  'Gioăng silicone vuông',
  'Gioăng silicone chữ U',
  'Gioăng silicone chữ D',
  'Gioăng silicone dạng ống',
  'Gioăng silicone dạng tấm (cắt theo bản vẽ)',
  'Gioăng silicone chịu nhiệt',
  'Gioăng silicone cho tủ điện / máy móc',
  'Khác (ghi rõ trong phần yêu cầu kỹ thuật)',
]

interface FormState {
  customer_name: string
  company_name: string
  phone: string
  email: string
  product_type: string
  size: string
  quantity: string
  technical_requirement: string
}

const initialForm: FormState = {
  customer_name: '',
  company_name: '',
  phone: '',
  email: '',
  product_type: '',
  size: '',
  quantity: '',
  technical_requirement: '',
}

export default function QuoteForm() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState('')
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Có lỗi xảy ra')

      setAiSuggestion(data.ai_suggestion)
      setSubmitted(true)
      setForm(initialForm)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section id="quote-form" className="py-16 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-md p-10 border border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <span className="text-green-600 text-3xl">✓</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Gửi yêu cầu thành công!</h3>
            <p className="text-gray-500 mb-8">Chúng tôi đã nhận được yêu cầu của bạn và sẽ liên hệ sớm nhất có thể.</p>

            {aiSuggestion && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-left mb-8">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <span>🤖</span> Tư vấn sơ bộ từ AI
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">{aiSuggestion}</p>
              </div>
            )}

            <button
              onClick={() => setSubmitted(false)}
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Gửi yêu cầu khác
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="quote-form" className="py-16 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">
          Gửi Yêu Cầu Báo Giá Gioăng Silicone
        </h2>
        <div className="w-16 h-1 bg-blue-700 mx-auto mb-4 rounded-full" />
        <p className="text-gray-500 text-center mb-10">
          Vui lòng điền thông tin bên dưới. Chúng tôi sẽ kiểm tra yêu cầu và liên hệ lại để tư vấn sản phẩm phù hợp.
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Họ tên khách hàng <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="customer_name"
                value={form.customer_name}
                onChange={handleChange}
                required
                placeholder="Nguyễn Văn A"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tên công ty</label>
              <input
                type="text"
                name="company_name"
                value={form.company_name}
                onChange={handleChange}
                placeholder="Công ty TNHH ABC"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="0912 345 678"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Loại gioăng silicone cần mua</label>
            <select
              name="product_type"
              value={form.product_type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">-- Chọn loại gioăng --</option>
              {productTypes.map((t, i) => (
                <option key={i} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Kích thước</label>
              <input
                type="text"
                name="size"
                value={form.size}
                onChange={handleChange}
                placeholder="VD: 10x5mm, đường kính 30mm"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Số lượng</label>
              <input
                type="text"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="VD: 100 cái, 50 mét"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Yêu cầu kỹ thuật & ghi chú thêm</label>
            <textarea
              name="technical_requirement"
              value={form.technical_requirement}
              onChange={handleChange}
              rows={4}
              placeholder="Mô tả yêu cầu về màu sắc, môi trường sử dụng, nhiệt độ làm việc, tiêu chuẩn đặc biệt hoặc đính kèm link bản vẽ..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white font-bold text-lg py-4 rounded-lg hover:bg-blue-800 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Đang xử lý...
              </span>
            ) : (
              'Gửi yêu cầu báo giá'
            )}
          </button>

          <p className="text-gray-400 text-xs text-center">
            * Sau khi gửi, hệ thống AI sẽ tạo tư vấn sơ bộ dựa trên thông tin bạn cung cấp.
          </p>
        </form>
      </div>
    </section>
  )
}
