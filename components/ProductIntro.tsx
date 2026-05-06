import Image from 'next/image'

export default function ProductIntro() {
  return (
    <section id="product-intro" className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#C9A227' }}>
          Về sản phẩm
        </p>
        <h2 className="text-3xl font-bold mb-3" style={{ color: '#111827' }}>
          Giới Thiệu Sản Phẩm
        </h2>
        <div className="w-12 h-0.5 mb-10 rounded-full" style={{ background: '#C9A227' }} />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: '4/3' }}>
            <Image
              src="/Gioang-silicone/20171130_100230.jpg"
              alt="Gioăng silicone dạng ống KTECH"
              fill
              className="object-cover img-brighten-strong"
            />
          </div>
          <div>
            <p className="text-lg leading-relaxed mb-5" style={{ color: '#4B5563' }}>
              Gioăng silicone là sản phẩm làm kín được sản xuất từ vật liệu silicone có tính đàn hồi
              tốt, khả năng chịu nhiệt, chống lão hóa và cách điện tương đối ổn định.
            </p>
            <p className="text-lg leading-relaxed mb-6" style={{ color: '#4B5563' }}>
              Sản phẩm thường được sử dụng để làm kín khe hở, chống bụi, chống nước, giảm rung và
              bảo vệ thiết bị trong nhiều môi trường công nghiệp khác nhau.
            </p>
            <div className="rounded-xl p-5 border-l-4" style={{ background: '#F3F4F6', borderColor: '#C9A227' }}>
              <p className="leading-relaxed" style={{ color: '#4B5563' }}>
                Với đặc tính mềm dẻo, dễ gia công và có thể sản xuất theo nhiều hình dạng khác nhau,
                gioăng silicone phù hợp cho các ứng dụng cần độ kín khít, độ bền và tính ổn định
                trong quá trình vận hành.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
