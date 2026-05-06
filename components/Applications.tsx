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
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Ứng Dụng Trong Công Nghiệp
        </h2>
        <div className="w-16 h-1 bg-blue-700 mx-auto mb-10 rounded-full" />
        <p className="text-gray-600 text-center text-lg mb-10">
          Gioăng silicone được sử dụng rộng rãi trong nhiều lĩnh vực:
        </p>
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {applications.map((app, i) => (
            <div key={i} className="flex items-start gap-3 bg-blue-50 rounded-lg p-4 border border-blue-100">
              <span className="text-blue-700 font-bold text-xl leading-none mt-0.5">✓</span>
              <p className="text-gray-700">{app}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
