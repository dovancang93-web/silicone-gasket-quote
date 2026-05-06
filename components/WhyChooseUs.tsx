const reasons = [
  'Tư vấn đúng loại gioăng theo nhu cầu sử dụng.',
  'Có thể cung cấp theo kích thước, mẫu hoặc bản vẽ kỹ thuật.',
  'Phù hợp với khách hàng doanh nghiệp, nhà máy, xưởng sản xuất và đơn vị gia công.',
  'Hỗ trợ báo giá nhanh theo yêu cầu.',
  'Có thể cung cấp số lượng linh hoạt theo từng đơn hàng.',
  'Ưu tiên giải pháp thực tế, dễ triển khai và phù hợp chi phí.',
]

export default function WhyChooseUs() {
  return (
    <section className="py-16 px-4" style={{ background: '#111827' }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#C9A227' }}>
          KTECH
        </p>
        <h2 className="text-3xl font-bold mb-3 text-white">
          Vì Sao Nên Chọn Chúng Tôi
        </h2>
        <div className="w-12 h-0.5 mb-10 rounded-full" style={{ background: '#C9A227' }} />
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl p-5 border"
              style={{ background: '#1F2937', borderColor: '#374151' }}
            >
              <span
                className="shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs font-bold mt-0.5"
                style={{ background: '#C9A227', color: '#0F172A' }}
              >
                ✓
              </span>
              <p style={{ color: '#D1D5DB' }} className="leading-relaxed text-sm">{r}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
