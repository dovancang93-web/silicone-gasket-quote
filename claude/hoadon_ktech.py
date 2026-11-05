# -*- coding: utf-8 -*-
"""Hoa don GTGT KTECH - dung lai CHINH XAC theo toa do trich tu PDF goc.
   Moi so do (pt) deu lay tu file 1C26TKT_00000189 cua KTECH."""
import json, sys, base64, subprocess, io, os
import segno

ASC   = 0.891          # ty le ascent cua Times -> quy baseline
F_BD  = "#776B6B"      # mau duong ke bang (lay tu PDF goc)
F_HR  = "#CCCCCC"      # mau 2 duong ngang duoi phan tieu de
TH    = 0.7            # do day duong ke (pt)
GX    = [31.0, 62.6, 211.9, 253.8, 295.8, 348.7, 423.7, 487.7, 563.4]   # bien cot bang hang
SX    = [31.0, 269.0, 372.1, 477.4, 563.4]                              # bien cot bang tong hop
GY0, GY1 = 308.2, 353.6     # bang hang: dau / het dong tieu de
RH    = 18.1                # dong hang 1 dong chu
RH2   = 30.2                # dong hang 2 dong (ten + quy cach) - nhu ban goc
SHH   = 44.0                # chieu cao dong tieu de bang tong hop
SRH   = 17.9                # chieu cao 1 dong tong hop
CEN   = 278.2               # tam khoi tieu de

CHU = ["không","một","hai","ba","bốn","năm","sáu","bảy","tám","chín"]
def _ba(t,c,d,full):
    s=""
    if full or t>0:
        s+=CHU[t]+" trăm"
        if c==0 and d>0: s+=" linh"
    if c>1:
        s+=" "+CHU[c]+" mươi"
        if d==1: s+=" mốt"
        elif d==5: s+=" lăm"
        elif d>0: s+=" "+CHU[d]
    elif c==1:
        s+=" mười"
        if d==5: s+=" lăm"
        elif d>0: s+=" "+CHU[d]
    elif d>0: s+=" "+CHU[d]
    return s.strip()

