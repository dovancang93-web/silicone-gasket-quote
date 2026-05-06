# Gioăng Silicone Công Nghiệp – Website Báo Giá Theo Yêu Cầu

## Giới Thiệu Dự Án

Website full-stack giới thiệu sản phẩm gioăng silicone công nghiệp, cho phép khách hàng gửi yêu cầu báo giá trực tuyến. Hệ thống tích hợp AI (Claude) để tạo tư vấn sơ bộ ngay sau khi khách hàng gửi form, đồng thời cung cấp trang admin để quản lý danh sách yêu cầu.

Dự án này được xây dựng như một bài tập học AI trong khóa học.

---

## Công Nghệ Sử Dụng

| Thành phần | Công nghệ |
|-----------|-----------|
| Framework | Next.js 14 (App Router) |
| Ngôn ngữ | TypeScript |
| CSS | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| AI | Anthropic Claude API |
| Deploy | Vercel |
| Version control | GitHub |

---

## Chức Năng Chính

- **Trang chủ**: Giới thiệu sản phẩm gioăng silicone với đầy đủ thông tin: ưu điểm, ứng dụng, các loại sản phẩm, thông số kỹ thuật tham khảo
- **Form báo giá**: Khách hàng điền thông tin và gửi yêu cầu, dữ liệu được lưu vào Supabase
- **Tư vấn AI**: Sau khi gửi form, Claude AI tự động tạo đoạn tư vấn sơ bộ phù hợp với yêu cầu
- **Trang admin** (`/admin`): Xem toàn bộ danh sách yêu cầu báo giá đã gửi

---

## Cách Cài Đặt

### Yêu cầu
- Node.js 18+
- Tài khoản Supabase (miễn phí)
- Tài khoản Anthropic (có API key)

### Bước 1: Clone project về máy
```bash
git clone https://github.com/your-username/silicone-gasket-quote.git
cd silicone-gasket-quote
```

### Bước 2: Cài đặt packages
```bash
npm install
```

### Bước 3: Tạo file biến môi trường
```bash
cp .env.example .env.local
```

Mở file `.env.local` và điền các giá trị:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### Bước 4: Tạo bảng database trên Supabase

Đăng nhập vào Supabase, vào **SQL Editor** và chạy:

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

## Cách Chạy Dự Án

```bash
npm run dev
```

Mở trình duyệt, truy cập: **http://localhost:3000**

- Trang chủ: `http://localhost:3000`
- Trang admin: `http://localhost:3000/admin`

---

## Cách Deploy Lên Vercel

### Bước 1: Đưa code lên GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/silicone-gasket-quote.git
git push -u origin main
```

### Bước 2: Deploy lên Vercel
1. Đăng nhập Vercel (vercel.com)
2. Nhấn **"Add New Project"**
3. Import repository từ GitHub
4. Thêm 3 biến môi trường:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ANTHROPIC_API_KEY`
5. Nhấn **Deploy**

---

## Link Demo

- **Live Demo**: *(cập nhật sau khi deploy)*
- **GitHub**: *(cập nhật sau khi đưa lên GitHub)*

---

## Cấu Trúc Thư Mục

```
silicone-gasket-quote/
├── app/
│   ├── page.tsx              # Trang chủ
│   ├── layout.tsx            # Layout + metadata
│   ├── admin/page.tsx        # Trang admin
│   └── api/quotes/route.ts   # API endpoint
├── components/               # Components giao diện
├── lib/
│   ├── supabase.ts           # Kết nối Supabase
│   └── claude.ts             # Gọi Claude AI
├── types/quote.ts            # TypeScript types
├── .env.local                # Biến môi trường (không commit)
├── .env.example              # Mẫu biến môi trường
├── PLAN.md                   # Kế hoạch dự án
├── CLAUDE.md                 # Hướng dẫn cho Claude Code
└── claude-conversation.md    # Ghi lại quá trình làm việc
```
