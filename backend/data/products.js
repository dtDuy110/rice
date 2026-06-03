const products = [
  {
    name: 'Gạo ST25 Sóc Trăng',
    subtitle: 'Gạo ngon nhất thế giới',
    description: 'Gạo ST25 – giống gạo từng đạt giải "Gạo ngon nhất thế giới" do kỹ sư Hồ Quang Cua lai tạo. Hạt gạo dài, trắng trong, khi nấu cơm dẻo vừa, thơm nhẹ mùi lá dứa tự nhiên.\n\nĐây là niềm tự hào của ngành lúa gạo Việt Nam, được xuất khẩu đến hơn 20 quốc gia trên thế giới.',
    price: 185000,
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80',
      'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&q=80',
    ],
    category: 'Gạo ST', origin: 'Sóc Trăng, Việt Nam', weight: '5 kg', sku: 'TP-ST25-01', unit: 'kg',
    stock: 500, maxStock: 600, status: 'active', badge: 'Gạo ngon nhất TG', badgeType: 'bestseller',
    rating: 4.9, reviews: 342, inStock: true, organic: true,
    features: ['Đạt giải Gạo ngon nhất thế giới 2019', 'Hương thơm lá dứa tự nhiên', 'Hạt dài, trắng trong, cơm dẻo mềm', 'Canh tác theo tiêu chuẩn VietGAP'],
    farmDetails: { origin: 'Sóc Trăng – ĐBSCL', harvest: 'Vụ Đông Xuân', processing: 'Xay xát hiện đại, đánh bóng' }
  },
  {
    name: 'Gạo ST24 Thơm Dẻo',
    subtitle: 'Dòng ST cao cấp',
    description: 'Gạo ST24 là phiên bản tiền nhiệm của ST25, nổi tiếng với vị ngọt thanh và độ dẻo vừa phải. Thích hợp cho bữa cơm gia đình hàng ngày với chi phí hợp lý hơn ST25.',
    price: 145000,
    images: [
      'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&q=80',
    ],
    category: 'Gạo ST', origin: 'Sóc Trăng, Việt Nam', weight: '5 kg', sku: 'TP-ST24-02', unit: 'kg',
    stock: 350, maxStock: 400, status: 'active', rating: 4.6, reviews: 215, inStock: true, organic: false,
    features: ['Vị ngọt thanh tự nhiên', 'Cơm dẻo, thơm nhẹ'],
    farmDetails: { origin: 'Sóc Trăng – ĐBSCL', harvest: 'Vụ Hè Thu', processing: 'Xay xát, phân loại' }
  },
  {
    name: 'Gạo Jasmine Đặc Sản',
    subtitle: 'Dòng Chọn Lọc',
    description: 'Gạo Jasmine Đặc Sản được trồng theo phương pháp hữu cơ truyền thống. Hạt gạo tơi rời và xốp mềm khi nấu, tỏa ra hương thơm nhẹ nhàng gợi nhớ đến hương hoa lài.\n\nVị ngọt thanh nhẹ kết hợp tuyệt vời với các món cà ri, cá nướng, hoặc đơn giản là một đĩa cơm thơm phức.',
    price: 125000,
    images: [
      'https://images.unsplash.com/photo-1536304993881-ff86e0c9e14f?w=600&q=80',
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80',
    ],
    category: 'Gạo Jasmine', origin: 'Việt Nam', weight: '5 kg', sku: 'TP-JAS-03', unit: 'kg',
    stock: 420, maxStock: 500, status: 'active', badge: 'Bán chạy nhất', badgeType: 'bestseller',
    rating: 4.5, reviews: 128, inStock: true, organic: true,
    features: ['Chứng nhận Hữu cơ 100%', 'Không biến đổi gen', 'Nguồn gốc trực tiếp từ nông trại'],
    farmDetails: { origin: 'Đồng bằng Sông Cửu Long', harvest: 'Cuối mùa Thu', processing: 'Xay xát, Phân loại' }
  },
  {
    name: 'Gạo Nàng Hương Chợ Đào',
    subtitle: 'Hương thơm truyền thống',
    description: 'Gạo Nàng Hương Chợ Đào là giống gạo đặc sản nổi tiếng của vùng Long An. Hạt nhỏ, dài, khi nấu có mùi thơm đặc trưng rất quyến rũ. Cơm mềm, dẻo và ngọt tự nhiên.',
    price: 155000,
    images: [
      'https://images.unsplash.com/photo-1574484284002-952d92a03a05?w=600&q=80',
    ],
    category: 'Gạo Thơm', origin: 'Long An, Việt Nam', weight: '5 kg', sku: 'TP-NHG-04', unit: 'kg',
    stock: 200, maxStock: 300, status: 'active', badge: 'Đặc sản', badgeType: 'organic',
    rating: 4.7, reviews: 186, inStock: true, organic: false,
    features: ['Giống lúa truyền thống Long An', 'Hương thơm đặc trưng', 'Cơm mềm dẻo ngọt'],
    farmDetails: { origin: 'Long An – ĐBSCL', harvest: 'Vụ Đông Xuân', processing: 'Xay xát truyền thống' }
  },
  {
    name: 'Gạo Lài Miên (Cambodia)',
    subtitle: 'Hạt dài thơm lừng',
    description: 'Gạo Lài Miên nhập khẩu từ Campuchia, nổi tiếng với hạt gạo dài, trắng đục và mùi thơm hoa lài rất đậm. Khi nấu cơm tơi, mềm, không bị nát.',
    price: 130000,
    images: [
      'https://images.unsplash.com/photo-1536304993881-ff86e0c9e14f?w=600&q=80',
    ],
    category: 'Gạo Lài', origin: 'Campuchia', weight: '5 kg', sku: 'TP-LAI-05', unit: 'kg',
    stock: 180, maxStock: 250, status: 'active', rating: 4.4, reviews: 97, inStock: true, organic: false,
    features: ['Nhập khẩu chính ngạch', 'Hạt dài trắng đục', 'Thơm hoa lài đậm'],
    farmDetails: { origin: 'Battambang, Campuchia', harvest: 'Vụ mùa chính', processing: 'Xay xát xuất khẩu' }
  },
  {
    name: 'Gạo Móng Chim',
    subtitle: 'Gạo quê hương vị',
    description: 'Gạo Móng Chim là giống gạo địa phương vùng Tây Nam Bộ, hạt nhỏ hình móng chim đặc trưng. Cơm có vị ngọt bùi, dẻo vừa phải, rất thích hợp nấu cơm tấm và cháo.',
    price: 95000,
    images: [
      'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&q=80',
    ],
    category: 'Gạo Móng Chim', origin: 'An Giang, Việt Nam', weight: '5 kg', sku: 'TP-MC-06', unit: 'kg',
    stock: 300, maxStock: 400, status: 'active', rating: 4.3, reviews: 156, inStock: true, organic: false,
    features: ['Hạt nhỏ hình móng chim', 'Vị ngọt bùi đặc trưng', 'Thích hợp nấu cơm tấm'],
    farmDetails: { origin: 'An Giang – ĐBSCL', harvest: 'Quanh năm', processing: 'Xay xát thủ công' }
  },
  {
    name: 'Gạo Nếp Đặc Sản',
    subtitle: 'Dẻo thơm truyền thống',
    description: 'Gạo Nếp Đặc Sản có độ dẻo hoàn hảo, lý tưởng cho các món xôi, bánh chưng, bánh tét truyền thống. Hạt nếp tròn, trắng đục, khi đồ xôi có mùi thơm ngào ngạt.',
    price: 110000,
    images: [
      'https://images.unsplash.com/photo-1564894809611-1742fc40ed80?w=600&q=80',
    ],
    category: 'Gạo Nếp', origin: 'Việt Nam', weight: '5 kg', sku: 'TP-NEP-07', unit: 'kg',
    stock: 250, maxStock: 300, status: 'active', badge: 'Truyền thống', badgeType: 'whole-grain',
    rating: 4.7, reviews: 203, inStock: true, organic: false,
    features: ['Độ dẻo cao', 'Thích hợp làm xôi, bánh', 'Hạt tròn trắng đục'],
    farmDetails: { origin: 'Bắc Ninh, Việt Nam', harvest: 'Vụ mùa', processing: 'Xay xát truyền thống' }
  },
  {
    name: 'Gạo Nếp Cái Hoa Vàng',
    subtitle: 'Nếp thượng hạng miền Bắc',
    description: 'Nếp Cái Hoa Vàng là giống nếp quý hiếm của miền Bắc Việt Nam. Hạt tròn mẩy, khi đồ xôi dẻo thơm lừng, có vị ngọt béo đặc trưng không giống loại nào khác.',
    price: 195000,
    images: [
      'https://images.unsplash.com/photo-1564894809611-1742fc40ed80?w=600&q=80',
    ],
    category: 'Gạo Nếp', origin: 'Hải Dương, Việt Nam', weight: '2 kg', sku: 'TP-NCHV-08', unit: 'kg',
    stock: 80, maxStock: 100, status: 'active', badge: 'Quý hiếm', badgeType: 'fair-trade',
    rating: 4.9, reviews: 89, inStock: true, organic: true,
    features: ['Giống nếp quý hiếm', 'Dẻo thơm đặc biệt', 'Vị ngọt béo tự nhiên'],
    farmDetails: { origin: 'Hải Dương, miền Bắc', harvest: 'Vụ mùa (tháng 10)', processing: 'Xay xát thủ công' }
  },
  {
    name: 'Gạo Lứt Đỏ Hữu Cơ',
    subtitle: 'Dinh dưỡng tối ưu',
    description: 'Gạo Lứt Đỏ giàu chất xơ, vitamin B và khoáng chất. Lớp cám đỏ tự nhiên chứa nhiều chất chống oxy hóa. Rất tốt cho người ăn kiêng và người tiểu đường.',
    price: 160000,
    images: [
      'https://images.unsplash.com/photo-1602253942-6c594db0aa91?w=600&q=80',
    ],
    category: 'Gạo Lứt', origin: 'Đắk Lắk, Việt Nam', weight: '2 kg', sku: 'TP-LDO-09', unit: 'kg',
    stock: 150, maxStock: 200, status: 'active', badge: 'Hữu cơ', badgeType: 'organic',
    rating: 4.5, reviews: 112, inStock: true, organic: true,
    features: ['Giàu chất xơ và vitamin B', 'Tốt cho người tiểu đường', 'Chứng nhận hữu cơ'],
    farmDetails: { origin: 'Đắk Lắk – Tây Nguyên', harvest: 'Vụ Đông Xuân', processing: 'Xay xát nhẹ giữ cám' }
  },
  {
    name: 'Gạo Lứt Đen (Gạo Cẩm)',
    subtitle: 'Siêu thực phẩm',
    description: 'Gạo Cẩm (gạo lứt đen) được mệnh danh là "ngọc trai đen" nhờ hàm lượng anthocyanin cao. Có vị ngọt nhẹ, thường dùng nấu cháo, chè hoặc xôi cẩm.',
    price: 199000,
    images: [
      'https://images.unsplash.com/photo-1602253942-6c594db0aa91?w=600&q=80',
    ],
    category: 'Gạo Lứt', origin: 'Điện Biên, Việt Nam', weight: '1 kg', sku: 'TP-CAM-10', unit: 'kg',
    stock: 60, maxStock: 80, status: 'active', badge: 'Siêu thực phẩm', badgeType: 'bestseller',
    rating: 4.8, reviews: 67, inStock: true, organic: true,
    features: ['Giàu anthocyanin chống oxy hóa', 'Vị ngọt nhẹ tự nhiên', 'Thích hợp nấu cháo, chè'],
    farmDetails: { origin: 'Điện Biên, miền Bắc', harvest: 'Vụ mùa (tháng 9-10)', processing: 'Xay xát thủ công' }
  },
  {
    name: 'Gạo Thơm Thái Hom Mali',
    subtitle: 'Nhập khẩu Thái Lan',
    description: 'Gạo Hom Mali (Thai Jasmine) nổi tiếng thế giới với hương thơm hoa nhài đặc trưng. Hạt dài, trắng trong, cơm tơi mềm. Đây là loại gạo được ưa chuộng nhất tại các nhà hàng.',
    price: 140000,
    images: [
      'https://images.unsplash.com/photo-1574484284002-952d92a03a05?w=600&q=80',
    ],
    category: 'Gạo Thơm', origin: 'Thái Lan', weight: '5 kg', sku: 'TP-HML-11', unit: 'kg',
    stock: 220, maxStock: 300, status: 'active', rating: 4.4, reviews: 178, inStock: true, organic: false,
    features: ['Nhập khẩu chính hãng', 'Hương hoa nhài đặc trưng', 'Hạt dài trắng trong'],
    farmDetails: { origin: 'Isan, Thái Lan', harvest: 'Vụ chính (tháng 11)', processing: 'Xay xát công nghiệp' }
  },
  {
    name: 'Gạo Tài Nguyên',
    subtitle: 'Gạo truyền thống miền Nam',
    description: 'Gạo Tài Nguyên là giống gạo lâu đời của miền Nam, hạt nhỏ dài, cơm mềm dẻo với vị ngọt đặc trưng. Rất phổ biến trong các bữa cơm gia đình Việt.',
    price: 88000,
    images: [
      'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&q=80',
    ],
    category: 'Gạo Thơm', origin: 'Đồng Tháp, Việt Nam', weight: '5 kg', sku: 'TP-TN-12', unit: 'kg',
    stock: 400, maxStock: 500, status: 'active', rating: 4.2, reviews: 234, inStock: true, organic: false,
    features: ['Giống gạo truyền thống', 'Giá bình dân', 'Cơm mềm dẻo ngọt'],
    farmDetails: { origin: 'Đồng Tháp – ĐBSCL', harvest: 'Quanh năm', processing: 'Xay xát hiện đại' }
  },
  {
    name: 'Gạo Sơn La (Séng Cù)',
    subtitle: 'Đặc sản Tây Bắc',
    description: 'Gạo Séng Cù Sơn La được trồng trên ruộng bậc thang vùng cao Tây Bắc. Hạt tròn mẩy, cơm dẻo thơm lừng, vị ngọt đậm đà nhờ khí hậu mát lạnh và nguồn nước suối trong.',
    price: 175000,
    images: [
      'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&q=80',
    ],
    category: 'Gạo Thơm', origin: 'Sơn La, Việt Nam', weight: '2 kg', sku: 'TP-SC-13', unit: 'kg',
    stock: 90, maxStock: 120, status: 'active', badge: 'Đặc sản vùng cao', badgeType: 'organic',
    rating: 4.6, reviews: 78, inStock: true, organic: true,
    features: ['Trồng trên ruộng bậc thang', 'Khí hậu mát lạnh Tây Bắc', 'Nước suối tự nhiên tưới tiêu'],
    farmDetails: { origin: 'Sơn La – Tây Bắc', harvest: 'Vụ mùa (tháng 10)', processing: 'Xay xát thủ công' }
  },
  {
    name: 'Gạo Hạt Ngọc Trời',
    subtitle: 'Thương hiệu quốc dân',
    description: 'Gạo Hạt Ngọc Trời là thương hiệu gạo nổi tiếng hàng đầu Việt Nam. Hạt gạo dài trắng, cơm thơm dẻo, phù hợp cho mọi bữa ăn gia đình.',
    price: 105000,
    images: [
      'https://images.unsplash.com/photo-1536304993881-ff86e0c9e14f?w=600&q=80',
    ],
    category: 'Gạo Jasmine', origin: 'An Giang, Việt Nam', weight: '5 kg', sku: 'TP-HNT-14', unit: 'kg',
    stock: 600, maxStock: 800, status: 'active', rating: 4.3, reviews: 456, inStock: true, organic: false,
    features: ['Thương hiệu uy tín', 'Hạt dài trắng đều', 'Phù hợp mọi bữa ăn'],
    farmDetails: { origin: 'An Giang – ĐBSCL', harvest: 'Quanh năm', processing: 'Xay xát công nghiệp' }
  },
  {
    name: 'Gạo Tấm Thơm',
    subtitle: 'Dành cho cơm tấm',
    description: 'Gạo Tấm Thơm được chọn lọc từ hạt gạo tấm thơm, phù hợp chuyên biệt để nấu cơm tấm Sài Gòn. Hạt nhỏ đều, cơm tơi xốp, thấm gia vị tốt.',
    price: 75000,
    images: [
      'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&q=80',
    ],
    category: 'Gạo Tấm', origin: 'TP.HCM, Việt Nam', weight: '5 kg', sku: 'TP-TAM-15', unit: 'kg',
    stock: 350, maxStock: 500, status: 'active', rating: 4.1, reviews: 189, inStock: true, organic: false,
    features: ['Chuyên nấu cơm tấm', 'Hạt nhỏ đều', 'Cơm tơi xốp thấm gia vị'],
    farmDetails: { origin: 'ĐBSCL', harvest: 'Quanh năm', processing: 'Xay xát, sàng lọc tấm' }
  },
  {
    name: 'Gạo Basmati Ấn Độ',
    subtitle: 'Hạt dài thượng hạng',
    description: 'Gạo Basmati nhập khẩu từ Ấn Độ, ủ 24 tháng để phát triển hương vị bùi và kết cấu tơi xốp. Hạt gạo dài nhất trong các loại gạo, khi nấu nở dài gấp đôi.',
    price: 220000,
    images: [
      'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=600&q=80',
    ],
    category: 'Gạo Basmati', origin: 'Ấn Độ', weight: '2 kg', sku: 'TP-BAS-16', unit: 'kg',
    stock: 70, maxStock: 100, status: 'active', badge: 'Nhập khẩu', badgeType: 'fair-trade',
    rating: 4.8, reviews: 145, inStock: true, organic: false,
    features: ['Ủ 24 tháng phát triển hương vị', 'Hạt dài nhất các loại gạo', 'Nở dài gấp đôi khi nấu'],
    farmDetails: { origin: 'Punjab, Ấn Độ', harvest: 'Vụ Kharif', processing: 'Ủ lão hóa, xay xát' }
  },
  {
    name: 'Gạo Lứt Huyết Rồng',
    subtitle: 'Dinh dưỡng cao',
    description: 'Gạo Lứt Huyết Rồng có màu đỏ đậm tự nhiên, giàu sắt và chất chống oxy hóa. Vị bùi ngọt, thường dùng nấu cơm gạo lứt hoặc trộn với gạo trắng.',
    price: 148000,
    images: [
      'https://images.unsplash.com/photo-1602253942-6c594db0aa91?w=600&q=80',
    ],
    category: 'Gạo Lứt', origin: 'Quảng Nam, Việt Nam', weight: '2 kg', sku: 'TP-HR-17', unit: 'kg',
    stock: 120, maxStock: 150, status: 'active', rating: 4.4, reviews: 92, inStock: true, organic: true,
    features: ['Giàu sắt và chất chống oxy hóa', 'Màu đỏ đậm tự nhiên', 'Vị bùi ngọt'],
    farmDetails: { origin: 'Quảng Nam, miền Trung', harvest: 'Vụ Đông Xuân', processing: 'Xay xát nhẹ giữ cám' }
  },
  {
    name: 'Gạo Nhật Bản (Japonica)',
    subtitle: 'Hạt tròn cao cấp',
    description: 'Gạo Japonica trồng tại Việt Nam theo giống Nhật Bản. Hạt tròn ngắn, cơm rất dẻo và dính, phù hợp để làm sushi, onigiri hoặc ăn với các món Nhật.',
    price: 235000,
    images: [
      'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&q=80',
    ],
    category: 'Gạo Nhật', origin: 'Lâm Đồng, Việt Nam', weight: '2 kg', sku: 'TP-JPN-18', unit: 'kg',
    stock: 45, maxStock: 80, status: 'active', badge: 'Premium', badgeType: 'bestseller',
    rating: 4.7, reviews: 58, inStock: true, organic: false,
    features: ['Giống Nhật Bản trồng tại VN', 'Hạt tròn dẻo dính', 'Phù hợp làm sushi'],
    farmDetails: { origin: 'Lâm Đồng – Tây Nguyên', harvest: 'Quanh năm', processing: 'Xay xát theo chuẩn Nhật' }
  }
];

module.exports = products;
