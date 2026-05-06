export default function CallToAction() {
  return (
    <section className="py-16 px-4 bg-white">
      <div
        className="max-w-4xl mx-auto rounded-2xl text-center px-8 py-14"
        style={{ background: '#0F172A' }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#C9A227' }}>
          KTECH – Vật liệu kỹ thuật B2B
        </p>
        <h2 className="text-3xl font-bold text-white mb-5">
          Bạn Đang Cần Gioăng Silicone?
        </h2>
        <p className="text-lg leading-relaxed mb-8" style={{ color: '#9CA3AF' }}>
          Cho dù là tủ điện, máy móc, dây chuyền sản xuất hay thiết bị công nghiệp —
          hãy gửi yêu cầu ngay. KTECH sẽ tư vấn và phản hồi trong thời gian sớm nhất.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#quote-form"
            className="inline-block font-bold text-base px-10 py-4 rounded-lg transition-opacity hover:opacity-90"
            style={{ background: '#C9A227', color: '#0F172A' }}
          >
            Gửi yêu cầu báo giá
          </a>
          <a
            href="tel:0921270789"
            className="inline-block font-medium text-base px-10 py-4 rounded-lg border transition-colors"
            style={{ borderColor: '#4B5563', color: '#D1D5DB' }}
          >
            Gọi: 0921 270 789
          </a>
        </div>
      </div>
    </section>
  )
}
