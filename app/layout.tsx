import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KTECH – Gioăng Silicone Công Nghiệp Theo Yêu Cầu',
  description:
    'KTECH cung cấp gioăng silicone công nghiệp theo yêu cầu cho nhà máy, xưởng sản xuất, tủ điện và thiết bị kỹ thuật. Báo giá nhanh – Gia công theo bản vẽ.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={geist.className}>
      <body className="min-h-screen flex flex-col bg-white" style={{ color: '#111827' }}>
        <div className="flex-1">{children}</div>
        <footer style={{ background: '#0F172A' }} className="text-gray-400 py-10 px-4">
          <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="text-white font-bold text-lg mb-1">KTECH</p>
              <p style={{ color: '#C9A227' }} className="text-xs font-medium mb-3">
                CÔNG TY TNHH VẬT LIỆU KỸ THUẬT KTECH
              </p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Vật liệu kỹ thuật – Nhựa kỹ thuật – Vật liệu làm kín – Bảo ôn công nghiệp.
              </p>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">Liên hệ</p>
              <p className="mb-1">
                <span style={{ color: '#C9A227' }}>Hotline:</span>{' '}
                <a href="tel:0921270789" className="text-white hover:underline">
                  0921 270 789
                </a>
              </p>
              <p className="text-gray-400 text-xs">Phục vụ khách hàng doanh nghiệp B2B</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">Lĩnh vực</p>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>Nhà máy & xưởng sản xuất</li>
                <li>Cơ khí & bảo trì công nghiệp</li>
                <li>Điện công nghiệp & tủ điện</li>
                <li>Gia công theo bản vẽ kỹ thuật</li>
              </ul>
            </div>
          </div>
          <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-gray-700 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} KTECH – Công Ty TNHH Vật Liệu Kỹ Thuật KTECH. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}
