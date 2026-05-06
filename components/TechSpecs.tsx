const specs = [
  { label: 'Vật liệu', value: 'Silicone' },
  { label: 'Màu sắc phổ biến', value: 'Trắng, đỏ, đen, trong, xám hoặc theo yêu cầu' },
  { label: 'Hình dạng', value: 'Tròn, vuông, chữ U, chữ D, dạng ống, dạng tấm hoặc theo bản vẽ' },
  { label: 'Độ cứng', value: 'Tùy theo yêu cầu sử dụng' },
  { label: 'Kích thước', value: 'Sản xuất hoặc cắt theo yêu cầu' },
  { label: 'Khả năng chịu nhiệt', value: 'Tùy theo từng loại silicone và điều kiện sử dụng' },
  { label: 'Ứng dụng', value: 'Làm kín, chống bụi, chống nước, cách điện, giảm rung' },
]

export default function TechSpecs() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Thông Số Kỹ Thuật Tham Khảo
        </h2>
        <div className="w-16 h-1 bg-blue-700 mx-auto mb-4 rounded-full" />
        <p className="text-gray-500 text-center mb-8 text-sm">
          Các thông số dưới đây chỉ mang tính tham khảo. Thông số cụ thể có thể thay đổi tùy theo loại vật liệu,
          yêu cầu sử dụng và tiêu chuẩn của từng đơn hàng.
        </p>
        <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <tbody>
              {specs.map((s, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-3.5 px-6 font-medium text-gray-700 w-40 border-b border-gray-100">
                    {s.label}
                  </td>
                  <td className="py-3.5 px-6 text-gray-600 border-b border-gray-100">
                    {s.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-400 text-xs mt-4 text-center">
          * Đối với yêu cầu kỹ thuật đặc biệt (chịu nhiệt cao, tiếp xúc thực phẩm, hóa chất...),
          khách hàng vui lòng cung cấp thêm thông tin để được tư vấn chính xác hơn.
        </p>
      </div>
    </section>
  )
}
