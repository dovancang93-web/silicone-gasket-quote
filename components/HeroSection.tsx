export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-800 to-blue-900 text-white py-24 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-4">
          Sản phẩm công nghiệp chất lượng cao
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Gioăng Silicone Công Nghiệp<br className="hidden md:block" /> Theo Yêu Cầu
        </h1>
        <p className="text-blue-100 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
          Cung cấp gioăng silicone dùng trong công nghiệp, tủ điện, máy móc, thiết bị thực phẩm,
          hệ thống làm kín và các ứng dụng kỹ thuật yêu cầu độ đàn hồi, chịu nhiệt và độ bền cao.
        </p>
        <a
          href="#quote-form"
          className="inline-block bg-white text-blue-800 font-bold text-lg px-10 py-4 rounded-lg shadow-lg hover:bg-blue-50 transition-colors duration-200"
        >
          Gửi yêu cầu báo giá
        </a>
      </div>
    </section>
  )
}
