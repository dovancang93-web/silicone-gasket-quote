# 🕐 Claude Code Web — Routines Hướng Dẫn Thiết Lập

## Tổng Quan

Dự án này có 4 **Routine** tự chạy theo lịch hàng ngày mà không cần mở máy.

---

## Cách Tạo Routine Trên claude.ai/code

### Bước 1: Vào trang Routines
1. Mở **claude.ai/code**
2. Chọn repo `silicone-gasket-quote`
3. Click tab **"Routines"** (hoặc icon lịch)
4. Click **"New Routine"**

---

## 4 Routines Cần Tạo

### 🔨 Routine 1: Build Sáng Sớm — 5:00 AM

| Trường | Giá trị |
|--------|---------|
| **Name** | `Daily Build Check - 5H Sáng` |
| **Schedule** | `0 5 * * *` (5:00 AM hàng ngày) |

**Prompt:**
```
Chạy build kiểm tra TypeScript cho dự án silicone-gasket-quote:

1. Chạy lệnh: npm run build
2. Nếu build thành công: báo cáo "✅ Build PASS - không có lỗi TypeScript"
3. Nếu build lỗi: liệt kê các lỗi TypeScript cụ thể và file bị lỗi
4. Lưu kết quả vào file .claude/reports/build-{ngày hôm nay}.log

Ghi ngắn gọn kết quả cuối cùng.
```

---

### 🔍 Routine 2: Kiểm Tra Code Style — 10:00 AM

| Trường | Giá trị |
|--------|---------|
| **Name** | `Daily Lint Check - 10H Sáng` |
| **Schedule** | `0 10 * * *` (10:00 AM hàng ngày) |

**Prompt:**
```
Kiểm tra code style cho dự án silicone-gasket-quote:

1. Chạy lệnh: npm run lint
2. Nếu lint sạch: báo cáo "✅ Lint PASS - code style chuẩn"
3. Nếu có lỗi lint: liệt kê các file và dòng cần sửa
4. Lưu kết quả vào .claude/reports/lint-{ngày hôm nay}.log

Ghi tóm tắt kết quả.
```

---

### 📊 Routine 3: Tóm Tắt Thay Đổi — 15:00 PM

| Trường | Giá trị |
|--------|---------|
| **Name** | `Daily Summary Report - 15H Chiều` |
| **Schedule** | `0 15 * * *` (3:00 PM hàng ngày) |

**Prompt:**
```
Tạo báo cáo tóm tắt thay đổi hàng ngày cho dự án silicone-gasket-quote:

1. Chạy: git status - xem files chưa commit
2. Chạy: git log --since="00:00 today" --oneline - xem commit hôm nay
3. Chạy: git diff --stat - xem thống kê thay đổi
4. Tạo file .claude/reports/summary-{ngày hôm nay}.md với nội dung:
   - Số commit hôm nay
   - Danh sách files đã thay đổi
   - Tóm tắt công việc hoàn thành
5. In báo cáo tóm tắt ra màn hình

Viết bằng tiếng Việt, ngắn gọn rõ ràng.
```

---

### 🌙 Routine 4: Build Cuối Ngày — 20:00 PM

| Trường | Giá trị |
|--------|---------|
| **Name** | `Final Build Verification - 20H Tối` |
| **Schedule** | `0 20 * * *` (8:00 PM hàng ngày) |

**Prompt:**
```
Kiểm tra toàn diện cuối ngày cho dự án silicone-gasket-quote:

1. Chạy npm run lint - kiểm tra code style
2. Chạy npm run build - kiểm tra TypeScript và build
3. Kiểm tra git status - có files chưa commit không?
4. Đếm tổng commit hôm nay: git log --since="00:00 today" --oneline | wc -l
5. Tạo báo cáo cuối ngày .claude/reports/final-build-{ngày}.log với:
   - Kết quả Lint: PASS/FAIL
   - Kết quả Build: PASS/FAIL  
   - Số commit trong ngày
   - Nhận xét tổng quát

Viết tóm tắt cuối ngày bằng tiếng Việt.
```

---

## Xem Reports

Các reports được lưu tại thư mục `.claude/reports/`:

```bash
ls .claude/reports/
# build-2026-05-24.log
# lint-2026-05-24.log
# summary-2026-05-24.md
# final-build-2026-05-24.log
```

---

## Cron Expression Reference

| Thời Gian | Cron |
|-----------|------|
| 5:00 AM   | `0 5 * * *` |
| 10:00 AM  | `0 10 * * *` |
| 3:00 PM   | `0 15 * * *` |
| 8:00 PM   | `0 20 * * *` |

---

*Cập nhật: 2026-05-24 | Dự án: silicone-gasket-quote*
