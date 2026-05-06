# PLAN.md – AI Silicone Gasket Quote Website

## Mục Tiêu Dự Án
Xây dựng web app full-stack giới thiệu sản phẩm gioăng silicone công nghiệp, có chức năng nhận yêu cầu báo giá từ khách hàng, lưu vào database và tích hợp AI tư vấn sơ bộ.

---

## Danh Sách Chức Năng

### Trang chủ
- Giới thiệu sản phẩm gioăng silicone
- Ưu điểm sản phẩm (7 ưu điểm)
- Ứng dụng trong công nghiệp
- Các loại gioăng phổ biến
- Thông số kỹ thuật tham khảo
- Vì sao chọn chúng tôi
- Quy trình báo giá 5 bước
- Form yêu cầu báo giá

### Form báo giá
- Nhận thông tin: họ tên, công ty, SĐT, email, loại gioăng, kích thước, số lượng, yêu cầu kỹ thuật
- Lưu vào Supabase database
- Gọi Claude AI để tạo tư vấn sơ bộ
- Hiển thị kết quả AI cho khách hàng ngay sau khi gửi

### Trang Admin (/admin)
- Xem danh sách toàn bộ yêu cầu báo giá
- Hiển thị gợi ý AI cho từng yêu cầu

---

## Công Nghệ Sử Dụng

| Thành phần | Công nghệ |
|-----------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend | Next.js API Routes |
| Database | Supabase (PostgreSQL) |
| AI | Anthropic Claude API (claude-haiku-4-5) |
| Deploy | Vercel |
| Version control | GitHub |

---

## Cấu Trúc Database

**Bảng:** `quote_requests`

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| id | uuid | Primary key, tự động |
| customer_name | text | Họ tên khách hàng |
| company_name | text | Tên công ty |
| phone | text | Số điện thoại |
| email | text | Email |
| product_type | text | Loại gioăng |
| size | text | Kích thước |
| quantity | text | Số lượng |
| technical_requirement | text | Yêu cầu kỹ thuật |
| ai_suggestion | text | Tư vấn sơ bộ từ AI |
| created_at | timestamptz | Thời gian tạo |

**SQL tạo bảng:**
```sql
create table quote_requests (
  id uuid default gen_random_uuid() primary key,
  customer_name text not null,
  company_name text,
  phone text,
  email text,
  product_type text,
  size text,
  quantity text,
  technical_requirement text,
  ai_suggestion text,
  created_at timestamptz default now()
);
```

---

## Cấu Trúc Các Trang

```
/           → Trang chủ (tất cả sections + form báo giá)
/admin      → Trang admin xem danh sách yêu cầu
/api/quotes → API endpoint (POST: lưu; GET: lấy danh sách)
```

---

## Cấu Trúc Thư Mục

```
silicone-gasket-quote/
├── app/
│   ├── page.tsx              # Trang chủ
│   ├── layout.tsx            # Layout chung + footer
│   ├── globals.css           # CSS toàn cục
│   ├── admin/page.tsx        # Trang admin
│   └── api/quotes/route.ts   # API route
├── components/               # Tất cả components UI
├── lib/
│   ├── supabase.ts           # Kết nối Supabase
│   └── claude.ts             # Gọi Claude AI
├── types/quote.ts            # TypeScript interfaces
├── .env.local                # Biến môi trường (không commit)
├── .env.example              # Mẫu biến môi trường
└── ...
```

---

## Các Bước Triển Khai

- [x] Bước 1: Tạo PLAN.md
- [x] Bước 2: Khởi tạo dự án Next.js
- [x] Bước 3: Cài đặt packages (Supabase, Anthropic)
- [x] Bước 4: Tạo types và lib
- [x] Bước 5: Xây dựng components trang chủ
- [x] Bước 6: Tạo API route
- [x] Bước 7: Tạo trang admin
- [ ] Bước 8: Tạo bảng database trên Supabase
- [ ] Bước 9: Cấu hình biến môi trường
- [ ] Bước 10: Test local
- [ ] Bước 11: Đưa lên GitHub
- [ ] Bước 12: Deploy lên Vercel

---

## Kế Hoạch Deploy

1. **Supabase**: Tạo project, chạy SQL tạo bảng, lấy URL và anon key
2. **GitHub**: `git init` → tạo repo → push code
3. **Vercel**: Import từ GitHub → thêm biến môi trường → deploy

---

## Checklist Kiểm Tra Trước Khi Nộp Bài

- [ ] Trang chủ hiển thị đầy đủ nội dung tiếng Việt
- [ ] Form báo giá hoạt động bình thường
- [ ] Dữ liệu form lưu vào Supabase thành công
- [ ] AI tạo được gợi ý tư vấn sau khi submit
- [ ] Trang admin hiển thị danh sách yêu cầu
- [ ] Giao diện responsive trên mobile
- [ ] Deploy thành công trên Vercel, có link công khai
- [ ] Code đã đưa lên GitHub
- [ ] File `.env.local` không bị commit lên GitHub
- [ ] Có đủ 4 file tài liệu: README.md, CLAUDE.md, PLAN.md, claude-conversation.md
