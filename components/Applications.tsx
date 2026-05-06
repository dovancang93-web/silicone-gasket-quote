const applications = [
  'Tủ điện, hộp điện, thiết bị điện công nghiệp',
  'Máy móc sản xuất và dây chuyền công nghiệp',
  'Thiết bị thực phẩm, thiết bị đóng gói',
  'Cửa máy, nắp máy, khung bảo vệ thiết bị',
  'Hệ thống làm kín chống bụi, chống nước',
  'Thiết bị y tế, điện tử và ứng dụng kỹ thuật khác',
  'Các vị trí cần giảm rung, giảm va đập và bảo vệ bề mặt tiếp xúc',
]

export default function Applications() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#C9A227' }}>
          Ứng dụng
        </p>
        <h2 className="text-3xl font-bold mb-3" style={{ color: '#111827' }}>
          Ứng Dụng Trong Công Nghiệp
        </h2>
        <div className="w-12 h-0.5 mb-6 rounded-full" style={{ background: '#C9A227' }} />
        <p className="text-lg mb-10" style={{ color: '#4B5563' }}>
          Gioăng silicone được sử dụng rộng rãi trong nhiều lĩnh vực:
        </p>
        <div className="grid sm:grid-cols-2 gap-3 max-w-3xl">
          {applications.map((app, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg p-4 border"
              style={{ background: '#F3F4F6', borderColor: '#E5E7EB' }}
            >
              <span
                className="font-bold text-sm mt-0.5 shrink-0 w-5 h-5 rounded flex items-center justify-center"
                style={{ background: '#C9A227', color: '#0F172A' }}
              >
                ✓
              </span>
              <p style={{ color: '#374151' }}>{app}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