def doc_so(n):
    n=int(round(n))
    if n==0: return "Không đồng"
    g,x=[],n
    while x>0: g.append(x%1000); x//=1000
    g.reverse()
    dv=["", " nghìn", " triệu", " tỷ"]
    out=[_ba(v//100,v//10%10,v%10,k>0)+dv[len(g)-k-1] for k,v in enumerate(g) if v]
    s=" ".join(out).strip()
    return s[0].upper()+s[1:]+" đồng"

def so(x,dec=0): return f"{x:,.{dec}f}".replace(",","@").replace(".",",").replace("@",".")
def b64f(p): return base64.b64encode(open(p,"rb").read()).decode()

def qr_b64(t):
    buf=io.BytesIO(); segno.make(t,error="m").save(buf,kind="png",scale=10,border=0)
    return base64.b64encode(buf.getvalue()).decode()

# ---------- cac phan tu nguyen thuy ----------
E=[]
def txt(x, pdf_top, html, size=9.6, bold=False, w=None, align="left"):
    """Dat 1 dong chu: x = le trai (hoac o trai cua khung khi co w), pdf_top = 'top' trong PDF."""
    base = pdf_top + ASC*size
    st = (f"left:{x}pt;top:{base}pt;font-size:{size}pt;"
          + (f"width:{w}pt;text-align:{align};" if w else "")
          + ("font-weight:bold;" if bold else ""))
    E.append(f'<div class="t" style="{st}">{html}</div>')

def tbase(x, base, html, size=9.6, bold=False, w=None, align="left"):
    st = (f"left:{x}pt;top:{base}pt;font-size:{size}pt;"
          + (f"width:{w}pt;text-align:{align};" if w else "")
          + ("font-weight:bold;" if bold else ""))
    E.append(f'<div class="t" style="{st}">{html}</div>')

def hline(x0, x1, y, col=F_BD):
    E.append(f'<div class="r" style="left:{x0}pt;top:{y}pt;width:{x1-x0}pt;height:{TH}pt;background:{col}"></div>')
def vline(x, y0, y1, col=F_BD):
    E.append(f'<div class="r" style="left:{x}pt;top:{y0}pt;width:{TH}pt;height:{y1-y0}pt;background:{col}"></div>')

def en(s):  return f'<i>({s})</i>'          # phan tieng Anh: nghieng 8.9pt
def nhan(vi, anh): return f'{vi} {en(anh)}:'  # "Nhan (English):" - co dau cach nhu ban goc

def build(d, nhe=False):
    """nhe=True: dung anh nen da nen nho, cho ban xem HTML."""
    E.clear()
    it = d["items"]
    for i in it:
        i["tt"]   = round(i["sl"]*i["don_gia"], 0)
        i["thue"] = round(i["tt"]*i.get("vat",8)/100, 0)
    cong = sum(i["tt"] for i in it); thue = sum(i["thue"] for i in it); tong = cong+thue
    nhom = {}
    for i in it:
        a = nhom.setdefault(i.get("vat",8), [0,0]); a[0]+=i["tt"]; a[1]+=i["thue"]
    b = d["buyer"]; ng = d["ngay"]

    # ===== TIEU DE =====
    txt(121.7, 30, "HÓA ĐƠN GIÁ TRỊ GIA TĂNG", 13.8, True, w=(434.7-121.7), align="center")
    txt(121.7, 48, "<i>(VAT INVOICE)</i>", 12.4, True, w=(434.7-121.7), align="center")
    txt(121.7, 67, f"Ngày {en('Date')} {ng[:2]} tháng {en('month')} {ng[3:5]} năm {en('year')} {ng[6:]}",
        9.6, w=(434.7-121.7), align="center")
    txt(121.7, 84, f"Mã CQT {en('Code')}: {d.get('ma_cqt','')}", 9.6, w=(434.7-121.7), align="center")
    txt(434.7, 32, f"Ký hiệu {en('Serial')}:", 9.6)
    txt(434.7, 32, d.get("ky_hieu","1C26TKT"), 9.6, False, w=(541.3-434.7), align="right")
    txt(434.7, 50, f"Số {en('No.')}:", 9.6)
    txt(434.7, 50, "&lt;Chưa cấp số&gt;", 9.6, True, w=(541.3-434.7), align="right")
    hline(31.0, 564.0, 97.7, F_HR)

    # ===== BEN BAN =====
    txt(31.0, 105, f"{nhan('Đơn vị bán hàng','Seller')} "
                   f"<span style='font-size:13.8pt;font-weight:bold'>CÔNG TY TNHH VẬT LIỆU KỸ THUẬT KTECH</span>")
    txt(31.0, 122, f"{nhan('Mã số thuế','Tax code')} 0111501770")
    txt(31.0, 140, f"{nhan('Địa chỉ','Address')} Tầng 4 - Lô 10 liền kề 21, khu đấu giá Mậu Lương, "
                   f"Phường Kiến Hưng, TP Hà Nội, Việt Nam.")
    txt(31.0, 157, f"{nhan('Điện thoại','Tel')} 0921 270 789")
    txt(297.8, 157, "Email: vlktktechco.sales@gmail.com")
    txt(31.0, 174, f"{nhan('Số tài khoản','Bank account')} 517 576 8888 - Ngân hàng TMCP Quân đội "
                   f"(MB Bank) - CN Thanh Xuân")
    hline(31.0, 564.0, 187.1, F_HR)

    # ===== BEN MUA =====
    txt(31.0, 192, f"{nhan('Họ tên người mua hàng','Buyer')} {b.get('nguoi_mua','')}")
    txt(31.0, 209, f"{nhan('Tên đơn vị',chr(39).join(['Company','s name']))} "
                   f"{b.get('ten_don_vi','')}")
    txt(31.0, 226, f"{nhan('MST/CCCD chủ hộ','Tax code/Household Head'+chr(39)+'s ID')} {b.get('mst','')}")
    txt(31.0, 244, f"{nhan('MSĐVCQHVNS','Budgetary unit code')}")
    txt(31.0, 261, f"{nhan('Địa chỉ','Address')} {b.get('dia_chi','')}")
    txt(31.0, 278, f"{nhan('CCCD người mua','Buyer'+chr(39)+'s ID')} {b.get('cccd','')}")
    txt(31.0, 295, f"{nhan('Hình thức thanh toán','Payment method')} {d.get('httt','TM/CK')}")
    txt(257.9, 295, f"{nhan('Số tài khoản','Bank account')} {b.get('stk','')}")

    # ===== BANG HANG =====
    hs = [RH2 if i.get("quy_cach") else RH for i in it]   # chieu cao tung dong
    ys = [GY1 + sum(hs[:k]) for k in range(len(it)+1)]
    gy2 = ys[-1]
    for x in GX: vline(x, GY0, gy2)
    hline(GX[0], GX[-1]+TH, GY0); hline(GX[0], GX[-1]+TH, GY1)
    for k in range(len(it)): hline(GX[0], GX[-1]+TH, ys[k+1])

    hdr = [("STT","No",2), ("Tên hàng hóa, dịch vụ","Name of goods and services",2),
           ("Đơn vị|tính","Unit",3), ("Số lượng","Quantity",2), ("Đơn giá","Unit price",2),
           ("Thành tiền","Amount",2), ("Thuế suất|GTGT","VAT rate",3), ("Tiền thuế GTGT","VAT Amount",2)]
    for c,(vi,anh,nl) in enumerate(hdr):
        x0,x1 = GX[c], GX[c+1]; w = x1-x0
        if nl == 2:
            tbase(x0, 320+ASC*9.6, vi, 9.6, True, w, "center")
            tbase(x0, 333+ASC*8.9, f"<i>({anh})</i>", 8.9, False, w, "center")
        else:
            a,bb = vi.split("|")
            tbase(x0, 313+ASC*9.6, a,  9.6, True, w, "center")
            tbase(x0, 327+ASC*9.6, bb, 9.6, True, w, "center")
            tbase(x0, 340+ASC*8.9, f"<i>({anh})</i>", 8.9, False, w, "center")

    for k,i in enumerate(it):
        ytop = ys[k]; hai = bool(i.get("quy_cach"))
        base = ytop + (19.95 if hai else 13.05)
        if hai:
            tbase(GX[1]+3.4, ytop+12.95, i["ten"],      9.6, False, (GX[2]-GX[1])-6.2, "left")
            tbase(GX[1]+3.4, ytop+25.95, i["quy_cach"], 9.6, False, (GX[2]-GX[1])-6.2, "left")
        else:
            tbase(GX[1]+3.4, base, i["ten"], 9.6, False, (GX[2]-GX[1])-6.2, "left")
        # Can le lay dung tu PDF goc: STT giua, DVT trai, con lai phai
        cell = [(0,str(k+1),"center"), (2,i["dvt"],"left"),
                (3,so(i["sl"],2),"right"), (4,so(i["don_gia"],2),"right"),
                (5,so(i["tt"]),"right"), (6,f'{i.get("vat",8)}%',"right"), (7,so(i["thue"]),"right")]
        for c,v,al in cell:
            x0,x1 = GX[c], GX[c+1]
            if al == "left":    tbase(x0+3.4, base, v, 9.6, False, (x1-x0)-6.2, "left")
            elif al == "right": tbase(x0, base, v, 9.6, False, (x1-x0)-2.8, "right")
            else:               tbase(x0, base, v, 9.6, False, (x1-x0), "center")

    # ===== BANG TONG HOP =====
    sy0 = gy2; sy1 = sy0 + SHH
    for x in SX: vline(x, sy0, sy1 + SRH*9)
    hline(SX[0], SX[-1]+TH, sy0); hline(SX[0], SX[-1]+TH, sy1)
    shdr = [("Tổng hợp","In summary",2), ("Thành tiền trước thuế|GTGT","Total before VAT",3),
            ("Tiền thuế GTGT","VAT amount",2), ("Cộng tiền thanh|toán","Total amount",3)]
    for c,(vi,anh,nl) in enumerate(shdr):
        x0,x1 = SX[c], SX[c+1]; w = x1-x0
        if nl == 2:
            tbase(x0, sy0+11.5+ASC*9.6, vi, 9.6, True, w, "center")
            tbase(x0, sy0+24.5+ASC*8.9, f"<i>({anh})</i>", 8.9, False, w, "center")
        else:
            a,bb = vi.split("|")
            tbase(x0, sy0+4.5+ASC*9.6,  a,  9.6, True, w, "center")
            tbase(x0, sy0+17.5+ASC*9.6, bb, 9.6, True, w, "center")
            tbase(x0, sy0+31.5+ASC*8.9, f"<i>({anh})</i>", 8.9, False, w, "center")

    muc = [("Không kê khai thuế GTGT","Not required to declare, pay VAT",None),
           ("Không chịu thuế GTGT","VAT exemption",None),
           ("Thuế suất 0%","VAT rate 0%",0), ("Thuế suất 5%","VAT rate 5%",5),
           ("Thuế suất 8%","VAT rate 8%",8), ("Thuế suất 10%","VAT rate 10%",10),
           ("Thuế suất KHÁC","Other VAT rates",None)]
    for k,(vi,anh,key) in enumerate(muc):
        y = sy1 + SRH*k; base = y + 13.05
        hline(SX[0], SX[-1]+TH, y + SRH)
        tbase(33.0, base, nhan(vi,anh), 9.6)
        if key is not None and key in nhom:
            a = nhom[key]
            for c,v in [(1,a[0]),(2,a[1]),(3,a[0]+a[1])]:
                tbase(SX[c], base, so(v), 9.6, False, (SX[c+1]-SX[c])-1.4, "right")
    yT = sy1 + SRH*7; baseT = yT + 13.05
    hline(SX[0], SX[-1]+TH, yT + SRH)
    tbase(33.0, baseT, f"Tổng cộng {en('Total')}:", 9.6, True)
    for c,v in [(1,cong),(2,thue),(3,tong)]:
        tbase(SX[c], baseT, so(v), 9.6, True, (SX[c+1]-SX[c])-1.4, "right")

    # ===== DONG BANG CHU =====
    yW = yT + SRH; 
    vline(SX[0], yW, yW+SRH); vline(SX[-1], yW, yW+SRH)
    hline(SX[0], SX[-1]+TH, yW+SRH)
    tbase(33.0, yW+12.95, f"{nhan('Số tiền viết bằng chữ','Total amount in words')} <b><i>{doc_so(tong)}.</i></b>", 9.6)

    qr = qr_b64(d.get("qr", f'KTECH|0111501770|{d.get("ky_hieu","1C26TKT")}|{ng}|{int(tong)}'))
    G = os.path.join(os.path.dirname(os.path.abspath(__file__)), "mau-goc")
    sfx = "_nhe" if nhe else ""
    return f"""<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8"><style>
*{{margin:0;padding:0;box-sizing:border-box}}
body{{background:#fff}}
.page{{position:relative;width:595pt;height:842pt;overflow:hidden;
font-family:'Liberation Serif','Times New Roman',Times,serif;color:#000}}
.bg,.wm{{position:absolute;left:0;display:block}}
.t{{position:absolute;line-height:0;white-space:nowrap}}
.t i{{font-size:8.9pt;font-style:italic}}
.r{{position:absolute}}
img.lg{{position:absolute;left:31pt;top:28.2pt;width:88.7pt;height:68.8pt}}
img.qr{{position:absolute;left:490.4pt;top:189.2pt;width:68.8pt;height:68.7pt}}
</style></head><body><div class="page">
<img class="bg" src="data:image/png;base64,{b64f(G+'/khung'+sfx+'.png')}" style="top:0;width:595pt;height:842pt">
<img class="wm" src="data:image/png;base64,{b64f(G+'/watermark'+sfx+'.png')}" style="top:157.9pt;width:594.9pt;height:594.8pt;opacity:.146">
<img class="lg" src="data:image/png;base64,{b64f(G+'/logo'+sfx+'.png')}">
<img class="qr" src="data:image/png;base64,{qr}">
{''.join(E)}
</div></body></html>"""

PREVIEW_CSS = """
<style id="xem">
html{--z:1.6}
body{background:#4a4f55;margin:0;padding:0 0 40px;font-family:Arial,Helvetica,sans-serif}
#thanh{position:sticky;top:0;z-index:99;background:#23272b;color:#fff;padding:8px 10px;
display:block;text-align:center;font-size:15px;box-shadow:0 2px 8px rgba(0,0,0,.4)}
#thanh b{font-size:16px;letter-spacing:.3px}
#thanh button{font-size:19px;font-weight:700;width:40px;height:36px;margin:4px 5px 0;cursor:pointer;
border:0;border-radius:8px;background:#3d4348;color:#fff;vertical-align:middle}
#thanh button:active{background:#5a6168}
#muc{display:inline-block;min-width:72px;font-variant-numeric:tabular-nums;vertical-align:middle}
#khung{overflow:auto;padding:18px 10px}
#sanh{width:calc(595pt * var(--z));height:calc(842pt * var(--z));margin:0 auto}
.page{transform:scale(var(--z));transform-origin:top left;
box-shadow:0 6px 28px rgba(0,0,0,.55);background:#fff}
@media (max-width:700px){#thanh{font-size:13px}}
</style>"""

PREVIEW_JS = """
<script>
var z=1.6;
function dat(v){z=Math.min(4,Math.max(0.25,Math.round(v*100)/100));
document.documentElement.style.setProperty('--z',z);
document.getElementById('muc').textContent=Math.round(z*100)+'%';}
function vua(){var w=document.getElementById('khung').clientWidth-22;dat(w/(595*96/72));}
function tudong(){var w=document.getElementById('khung').clientWidth-22,v=w/(595*96/72);
dat(v<1.6?v:1.6);}
tudong(); window.addEventListener('resize',function(){if(!daChinh)tudong();});
var daChinh=false;
</script>"""

def preview(html):
    """Boc file hoa don thanh ban xem tren man hinh, phong to thu nho duoc."""
    bar = ('<div id="thanh"><b>Hóa đơn nháp KTECH</b><br> '
           '<button onclick="daChinh=true;dat(z-0.15)">&minus;</button>'
           '<span id="muc">160%</span>'
           '<button onclick="daChinh=true;dat(z+0.15)">+</button> '
           '<button style="width:auto;padding:0 12px;font-size:13px" onclick="daChinh=true;vua()">Vừa khổ</button>'
           '</div><div id="khung"><div id="sanh">')
    html = html.replace("</head>", PREVIEW_CSS + "</head>")
    html = html.replace('<body>', '<body>' + bar)
    html = html.replace('</div></body>', '</div></div></div>' + PREVIEW_JS + '</body>')
    return html

if __name__ == "__main__":
    data = json.load(open(sys.argv[1], encoding="utf-8")); base = sys.argv[2]
    open(base+".html","w",encoding="utf-8").write(build(data))
    shot = os.path.join(os.path.dirname(os.path.abspath(__file__)), "shot_a4.js")
    subprocess.run(["node", shot, base+".html", base+".png"], check=True)
    open(base+"_xem.html","w",encoding="utf-8").write(preview(build(data, nhe=True)))
    print("Ban xem (zoom duoc):", base+"_xem.html")
    it=data["items"]
    cong=sum(round(i["sl"]*i["don_gia"],0) for i in it)
    thue=sum(round(round(i["sl"]*i["don_gia"],0)*i.get("vat",8)/100,0) for i in it)
    print("Cong tien hang :",so(cong)); print("Thue GTGT      :",so(thue))
    print("Tong thanh toan:",so(cong+thue)); print("Bang chu       :",doc_so(cong+thue))
