---
name: hoa-don-nhap-ktech
description: Tạo hóa đơn GTGT nháp KTECH (PNG + bản xem HTML phóng to) theo đúng mẫu HĐĐT gốc để gửi khách kiểm tra. Dùng khi anh Cang gửi báo giá/danh sách hàng và nói hđ nháp, hóa đơn nháp, xuất nháp HĐ, hdn.
---

# Hóa đơn nháp KTECH

Đầu vào: báo giá KTECH (trong chat, file, hoặc số báo giá để tra trên Drive) hoặc danh sách hàng + tên khách.
Đầu ra: **1 PNG** (gửi bằng SendUserFile) **+ 1 bản xem HTML** phóng to được (gửi kèm, `display:"render"`).
Không gửi link công khai trừ khi anh hỏi — hóa đơn chứa MST và giá của khách.

## Quy tắc dữ liệu

- **Người bán**: cố định trong script (KTECH, MST 0111501770, MB Bank 517 576 8888). Không sửa.
- **Người mua**: lấy từ tin nhắn; thiếu thì tra memory `/people/*` → file khách hàng KTECH trên Drive
  (`1B1YZdpNTQh0RTArJ9mCuKe2a4QD4n8yB`) → hợp đồng nguyên tắc / báo giá cũ trên Drive.
  Tên đơn vị viết HOA. Không tìm được MST/địa chỉ → vẫn xuất, để trống và báo anh 1 dòng. **Không bịa.**
- **Ngày**: mặc định hôm nay (DD/MM/YYYY). Ký hiệu mặc định `1C26TKT`. Số luôn `<Chưa cấp số>`.
  `ma_cqt` để trống (cơ quan thuế cấp khi phát hành thật). HTTT mặc định `TM/CK`.
- **Dòng hàng**: `ten` = dòng 1 (tên hàng, anh gõ sẵn thì giữ nguyên 100%),
  `quy_cach` = dòng 2 (kích thước, vd `4*1000*1000mm`). Mẫu gốc luôn tách 2 dòng như vậy.
  - Bán theo tấm/cây/cuộn → `dvt` = Tấm/Cây/Cuộn, `sl` = số lượng.
  - Báo giá tính theo kg → `dvt` = `Kg`, `sl` = khối lượng (2 số lẻ), `don_gia` = giá/kg.
  - Báo giá ghi ĐVT `m2` mà anh muốn xuất theo `Tấm`: tấm 1000×1000mm = đúng 1 m² nên **giữ nguyên đơn giá**.
  - VAT mặc định 8% (`vat`: 8). Phí vận chuyển thu riêng thì KHÔNG đưa vào HĐ trừ khi anh bảo.
- Script tự tính thành tiền, thuế từng dòng, tổng theo thuế suất, số tiền bằng chữ.
  **Chạy xong phải đối chiếu tổng với báo giá; lệch thì báo anh ngay.**

## Cách chạy

Bộ dựng nằm trong repo `silicone-gasket-quote`:

```
claude/hoadon_ktech.py         # dựng HTML theo toạ độ thật của mẫu gốc
claude/shot_a4.js              # render PNG A4 bằng Chromium (Playwright)
claude/mau-goc/khung.png       # khung hoa văn, trích từ PDF gốc
claude/mau-goc/watermark.png   # logo KTECH làm watermark (vẽ opacity .146)
claude/mau-goc/logo.png        # logo góc trên trái
claude/data.json               # file mẫu, sửa rồi chạy lại
```

1. Ghi `data.json`:

```json
{"ngay":"05/11/2026","ky_hieu":"1C26TKT","httt":"Chuyển khoản","ma_cqt":"",
 "buyer":{"nguoi_mua":"","ten_don_vi":"CÔNG TY TNHH ...","mst":"...","ma_ns":"",
          "dia_chi":"...","cccd":"","stk":""},
 "items":[{"ten":"Tấm nhựa PTFE KT","quy_cach":"4*1000*1000mm","dvt":"Tấm",
           "sl":10,"don_gia":1785600,"vat":8}]}
```

