import Image from 'next/image'

export default function HeroSection() {
  return (
    <section style={{ background: '#0F172A' }} className="text-white py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-6"
            style={{ background: '#C9A227', color: '#0F172A' }}
          >
            KTECH – Vật Liệu Kỹ Thuật
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5 text-white">
            Gioăng Silicone<br />
            <span style={{ color: '#C9A227' }}>Công Nghiệp</span><br />
            Theo Yêu Cầu
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            Cung cấp gioăng silicone dùng trong công nghiệp, tủ điện, máy móc, thiết bị thực phẩm,
            hệ thống làm kín và các ứng dụng kỹ thuật yêu cầu độ đàn hồi, chịu nhiệt và độ bền cao.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            Hotline:{' '}
            <a href="tel:0921270789" style={{ color: '#C9A227' }} className="font-bold text-base hover:underline">
              0921 270 789
            </a>
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#quote-form"
              className="inline-block font-bold text-base px-8 py-3.5 rounded-lg transition-opacity hover:opacity-90"
              style={{ background: '#C9A227', color: '#0F172A' }}
            >
              Gửi yêu cầu báo giá
            </a>
            <a
              href="#product-intro"
              className="inline-block font-medium text-base px-8 py-3.5 rounded-lg border transition-colors"
              style={{ borderColor: '#4B5563', color: '#D1D5DB' }}
            >
              Xem sản phẩm
            </a>
          </div>
        </div>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '4/3' }}>
          <Image
            src="/Gioang-silicone/20171130_100230-COLLAGE.jpg"
            alt="Gioăng silicone công nghiệp KTECH"
            fill
            className="object-cover img-brighten"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.4) 0%, transparent 60%)' }}
          />
          <div className="absolute bottom-4 left-4 right-4">
            <span
              className="text-xs font-semibold px-3 py-1 rounded"
              style={{ background: 'rgba(201,162,39,0.9)', color: '#0F172A' }}
            >
              Nhiều loại – Gia công theo yêu cầu
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
