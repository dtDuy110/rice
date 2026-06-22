import { useNavigate } from 'react-router-dom'
import useScrollAnimation from '../../hooks/useScrollAnimation'

const categories = [
  { name: 'Gạo ST', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR8ltvJX0eAbib1o-5ijdoaWjSmRCEEnAqEq_O3brTQ4fMiX6thBMaL9hHnZdVakTYQqy0kAwzwuppimJtFCW6AhSvvRPP1kwQ-mcbBW2vi8ImiriyEvQdbwQ', description: 'Gạo ngon nhất thế giới' },
  { name: 'Gạo Jasmine', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSoklI9gB3eUFtyYknDXtPOIDgh9g15OXYRKzd8vuJoFOEZWAEdzhzW2zk1SYua5KsvvAJs6RE-YTCC6fav4bv7dc9xwqPloA', description: 'Hương hoa nhài đặc trưng' },
  { name: 'Gạo Lứt', image: 'https://img.onelife.vn/5FbU07GUQPnjV_wDmIh3UmfCVqIj9FLIi-I_PAHGvGg/rs:fit:600:600:1/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL3NjX3BjbV9wcm9kdWN0L3Byb2QvMjAyNC8zLzI4LzEyNTc0Ni04OTM4NTA5MDQzNDA3LmpwZw.webp', description: 'Dinh dưỡng tối ưu' },
  { name: 'Gạo Nếp', image: 'https://img.onelife.vn/QXf5LODF1Dm1WG_RAHzow3TIuNxNAwIAbeqeivpydjY/rs:fit:600:600:1/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL3NjX3BjbV9wcm9kdWN0L3Byb2QvMjAyMy80LzI4LzI0MzEtOTU1NjYuanBn.webp', description: 'Dẻo thơm truyền thống' },
  { name: 'Gạo Thơm', image: 'https://product.hstatic.net/200000838261/product/neptune-nhan-vang-a_82992f98f26b4967827cf46227c5d303_ce728ec9c5c3449a813b315d7e76c0a4_grande.png', description: 'Thơm ngào ngạt' },
  { name: 'Gạo Nhật', image: 'https://img.onelife.vn/tbfctHVDtWzDO7BGDuj5afzUzR_yMcu6MbgG_F_ztuY/rs:fit:600:600:1/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL29uZWxpZmUtcHVibGljLzg5Mzg1MTY4NzA3MDYtQjEyLmpwZw.webp', description: 'Hạt tròn cao cấp' },
]

export default function CategoryShowcase() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  const navigate = useNavigate()

  return (
    <section className="py-16 md:py-20 px-4 md:px-12 max-w-[1280px] mx-auto">
      <div
        ref={ref}
        className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-headline-lg text-on-surface mb-3"
            style={{ fontFamily: 'var(--font-family-heading)' }}
          >
            Danh mục sản phẩm
          </h2>
          <p className="text-body-md text-on-surface-variant max-w-lg mx-auto">
            Khám phá đa dạng các loại gạo đặc sản từ khắp mọi miền
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((cat, index) => (
            <button
              key={cat.name}
              onClick={() => navigate(`/san-pham?category=${encodeURIComponent(cat.name)}`)}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer border border-surface-variant hover:border-primary/30 transition-all duration-500"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                <h3 className="text-white font-bold text-sm md:text-base mb-0.5" style={{ fontFamily: 'var(--font-family-heading)' }}>
                  {cat.name}
                </h3>
                <p className="text-white/70 text-xs md:text-sm">
                  {cat.description}
                </p>
              </div>
              {/* Hover ring */}
              <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ring-primary/50 transition-all duration-300" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
