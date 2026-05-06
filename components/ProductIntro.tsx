export default function ProductIntro() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Giới Thiệu Sản Phẩm
        </h2>
        <div className="w-16 h-1 bg-blue-700 mx-auto mb-10 rounded-full" />
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-gray-600 text-lg leading-relaxed mb-5">
              Gioăng silicone là sản phẩm làm kín được sản xuất từ vật liệu silicone có tính đàn hồi
              tốt, khả năng chịu nhiệt, chống lão hóa và cách điện tương đối ổn định.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Sản phẩm thường được sử dụng để làm kín khe hở, chống bụi, chống nước, giảm rung và
              bảo vệ thiết bị trong nhiều môi trường công nghiệp khác nhau.
            </p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <p className="text-gray-600 text-lg leading-relaxed">
              Với đặc tính mềm dẻo, dễ gia công và có thể sản xuất theo nhiều hình dạng khác nhau,
              gioăng silicone phù hợp cho các ứng dụng cần độ kín khít, độ bền và tính ổn định
              trong quá trình vận hành.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
