import Image from 'next/image'

const specs = [
  { label: 'Vật liệu', value: 'Silicone' },
  { label: 'Màu sắc', value: 'Trắng, đỏ, đen, trong, xám hoặc theo yêu cầu' },
  { label: 'Hình dạng', value: 'Tròn, vuông, chữ U, chữ D, dạng ống, dạng tấm hoặc theo bản vẽ' },
  { label: 'Độ cứng', value: 'Tùy theo yêu cầu sử dụng' },
  { label: 'Kích thước', value: 'Sản xuất hoặc cắt theo yêu cầu' },
  { label: 'Khả năng chịu nhiệt', value: 'Tùy theo từng loại silicone và điều kiện sử dụng' },
  { label: 'Ứng dụng', value: 'Làm kín, chống bụi, chống nước, cách điện, giảm rung' },
]

export default function TechSpecs() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#C9A227' }}>
          Thông số
        </p>
        <h2 className="text-3xl font-bold mb-3" style={{ color: '#111827' }}>
          Thông Số Kỹ Thuật Tham Khảo
        </h2>
        <div className="w-12 h-0.5 mb-4 rounded-full" style={{ background: '#C9A227' }} />
        <p className="text-sm mb-8" style={{ color: '#6B7280' }}>
          Các thông số dưới đây chỉ mang tính tham khảo. Thông số cụ thể thay đổi tùy theo loại vật liệu,
          yêu cầu sử dụng và tiêu chuẩn của từng đơn hàng.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden border" style={{ borderColor: '#E5E7EB' }}>
            <table className="w-full text-sm">
              <tbody>
                {specs.map((s, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#ffffff' : '#F9FAFB' }}>
                    <td
                      className="py-3 px-5 font-semibold border-b w-40"
                      style={{ color: '#111827', borderColor: '#F3F4F6' }}
                    >
                      {s.label}
                    </td>
                    <td
                      className="py-3 px-5 border-b"
                      style={{ color: '#4B5563', borderColor: '#F3F4F6' }}
                    >
                      {s.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: '4/3' }}>
            <Image
              src="/Gioang-silicone/IMG_7306.jpg"
              alt="Gioăng silicone vuông KTECH"
              fill
              className="object-cover img-brighten-strong"
            />
          </div>
        </div>

        <p className="text-xs mt-5" style={{ color: '#9CA3AF' }}>
          * Đối với yêu cầu kỹ thuật đặc biệt (chịu nhiệt cao, tiếp xúc thực phẩm, hóa chất...),
          khách hàng vui lòng cung cấp thêm thông tin để được tư vấn chính xác hơn.
        </p>
      </div>
    </section>
  )
}
