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
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Các Loại Gioăng Silicone Phổ Biến
        </h2>
        <div className="w-16 h-1 bg-blue-700 mx-auto mb-4 rounded-full" />
        <p className="text-gray-500 text-center mb-10">
          Sản phẩm có thể gia công theo kích thước thực tế, bản vẽ kỹ thuật hoặc mẫu có sẵn của khách hàng.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {types.map((t, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-700 font-bold text-sm">{i + 1}</span>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">{t.name}</h3>
              <p className="text-gray-500 text-xs">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
