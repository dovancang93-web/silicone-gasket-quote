const steps = [
  { step: '01', title: 'Gửi thông tin', desc: 'Khách hàng gửi thông tin sản phẩm cần mua qua form báo giá.' },
  { step: '02', title: 'Cung cấp chi tiết', desc: 'Cung cấp kích thước, số lượng, hình dạng gioăng hoặc bản vẽ nếu có.' },
  { step: '03', title: 'Kiểm tra & tư vấn', desc: 'Chúng tôi kiểm tra yêu cầu kỹ thuật và tư vấn phương án phù hợp.' },
  { step: '04', title: 'Gửi báo giá', desc: 'Gửi báo giá sơ bộ hoặc liên hệ lại để xác nhận thêm thông tin.' },
  { step: '05', title: 'Thống nhất đơn hàng', desc: 'Thống nhất đơn hàng, thời gian giao hàng và phương thức thanh toán.' },
]

export default function QuoteProcess() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Quy Trình Gửi Yêu Cầu Báo Giá
        </h2>
        <div className="w-16 h-1 bg-blue-700 mx-auto mb-10 rounded-full" />
        <div className="relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-blue-200 mx-20" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-blue-700 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4 relative z-10 shadow-md">
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
