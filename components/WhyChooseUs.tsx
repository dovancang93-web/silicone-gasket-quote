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
    <section className="py-16 px-4 bg-blue-800 text-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Vì Sao Nên Chọn Sản Phẩm Của Chúng Tôi
        </h2>
        <div className="w-16 h-1 bg-blue-300 mx-auto mb-10 rounded-full" />
        <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {reasons.map((r, i) => (
            <div key={i} className="flex items-start gap-3 bg-blue-700/50 rounded-xl p-5 border border-blue-600">
              <span className="text-blue-300 text-xl font-bold mt-0.5">✓</span>
              <p className="text-blue-100 leading-relaxed">{r}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
