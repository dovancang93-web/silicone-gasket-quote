# CLAUDE.md – Hướng Dẫn Làm Việc Với Dự Án

## Tổng Quan Dự Án

Website full-stack giới thiệu và báo giá gioăng silicone công nghiệp.
- **Frontend**: Next.js 14 App Router + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **AI**: Anthropic Claude API

---

## Cấu Trúc Quan Trọng

```
app/page.tsx              → Trang chủ (import tất cả components)
app/admin/page.tsx        → Trang admin (server component)
app/api/quotes/route.ts   → API: POST lưu form, GET lấy danh sách
components/QuoteForm.tsx  → Form báo giá (client component)
lib/supabase.ts           → Supabase client
lib/claude.ts             → Hàm generateAISuggestion()
types/quote.ts            → Interface QuoteRequest, QuoteFormData
```

---

## Quy Tắc Viết Code

- Dùng TypeScript, không dùng `any`
- Components server mặc định, chỉ thêm `'use client'` khi cần state/event
- Tailwind CSS cho tất cả styling, không viết CSS riêng
- Màu chính: `blue-700`, `blue-800` (xanh công nghiệp)
- Text tiếng Việt trong tất cả UI

---

## Biến Môi Trường Cần Có

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
ANTHROPIC_API_KEY=...
```

Xem file `.env.example` để biết format. Không commit `.env.local`.

---

## Database

Bảng `quote_requests` trên Supabase. Xem SQL đầy đủ trong PLAN.md.

Khi đọc dữ liệu: dùng `supabase` client từ `lib/supabase.ts`.

---

## Những Điều Cần Lưu Ý Khi Sửa Code

1. **Thêm section mới**: Tạo component trong `components/`, import vào `app/page.tsx`
2. **Thêm cột database**: Cập nhật cả bảng Supabase lẫn interface trong `types/quote.ts`
3. **Thay đổi AI prompt**: Sửa trong `lib/claude.ts` hàm `generateAISuggestion()`
4. **Trang admin**: Là server component, tự fetch data trực tiếp từ Supabase (không qua API route)
5. **Build trước khi deploy**: Chạy `npm run build` để kiểm tra lỗi TypeScript
6. **Model AI**: Đang dùng `claude-haiku-4-5-20251001` — nhanh và tiết kiệm chi phí

---

## Lệnh Hay Dùng

```bash
npm run dev      # Chạy local (http://localhost:3000)
npm run build    # Build để kiểm tra lỗi
npm run lint     # Kiểm tra code style
```
