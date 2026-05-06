import Image from 'next/image'

const types = [
  { name: 'Gioăng silicone tròn', desc: 'Dạng tròn tiêu chuẩn, phổ biến nhất' },
  { name: 'Gioăng silicone vuông', desc: 'Dạng vuông, kín khít cho mặt phẳng' },
  { name: 'Gioăng silicone chữ U', desc: 'Ôm sát cạnh, dùng cho cửa máy, nắp' },
  { name: 'Gioăng silicone chữ D', desc: 'Làm kín tốt cho khung và cửa thiết bị' },
  { name: 'Gioăng silicone dạng ống', desc: 'Linh hoạt, dùng cho hệ thống đường ống' },
  { name: 'Gioăng tấm cắt theo bản vẽ', desc: 'Gia công theo hình dạng bất kỳ' },
  { name: 'Gioăng silicone chịu nhiệt', desc: 'Dùng cho môi trường nhiệt độ cao' },
  { name: 'Gioăng tủ điện & máy móc', desc: 'Chuyên dụng cho thiết bị điện công nghiệp' },
]

export default function ProductTypes() {
  return (
    <section className="py-16 px-4" style={{ background: '#F3F4F6' }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#C9A227' }}>
          Danh mục
        </p>
        <h2 className="text-3xl font-bold mb-3" style={{ color: '#111827' }}>
          Các Loại Gioăng Silicone Phổ Biến
        </h2>
        <div className="w-12 h-0.5 mb-4 rounded-full" style={{ background: '#C9A227' }} />
        <p className="mb-10" style={{ color: '#4B5563' }}>
          Sản phẩm có thể gia công theo kích thước thực tế, bản vẽ kỹ thuật hoặc mẫu có sẵn của khách hàng.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="grid grid-cols-2 gap-3">
            {types.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 border hover:border-yellow-500 transition-colors duration-200"
                style={{ borderColor: '#E5E7EB' }}
              >
                <div
                  className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold mb-2"
                  style={{ background: '#111827', color: '#C9A227' }}
                >
                  {i + 1}
                </div>
                <h3 className="font-semibold text-sm mb-1" style={{ color: '#111827' }}>{t.name}</h3>
                <p className="text-xs" style={{ color: '#6B7280' }}>{t.desc}</p>
              </div>
            ))}
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: '1/1' }}>
            <Image
              src="/Gioang-silicone/20171130_100518-COLLAGE.jpg"
              alt="Các loại gioăng silicone đỏ công nghiệp"
              fill
              className="object-cover img-brighten"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.5) 0%, transparent 50%)' }}
            />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white text-sm font-semibold">Gioăng silicone đỏ công nghiệp</p>
              <p className="text-gray-300 text-xs">Dạng cuộn – Gia công theo yêu cầu</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
