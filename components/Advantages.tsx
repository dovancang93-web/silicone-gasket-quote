const advantages = [
  { icon: '🔄', title: 'Độ đàn hồi tốt', desc: 'Dễ lắp đặt và sử dụng trong nhiều điều kiện làm việc khác nhau.' },
  { icon: '🌡️', title: 'Chịu nhiệt tốt', desc: 'Hoạt động ổn định trong nhiều điều kiện nhiệt độ làm việc.' },
  { icon: '🛡️', title: 'Chống lão hóa', desc: 'Hạn chế nứt gãy, kéo dài tuổi thọ trong quá trình sử dụng lâu dài.' },
  { icon: '💧', title: 'Chống bụi & nước', desc: 'Làm kín hiệu quả, bảo vệ thiết bị khỏi bụi bẩn và độ ẩm.' },
  { icon: '⚡', title: 'Cách điện tốt', desc: 'Phù hợp với thiết bị điện, tủ điện và hệ thống điện công nghiệp.' },
  { icon: '✂️', title: 'Gia công linh hoạt', desc: 'Sản xuất theo kích thước, hình dạng và yêu cầu kỹ thuật riêng.' },
  { icon: '🏭', title: 'Đa ngành công nghiệp', desc: 'Phù hợp cho nhiều lĩnh vực: điện, thực phẩm, y tế, cơ khí.' },
]

export default function Advantages() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Ưu Điểm Nổi Bật
        </h2>
        <div className="w-16 h-1 bg-blue-700 mx-auto mb-10 rounded-full" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
