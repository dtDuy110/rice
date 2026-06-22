import useScrollAnimation from '../../hooks/useScrollAnimation'

const partners = [
  { name: 'VietGAP', image: 'https://cdn.vietnambiz.vn/2020/3/2/vg-15831176957661073999454.jpg', desc: 'Chứng nhận VietGAP' },
  { name: 'GlobalGAP', image: 'https://tqc.vn/pic/Service/images/chung-nhan-globalgap-la-gi.png', desc: 'Chứng nhận GlobalGAP' },
  { name: 'Organic', image: 'https://organicandhealthfoods.com/FileStorage/Article/Image/03.jpg', desc: 'Chứng nhận Hữu cơ' },
  { name: 'ISO 22000', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9p4gIBIwj9BuM_z-13eagazUFp5_G5jqIETEbQt5z5gItg2K9eH0VSIo&s=10', desc: 'ISO 22000:2018' },
  { name: 'HACCP', image: 'https://kiemdinhkv2.com/wp-content/uploads/2024/03/chung-nhan-haccp.jpeg', desc: 'Chuẩn HACCP' },
  { name: 'OCOP', image: 'https://printgo.vn/uploads/media/835891/san-pham-ocop-5-sao(2)_1712833013.jpg', desc: 'OCOP 5 Sao' },
]

export default function BrandPartners() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section className="py-12 bg-surface-container-low border-y border-outline-variant/30 overflow-hidden">
      <div ref={ref} className={`max-w-[1280px] mx-auto transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-center text-label-sm text-outline uppercase tracking-widest font-bold mb-8">
          Chứng nhận & Đối tác
        </p>

        {/* Simple static layout for partners/certifications */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 px-4">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group flex flex-col items-center gap-2 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer"
            >
              <div className="w-18 h-18 md:w-24 md:h-24 bg-surface rounded-full flex items-center justify-center border border-outline-variant shadow-sm group-hover:border-primary group-hover:text-primary transition-colors">
                <img src={partner.image} alt={partner.name} className="w-16 h-16 md:w-20 md:h-20" />
              </div>
              <span className="text-xs text-on-surface-variant font-medium text-center hidden md:block">
                {partner.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
