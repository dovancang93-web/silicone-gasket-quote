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

const inputClass = "w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors"

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
      <section id="quote-form" className="py-16 px-4" style={{ background: '#F3F4F6' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-md p-10 border" style={{ borderColor: '#E5E7EB' }}>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: '#C9A227' }}
            >
              <span className="text-2xl font-bold" style={{ color: '#0F172A' }}>✓</span>
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#111827' }}>
              Gửi yêu cầu thành công!
            </h3>
            <p className="mb-8" style={{ color: '#6B7280' }}>
              KTECH đã nhận được yêu cầu của bạn và sẽ liên hệ sớm nhất có thể.
            </p>
            {aiSuggestion && (
              <div
                className="rounded-xl p-6 text-left mb-8 border-l-4"
                style={{ background: '#F3F4F6', borderColor: '#C9A227' }}
              >
                <h4 className="font-semibold mb-2 flex items-center gap-2" style={{ color: '#111827' }}>
                  🤖 Tư vấn sơ bộ từ AI
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>{aiSuggestion}</p>
              </div>
            )}
            <button
              onClick={() => setSubmitted(false)}
              className="font-bold px-8 py-3 rounded-lg transition-opacity hover:opacity-90"
              style={{ background: '#C9A227', color: '#0F172A' }}
            >
              Gửi yêu cầu khác
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="quote-form" className="py-16 px-4" style={{ background: '#F3F4F6' }}>
      <div className="max-w-2xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#C9A227' }}>
          Báo giá
        </p>
        <h2 className="text-3xl font-bold mb-3" style={{ color: '#111827' }}>
          Gửi Yêu Cầu Báo Giá Gioăng Silicone
        </h2>
        <div className="w-12 h-0.5 mb-4 rounded-full" style={{ background: '#C9A227' }} />
        <p className="mb-10" style={{ color: '#6B7280' }}>
          Vui lòng điền thông tin bên dưới. KTECH sẽ kiểm tra yêu cầu và liên hệ tư vấn sản phẩm phù hợp.
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 border space-y-5" style={{ borderColor: '#E5E7EB' }}>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#374151' }}>
                Họ tên khách hàng <span style={{ color: '#C9A227' }}>*</span>
              </label>
              <input
                type="text" name="customer_name" value={form.customer_name}
                onChange={handleChange} required placeholder="Nguyễn Văn A"
                className={inputClass}
                style={{ borderColor: '#D1D5DB', color: '#111827' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#374151' }}>Tên công ty</label>
              <input
                type="text" name="company_name" value={form.company_name}
                onChange={handleChange} placeholder="Công ty TNHH ABC"
                className={inputClass}
                style={{ borderColor: '#D1D5DB', color: '#111827' }}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#374151' }}>Số điện thoại</label>
              <input
                type="tel" name="phone" value={form.phone}
                onChange={handleChange} placeholder="0912 345 678"
                className={inputClass}
                style={{ borderColor: '#D1D5DB', color: '#111827' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#374151' }}>Email</label>
              <input
                type="email" name="email" value={form.email}
                onChange={handleChange} placeholder="email@company.com"
                className={inputClass}
                style={{ borderColor: '#D1D5DB', color: '#111827' }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#374151' }}>Loại gioăng silicone cần mua</label>
            <select
              name="product_type" value={form.product_type} onChange={handleChange}
              className={inputClass + ' bg-white'}
              style={{ borderColor: '#D1D5DB', color: '#111827' }}
            >
              <option value="">-- Chọn loại gioăng --</option>
              {productTypes.map((t, i) => <option key={i} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#374151' }}>Kích thước</label>
              <input
                type="text" name="size" value={form.size}
                onChange={handleChange} placeholder="VD: 10x5mm, đường kính 30mm"
                className={inputClass}
                style={{ borderColor: '#D1D5DB', color: '#111827' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#374151' }}>Số lượng</label>
              <input
                type="text" name="quantity" value={form.quantity}
                onChange={handleChange} placeholder="VD: 100 cái, 50 mét"
                className={inputClass}
                style={{ borderColor: '#D1D5DB', color: '#111827' }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#374151' }}>Yêu cầu kỹ thuật & ghi chú</label>
            <textarea
              name="technical_requirement" value={form.technical_requirement}
              onChange={handleChange} rows={4}
              placeholder="Màu sắc, môi trường sử dụng, nhiệt độ làm việc, tiêu chuẩn đặc biệt..."
              className={inputClass + ' resize-none'}
              style={{ borderColor: '#D1D5DB', color: '#111827' }}
            />
          </div>

          {error && (
            <div className="rounded-lg p-4 text-sm border" style={{ background: '#FEF2F2', borderColor: '#FECACA', color: '#991B1B' }}>
              {error}
            </div>
          )}

          <button
            type="submit" disabled={loading}
            className="w-full font-bold text-base py-4 rounded-lg transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: '#C9A227', color: '#0F172A' }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: '#0F172A', borderTopColor: 'transparent' }} />
                Đang xử lý...
              </span>
            ) : 'Gửi yêu cầu báo giá'}
          </button>

          <p className="text-xs text-center" style={{ color: '#9CA3AF' }}>
            * Sau khi gửi, AI sẽ tạo tư vấn sơ bộ dựa trên thông tin bạn cung cấp.
          </p>
        </form>
      </div>
    </section>
  )
}
