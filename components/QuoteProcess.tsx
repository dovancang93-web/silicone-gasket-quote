const steps = [
  { step: '01', title: 'Gửi thông tin', desc: 'Khách hàng gửi thông tin sản phẩm cần mua qua form báo giá.' },
  { step: '02', title: 'Cung cấp chi tiết', desc: 'Cung cấp kích thước, số lượng, hình dạng hoặc bản vẽ nếu có.' },
  { step: '03', title: 'Kiểm tra & tư vấn', desc: 'KTECH kiểm tra yêu cầu kỹ thuật và tư vấn phương án phù hợp.' },
  { step: '04', title: 'Gửi báo giá', desc: 'Gửi báo giá sơ bộ hoặc liên hệ lại để xác nhận thêm thông tin.' },
  { step: '05', title: 'Thống nhất đơn hàng', desc: 'Thống nhất đơn hàng, thời gian giao và phương thức thanh toán.' },
]

export default function QuoteProcess() {
  return (
    <section className="py-16 px-4" style={{ background: '#F3F4F6' }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#C9A227' }}>
          Quy trình
        </p>
        <h2 className="text-3xl font-bold mb-3" style={{ color: '#111827' }}>
          Quy Trình Gửi Yêu Cầu Báo Giá
        </h2>
        <div className="w-12 h-0.5 mb-12 rounded-full" style={{ background: '#C9A227' }} />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="text-center relative">
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-8 left-1/2 w-full h-px"
                  style={{ background: '#C9A227', opacity: 0.3 }}
                />
              )}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4 relative z-10"
                style={{ background: '#111827', color: '#C9A227', border: '2px solid #C9A227' }}
              >
                {s.step}
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#111827' }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
