import Anthropic from '@anthropic-ai/sdk'
import { QuoteFormData } from '@/types/quote'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function generateAISuggestion(data: QuoteFormData): Promise<string> {
  const prompt = `Bạn là chuyên gia tư vấn gioăng silicone công nghiệp. Dựa trên yêu cầu của khách hàng dưới đây, hãy viết một đoạn tư vấn sơ bộ ngắn gọn (3-5 câu) bằng tiếng Việt, chuyên nghiệp và thực tế.

Thông tin khách hàng:
- Loại gioăng cần mua: ${data.product_type || 'Chưa xác định'}
- Kích thước: ${data.size || 'Chưa xác định'}
- Số lượng: ${data.quantity || 'Chưa xác định'}
- Yêu cầu kỹ thuật: ${data.technical_requirement || 'Không có yêu cầu đặc biệt'}

Lưu ý: Dùng các cụm từ như "tham khảo", "tùy theo yêu cầu", "cần xác nhận thêm" khi đề cập thông số kỹ thuật. Không khẳng định chắc chắn về giá cả.`

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 400,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = message.content[0]
  if (content.type === 'text') {
    return content.text
  }
  return 'Cảm ơn yêu cầu của bạn. Chúng tôi sẽ liên hệ để tư vấn sản phẩm phù hợp.'
}