2. `python3.13 claude/hoadon_ktech.py data.json "output/{YYMMDD}_hdn_{ten_khach_khong_dau}"`
   → ra `.png` (A4, scale 3.5) + `.html` + `_xem.html` (bản xem có nút +/− và "Vừa màn hình", mặc định 160%).
3. Xem PNG bằng Read để kiểm tra, rồi SendUserFile **cả PNG lẫn `_xem.html`**.
4. Trả lời 1–2 dòng: tổng thanh toán + điểm cần khách check (thiếu MST, ô để trống…).

**Phụ thuộc**: `pip install segno pdfplumber` (pdfplumber chỉ cần khi dựng lại mẫu).
Render bằng Chromium qua `require('playwright')` — **KHÔNG có `wkhtmltoimage`** trên máy chủ này.

## Số đo mẫu gốc (đã trích bằng pdfplumber, đừng đoán lại)

Trang A4 595×842pt. Font Times New Roman (máy chủ dùng Liberation Serif, cùng metric).

| Hạng mục | Giá trị |
|---|---|
| Chữ thân | 9,6pt · tiếng Anh trong ngoặc **nghiêng 8,9pt**, **có dấu cách trước ngoặc** |
| Tiêu đề | 13,8pt đậm · `(VAT INVOICE)` 12,4pt đậm nghiêng |
| Tên cty bán | **13,8pt đậm** · tên đơn vị mua: 9,6pt **thường** |
| Giá trị "Ký hiệu" | **thường** · số hóa đơn: **đậm** · cả hai căn phải tại x=541,3 |
| Dòng thông tin | lề trái x=31, cách dòng **17,3pt**, tops: 105/122/140/157/174 \| 192/209/226/244/261/278/295 |
| Email | x=297,8 · "Số tài khoản" ở dòng HTTT: x=257,9 |
| 2 đường ngang đầu | y=97,7 và y=187,1 · màu **#CCCCCC** |
| Đường kẻ bảng | màu **#776B6B**, dày 0,7pt · **không tô nền ô** |
| Cột bảng hàng | 31 / 62,6 / 211,9 / 253,8 / 295,8 / 348,7 / 423,7 / 487,7 / 563,4 |
| Cột bảng tổng hợp | 31 / 269 / 372,1 / 477,4 / 563,4 |
| Bảng hàng | bắt đầu y=308,2 · tiêu đề cao 45,4 · dòng 1 chữ 18,1 · dòng 2 chữ 30,2 |
| Bảng tổng hợp | tiêu đề cao 44 · mỗi dòng 17,9 |
| Căn lề ô | STT **giữa** · tên hàng + ĐVT **trái** (lùi 3,4pt) · còn lại **phải** (cách mép 2,8pt) |
| Logo | x31 y28,2 · 88,7×68,8pt |
| QR | x490,4 y189,2 · 68,8×68,7pt |
| Watermark | full width, y157,9, 594,9×594,8pt, **opacity 0,146** |

## Ghi nhớ

- Không in nhãn "bản nháp" (anh Cang bỏ 17/10/2026); ô Số luôn `<Chưa cấp số>`.
- Mã QR chỉ mã hoá thông tin tham chiếu nội bộ (MST bên bán | ký hiệu | ngày | tổng tiền).
  **Không giả mạo mã tra cứu của cơ quan thuế.**
- Dựng lại mẫu từ PDF gốc (nếu mất thư mục `mau-goc/`): `pdfimages -png goc.pdf img` →
  `img-000` = khung hoa văn, `img-001` = watermark, `img-004` = logo, `img-005` = QR (bỏ, tự sinh lại).
- Thiếu font Times New Roman thì Liberation Serif thay được, bề rộng dòng trùng khớp.
