import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gioăng Silicone Công Nghiệp – Báo Giá Theo Yêu Cầu',
  description:
    'Cung cấp gioăng silicone công nghiệp theo yêu cầu. Chịu nhiệt, chống lão hóa, cách điện tốt. Gửi yêu cầu báo giá ngay.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={geist.className}>
      <body className="min-h-screen flex flex-col bg-white text-gray-800">
        <div className="flex-1">{children}</div>
        <footer className="bg-gray-800 text-gray-400 py-8 px-4 text-center text-sm">
          <p className="mb-1 text-gray-300 font-medium">Gioăng Silicone Công Nghiệp</p>
          <p>© {new Date().getFullYear()} – Cung cấp gioăng silicone theo yêu cầu kỹ thuật.</p>
        </footer>
      </body>
    </html>
  )
}
