import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { generateAISuggestion } from '@/lib/claude'
import { QuoteFormData } from '@/types/quote'

export async function POST(req: NextRequest) {
  try {
    const body: QuoteFormData = await req.json()

    if (!body.customer_name?.trim()) {
      return NextResponse.json({ error: 'Vui lòng nhập họ tên khách hàng.' }, { status: 400 })
    }

    // Thử gọi AI, nếu lỗi thì dùng nội dung mặc định
    let ai_suggestion = ''
    try {
      ai_suggestion = await generateAISuggestion(body)
    } catch (aiError) {
      console.warn('AI không khả dụng, dùng nội dung mặc định:', aiError)
      ai_suggestion =
        `Cảm ơn ${body.customer_name} đã gửi yêu cầu báo giá. Dựa trên thông tin cung cấp, ` +
        `chúng tôi sẽ kiểm tra yêu cầu về ${body.product_type || 'gioăng silicone'} ` +
        (body.size ? `kích thước ${body.size}` : '') +
        (body.quantity ? `, số lượng ${body.quantity}` : '') +
        ` và liên hệ tư vấn sản phẩm phù hợp trong thời gian sớm nhất.`
    }

    const { error } = await getSupabase()
      .from('quote_requests')
      .insert([{ ...body, ai_suggestion }])

    if (error) throw error

    return NextResponse.json({ success: true, ai_suggestion })
  } catch (err) {
    console.error('POST /api/quotes error:', err)
    return NextResponse.json({ error: 'Không thể lưu yêu cầu. Vui lòng thử lại.' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data, error } = await getSupabase()
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (err) {
    console.error('GET /api/quotes error:', err)
    return NextResponse.json({ error: 'Không thể tải dữ liệu.' }, { status: 500 })
  }
}
