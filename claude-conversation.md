# claude-conversation.md – Ghi Lại Quá Trình Làm Việc Với Claude Code

## Thông Tin Dự Án

- **Tên dự án**: AI Silicone Gasket Quote Website
- **Người thực hiện**: Học viên khóa học AI
- **Ngày bắt đầu**: 2026-05-06
- **Công cụ AI**: Claude Code (claude-sonnet-4-6)

---

## Prompt Khởi Đầu Dự Án

> Tôi là người mới học AI và chưa hiểu nhiều về lập trình.
> Hãy giúp tôi xây dựng một web app full-stack để làm bài tập về nhà.
> Tên dự án: AI Silicone Gasket Quote Website
> [... toàn bộ yêu cầu chi tiết ...]

---

## Tóm Tắt Quá Trình Làm Việc

### Giai đoạn 1: Lập kế hoạch (Plan Mode)
Claude Code đọc kỹ yêu cầu, xác định công nghệ, cấu trúc dự án và lập kế hoạch chi tiết trong file `PLAN.md`. Không cần hỏi thêm vì yêu cầu đã đầy đủ.

### Giai đoạn 2: Khởi tạo dự án
```bash
npx create-next-app@latest silicone-gasket-quote --typescript --tailwind --eslint --app
npm install @supabase/supabase-js @anthropic-ai/sdk
```

### Giai đoạn 3: Tạo cấu trúc và code
Các file được tạo theo thứ tự:
1. `types/quote.ts` → định nghĩa TypeScript types
2. `lib/supabase.ts` → kết nối database
3. `lib/claude.ts` → tích hợp AI
4. Tất cả components (`HeroSection`, `QuoteForm`, v.v.)
5. `app/page.tsx` → trang chủ
6. `app/api/quotes/route.ts` → API backend
7. `app/admin/page.tsx` → trang admin

---

## Các Quyết Định Kỹ Thuật Quan Trọng

| Quyết định | Lý do |
|-----------|-------|
| Dùng App Router (không phải Pages Router) | Mặc định của Next.js 14, hiện đại hơn |
| Admin page là Server Component | Không cần state, fetch trực tiếp nhanh hơn |
| Dùng `claude-haiku-4-5` cho AI | Nhanh, rẻ, đủ dùng cho tư vấn sơ bộ |
| Form là Client Component | Cần useState, onSubmit, loading state |

---

## Những Điểm Học Được

1. **Next.js App Router**: Mỗi thư mục trong `app/` là một route, `page.tsx` là file chính
2. **Server vs Client Component**: Server component = nhanh hơn; Client component = dùng khi cần tương tác người dùng
3. **API Routes**: File `route.ts` trong `app/api/` tự động thành endpoint REST API
4. **Supabase**: Database PostgreSQL online, kết nối đơn giản qua SDK
5. **Claude API**: Gọi AI thông qua `@anthropic-ai/sdk`, cần giữ bí mật API key

---

## Các Bước Tiếp Theo (cần làm thủ công)

- [ ] Tạo tài khoản Supabase, tạo project, chạy SQL tạo bảng
- [ ] Lấy Supabase URL và Anon Key, điền vào `.env.local`
- [ ] Lấy Anthropic API Key, điền vào `.env.local`
- [ ] Test chạy local: `npm run dev`
- [ ] Tạo GitHub repo, đưa code lên
- [ ] Deploy lên Vercel

---

## Prompt Hữu Ích Để Dùng Lại

### Thêm section mới vào trang chủ
```
Thêm section "Dự án đã thực hiện" vào trang chủ, 
đặt sau section WhyChooseUs, hiển thị 3 case study dạng card.
```

### Sửa giao diện form
```
Sửa QuoteForm để thêm trường "Màu sắc yêu cầu" 
và cập nhật database schema tương ứng.
```

### Cải thiện AI prompt
```
Cập nhật hàm generateAISuggestion trong lib/claude.ts 
để tư vấn chi tiết hơn về nhiệt độ làm việc.
```
