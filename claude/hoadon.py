# -*- coding: utf-8 -*-
"""Hoa don GTGT KTECH - dung theo mau chuan (song ngu, khung hoa van, bang tong hop)."""
import json, sys, base64, subprocess, io
import segno
from border import khung

W = 794

CHU = ["không","một","hai","ba","bốn","năm","sáu","bảy","tám","chín"]
def _ba(t, c, d, full):
    s = ""
    if full or t > 0:
        s += CHU[t] + " trăm"
        if c == 0 and d > 0: s += " linh"
    if c > 1:
        s += " " + CHU[c] + " mươi"
        if d == 1: s += " mốt"
        elif d == 5: s += " lăm"
        elif d > 0: s += " " + CHU[d]
    elif c == 1:
        s += " mười"
        if d == 5: s += " lăm"
        elif d > 0: s += " " + CHU[d]
    elif d > 0:
        s += " " + CHU[d]
    return s.strip()

def doc_so(n):
    n = int(round(n))
    if n == 0: return "Không đồng"
    g, x = [], n
    while x > 0: g.append(x % 1000); x //= 1000
    g.reverse()
    dv = ["", " nghìn", " triệu", " tỷ"]
    out = [ _ba(v//100, v//10%10, v%10, k > 0) + dv[len(g)-k-1] for k, v in enumerate(g) if v ]
    s = " ".join(out).strip()
    return s[0].upper() + s[1:] + " đồng"

def so(x, dec=0):
    return f"{x:,.{dec}f}".replace(",", "@").replace(".", ",").replace("@", ".")

def b64(path):
    return base64.b64encode(open(path, "rb").read()).decode()

def qr_b64(text):
    buf = io.BytesIO()
    segno.make(text, error="m").save(buf, kind="png", scale=8, border=1, dark="#000", light="#fff")
    return base64.b64encode(buf.getvalue()).decode()

def dong(nhan, en, gia_tri, dam=False, lon=False):
    v = f'<b>{gia_tri}</b>' if dam else gia_tri
    cls = ' class="ten-dv"' if lon else ""
    return (f'<div class="ln"><span class="nh">{nhan}</span> <span class="en">({en})</span>:'
            f'<span{cls}> {v}</span></div>')

def build(d, H=1180):
    it = d["items"]
    for i in it:
        i["tt"] = round(i["sl"] * i["don_gia"], 0)
        i["thue"] = round(i["tt"] * i.get("vat", 8) / 100, 0)
    cong = sum(i["tt"] for i in it)
    thue = sum(i["thue"] for i in it)
    tong = cong + thue

    nhom = {}
    for i in it:
        a = nhom.setdefault(i.get("vat", 8), [0, 0]); a[0] += i["tt"]; a[1] += i["thue"]

    rows = ""
    for n, i in enumerate(it, 1):
        ten = i["ten"] + (f'<br>{i["quy_cach"]}' if i.get("quy_cach") else "")
        rows += (f'<tr><td class="c">{n}</td><td class="l">{ten}</td><td class="c">{i["dvt"]}</td>'
                 f'<td class="r">{so(i["sl"],2)}</td><td class="r">{so(i["don_gia"],2)}</td>'
                 f'<td class="r">{so(i["tt"])}</td><td class="c">{i.get("vat",8)}%</td>'
                 f'<td class="r">{so(i["thue"])}</td></tr>')

    def th_row(nhan, en, key=None):
        if key is not None and key in nhom:
            a = nhom[key]
            return (f'<tr><td class="l">{nhan} <i>({en})</i>:</td><td class="r v">{so(a[0])}</td>'
                    f'<td class="r v">{so(a[1])}</td><td class="r v">{so(a[0]+a[1])}</td></tr>')
        return (f'<tr><td class="l">{nhan} <i>({en})</i>:</td>'
                f'<td class="v"></td><td class="v"></td><td class="v"></td></tr>')

    th = (th_row("Không kê khai thuế GTGT", "Not required to declare, pay VAT")
        + th_row("Không chịu thuế GTGT", "VAT exemption")
        + th_row("Thuế suất 0%", "VAT rate 0%", 0)
        + th_row("Thuế suất 5%", "VAT rate 5%", 5)
        + th_row("Thuế suất 8%", "VAT rate 8%", 8)
        + th_row("Thuế suất 10%", "VAT rate 10%", 10)
        + th_row("Thuế suất KHÁC", "Other VAT rates")
        + f'<tr class="tong"><td class="l"><b>Tổng cộng</b> <i>(Total)</i>:</td>'
          f'<td class="r v"><b>{so(cong)}</b></td><td class="r v"><b>{so(thue)}</b></td>'
          f'<td class="r v"><b>{so(tong)}</b></td></tr>')

    b = d["buyer"]
    ng = d["ngay"]
    qr = qr_b64(d.get("qr", f'KTECH|0111501770|{d.get("ky_hieu","1C26TKT")}|{ng}|{int(tong)}'))
    svg = base64.b64encode(khung(W, H).encode()).decode()

    return f"""<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8"><style>
*{{box-sizing:border-box;margin:0;padding:0}}
body{{background:#fff}}
.page{{width:{W}px;height:{H}px;position:relative;
background:url(data:image/svg+xml;base64,{svg}) no-repeat center/100% 100%;
font-family:'Times New Roman',Times,serif;font-size:11.3px;color:#000}}
.in{{position:absolute;left:28px;right:28px;top:24px}}
.wm{{position:absolute;left:0;right:0;top:46%;text-align:center;font-family:Arial,sans-serif;
font-size:62px;font-weight:900;color:#2E74B5;opacity:.09;letter-spacing:8px;z-index:0;padding-left:90px}}
.z{{z-index:1}}
table{{border-collapse:collapse}}
.c{{text-align:center}} .r{{text-align:right}} .l{{text-align:left}}
.hd{{width:738px;table-layout:fixed}} .hd>tbody>tr>td{{vertical-align:top}}
.tt{{text-align:center;font-size:18.6px;font-weight:bold;letter-spacing:.3px}}
.tten{{text-align:center;font-size:12.6px;font-style:italic;font-weight:bold;margin-top:1px}}
.ngay{{text-align:center;font-size:11.5px;font-style:italic;margin-top:3px}}
.cqt{{text-align:center;font-size:10.8px;font-style:italic;margin-top:1.5px}}
.sr{{font-size:11.3px;text-align:left}} .sr td{{padding:1px 0}}
.sr .k{{white-space:nowrap}} .sr .vv{{text-align:right;font-weight:bold;padding-left:8px}}
.ln{{margin-bottom:2.2px;line-height:1.34}}
.en{{font-style:italic}}
.ten-dv{{font-weight:bold;font-size:13.8px}}
.sec{{margin-top:4px}}
.bq{{width:738px;table-layout:fixed}} .bq>tbody>tr>td{{vertical-align:top;padding:0}}
.qr{{width:88px;height:88px;display:block}}
.gd{{width:738px;table-layout:fixed;margin-top:6px;font-size:11px}}
.gd th{{border:.9px solid #2E74B5;padding:3.5px 3px;text-align:center;font-weight:bold;line-height:1.2}}
.gd th i{{font-weight:normal;font-size:9.7px}}
.gd td{{border:.9px solid #2E74B5;padding:3.5px 4px;vertical-align:top;line-height:1.25;word-wrap:break-word}}
.gd .trong td{{height:13px}}
.sm{{width:738px;table-layout:fixed;margin-top:6px;font-size:11px}}
.sm th{{border:.9px solid #2E74B5;padding:4px;text-align:center;font-weight:bold;line-height:1.2}}
.sm th i{{font-weight:normal;font-size:9.7px}}
.sm td{{border:.9px solid #2E74B5;padding:3.6px 5px;height:17px}}
.sm td.v{{background:#FFFDF0}}
.sm td i{{font-size:9.7px}}
.sm .tong td{{font-size:11.8px}}
.words{{margin-top:6px;font-size:11.3px}}
.words b{{font-style:italic}}
</style></head><body><div class="page"><div class="wm">KTECH</div><div class="in z">

<table class="hd"><tr>
<td style="width:92px"><img src="data:image/png;base64,{b64('logo.png')}" style="height:60px"></td>
<td style="width:466px"><div class="tt">HÓA ĐƠN GIÁ TRỊ GIA TĂNG</div>
<div class="tten">(VAT INVOICE)</div>
<div class="ngay">Ngày <i>(Date)</i> {ng[:2]} tháng <i>(month)</i> {ng[3:5]} năm <i>(year)</i> {ng[6:]}</div>
<div class="cqt">Mã CQT <i>(Code)</i>: {d.get("ma_cqt","")}</div></td>
<td style="width:168px"><table class="sr">
<tr><td class="k">Ký hiệu <i>(Serial)</i>:</td><td class="vv">{d.get("ky_hieu","1C26TKT")}</td></tr>
<tr><td class="k">Số <i>(No.)</i>:</td><td class="vv">&lt;Chưa cấp số&gt;</td></tr>
</table></td></tr></table>

<div class="sec">
{dong("Đơn vị bán hàng","Seller","CÔNG TY TNHH VẬT LIỆU KỸ THUẬT KTECH",lon=True)}
{dong("Mã số thuế","Tax code","0111501770")}
{dong("Địa chỉ","Address","Tầng 4 - Lô 10 liền kề 21, khu đấu giá Mậu Lương, Phường Kiến Hưng, TP Hà Nội, Việt Nam.")}
<div class="ln"><span class="nh">Điện thoại</span> <span class="en">(Tel)</span>: 0921 270 789
<span style="display:inline-block;width:150px"></span><span class="nh">Email</span>: vlktktechco.sales@gmail.com</div>
{dong("Số tài khoản","Bank account","517 576 8888 - Ngân hàng TMCP Quân đội (MB Bank) - CN Thanh Xuân")}
</div>

<table class="bq sec"><tr><td style="width:634px">
{dong("Họ tên người mua hàng","Buyer", b.get("nguoi_mua",""))}
{dong("Tên đơn vị","Company's name", b.get("ten_don_vi",""), dam=True)}
{dong("MST/CCCD chủ hộ","Tax code/Household Head's ID", b.get("mst",""))}
{dong("MSĐVCQHVNS","Budgetary unit code", b.get("ma_ns",""))}
{dong("Địa chỉ","Address", b.get("dia_chi",""))}
{dong("CCCD người mua","Buyer's ID", b.get("cccd",""))}
<div class="ln"><span class="nh">Hình thức thanh toán</span> <span class="en">(Payment method)</span>: {d.get("httt","TM/CK")}
<span style="display:inline-block;width:92px"></span><span class="nh">Số tài khoản</span> <span class="en">(Bank account)</span>: {b.get("stk","")}</div>
</td><td style="width:104px;padding-left:10px"><img class="qr" src="data:image/png;base64,{qr}"></td></tr></table>

<table class="gd">
<tr><th style="width:28px">STT<br><i>(No)</i></th>
<th style="width:246px">Tên hàng hóa, dịch vụ<br><i>(Name of goods and services)</i></th>
<th style="width:54px">Đơn vị<br>tính <i>(Unit)</i></th>
<th style="width:62px">Số lượng<br><i>(Quantity)</i></th>
<th style="width:90px">Đơn giá<br><i>(Unit price)</i></th>
<th style="width:92px">Thành tiền<br><i>(Amount)</i></th>
<th style="width:56px">Thuế suất<br>GTGT <i>(VAT rate)</i></th>
<th style="width:106px">Tiền thuế GTGT<br><i>(VAT Amount)</i></th></tr>
{rows}</table>

<table class="sm">
<tr><th style="width:294px">Tổng hợp <i>(In summary)</i></th>
<th style="width:150px">Thành tiền trước thuế<br>GTGT <i>(Total before VAT)</i></th>
<th style="width:134px">Tiền thuế GTGT<br><i>(VAT amount)</i></th>
<th style="width:160px">Cộng tiền thanh<br>toán <i>(Total amount)</i></th></tr>
{th}</table>

<div class="words">Số tiền viết bằng chữ <i>(Total amount in words)</i>: <b>{doc_so(tong)}.</b></div>
</div></div></body></html>"""

if __name__ == "__main__":
    data = json.load(open(sys.argv[1], encoding="utf-8"))
    base = sys.argv[2]
    # Luot 1: do chieu cao noi dung thuc te
    open(base + ".html", "w", encoding="utf-8").write(build(data, 1400))
    h = int(subprocess.run(["node", "measure.js", base + ".html"],
                           capture_output=True, text=True, check=True).stdout.strip())
    # Luot 2: dung lai trang vua khit noi dung
    open(base + ".html", "w", encoding="utf-8").write(build(data, h + 26))
    subprocess.run(["node", "shot2.js", base + ".html", base + ".png", str(h + 26)], check=True)
    print("Chieu cao trang:", h + 26, "px")
    it = data["items"]
    cong = sum(round(i["sl"]*i["don_gia"],0) for i in it)
    thue = sum(round(round(i["sl"]*i["don_gia"],0)*i.get("vat",8)/100,0) for i in it)
    print("Cong tien hang :", so(cong)); print("Tien thue GTGT :", so(thue))
    print("Tong thanh toan:", so(cong+thue)); print("Bang chu       :", doc_so(cong+thue))
