import { getSupabase } from '@/lib/supabase'
import { QuoteRequest } from '@/types/quote'

export const dynamic = 'force-dynamic'

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default async function AdminPage() {
  const { data: quotes, error } = await getSupabase()
    .from('quote_requests')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-800 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Quản Lý Yêu Cầu Báo Giá</h1>
          <p className="text-blue-200 text-sm mt-1">
            Danh sách khách hàng đã gửi yêu cầu báo giá gioăng silicone qua website.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-6">
            Lỗi tải dữ liệu: {error.message}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <span className="font-semibold text-gray-700">
              Tổng số yêu cầu: <span className="text-blue-700">{quotes?.length ?? 0}</span>
            </span>
            <a href="/" className="text-sm text-blue-600 hover:underline">
              ← Về trang chủ
            </a>
          </div>

          {!quotes || quotes.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
              <p className="text-5xl mb-4">📋</p>
              <p>Chưa có yêu cầu báo giá nào.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="py-3 px-4 text-left whitespace-nowrap">Thời gian</th>
                    <th className="py-3 px-4 text-left whitespace-nowrap">Họ tên</th>
                    <th className="py-3 px-4 text-left whitespace-nowrap">Công ty</th>
                    <th className="py-3 px-4 text-left whitespace-nowrap">Điện thoại</th>
                    <th className="py-3 px-4 text-left whitespace-nowrap">Email</th>
                    <th className="py-3 px-4 text-left whitespace-nowrap">Loại gioăng</th>
                    <th className="py-3 px-4 text-left whitespace-nowrap">Kích thước</th>
                    <th className="py-3 px-4 text-left whitespace-nowrap">Số lượng</th>
                    <th className="py-3 px-4 text-left whitespace-nowrap">Yêu cầu KT</th>
                    <th className="py-3 px-4 text-left whitespace-nowrap">Gợi ý AI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {quotes.map((q: QuoteRequest) => (
                    <tr key={q.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 whitespace-nowrap text-gray-500">{formatDate(q.created_at)}</td>
                      <td className="py-3 px-4 font-medium text-gray-800 whitespace-nowrap">{q.customer_name}</td>
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{q.company_name || '–'}</td>
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{q.phone || '–'}</td>
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{q.email || '–'}</td>
                      <td className="py-3 px-4 text-gray-600">{q.product_type || '–'}</td>
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{q.size || '–'}</td>
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{q.quantity || '–'}</td>
                      <td className="py-3 px-4 text-gray-600 max-w-xs">
                        <span className="line-clamp-2">{q.technical_requirement || '–'}</span>
                      </td>
                      <td className="py-3 px-4 max-w-sm">
                        {q.ai_suggestion ? (
                          <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 text-blue-800 text-xs leading-relaxed line-clamp-3">
                            {q.ai_suggestion}
                          </div>
                        ) : '–'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
