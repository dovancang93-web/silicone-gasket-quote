const advantages = [
  { icon: '⟳', title: 'Độ đàn hồi tốt', desc: 'Dễ lắp đặt và sử dụng trong nhiều điều kiện làm việc khác nhau.' },
  { icon: '◈', title: 'Chịu nhiệt tốt', desc: 'Hoạt động ổn định trong nhiều điều kiện nhiệt độ làm việc.' },
  { icon: '◉', title: 'Chống lão hóa', desc: 'Hạn chế nứt gãy, kéo dài tuổi thọ trong quá trình sử dụng lâu dài.' },
  { icon: '◆', title: 'Chống bụi & nước', desc: 'Làm kín hiệu quả, bảo vệ thiết bị khỏi bụi bẩn và độ ẩm.' },
  { icon: '⚡', title: 'Cách điện tốt', desc: 'Phù hợp với thiết bị điện, tủ điện và hệ thống điện công nghiệp.' },
  { icon: '◧', title: 'Gia công linh hoạt', desc: 'Sản xuất theo kích thước, hình dạng và yêu cầu kỹ thuật riêng.' },
  { icon: '◈', title: 'Đa ngành công nghiệp', desc: 'Phù hợp cho nhiều lĩnh vực: điện, thực phẩm, y tế, cơ khí.' },
]

export default function Advantages() {
  return (
    <section className="py-16 px-4" style={{ background: '#F3F4F6' }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#C9A227' }}>
          Tính năng
        </p>
        <h2 className="text-3xl font-bold mb-3" style={{ color: '#111827' }}>
          Ưu Điểm Nổi Bật
        </h2>
        <div className="w-12 h-0.5 mb-10 rounded-full" style={{ background: '#C9A227' }} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {advantages.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 border hover:shadow-md transition-shadow duration-200"
              style={{ borderColor: '#E5E7EB' }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-lg font-bold"
                style={{ background: '#111827', color: '#C9A227' }}
              >
                {item.icon}
              </div>
              <h3 className="text-base font-semibold mb-2" style={{ color: '#111827' }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
