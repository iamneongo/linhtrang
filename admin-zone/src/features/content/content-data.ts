export type ContentStatus = 'Đã xuất bản' | 'Bản nháp' | 'Chờ duyệt';

export type ContentItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: ContentStatus;
  updatedAt: string;
  author: string;
  excerpt: string;
  body: string;
  cover: string;
};

export type ContentWorkspaceConfig = {
  key: string;
  title: string;
  description: string;
  itemLabel: string;
  categories: string[];
  items: ContentItem[];
  actionLabel: string;
  helperNote: string;
};

const sharedBody = (intro: string, bullets: string[]) => `
  <p>${intro}</p>
  <ul>
    ${bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
  </ul>
  <p>
    Mỗi bài viết được tối ưu để dễ chỉnh sửa lại cho landing page, SEO và cấu trúc danh
    mục hiển thị trên website.
  </p>
`;

export const contentWorkspaces: Record<string, ContentWorkspaceConfig> = {
  products: {
    key: 'products',
    title: 'Sản phẩm',
    description:
      'Quản lý từng sản phẩm: mô tả, hình ảnh đại diện, nhóm hiển thị, trạng thái và nội dung chi tiết.',
    itemLabel: 'Sản phẩm',
    categories: ['Gạch ốp lát', 'Thiết bị vệ sinh', 'Nội thất', 'Trang trí', 'Vật liệu hoàn thiện'],
    actionLabel: 'Tạo sản phẩm mới',
    helperNote: 'Dùng editor để soạn mô tả chi tiết, thông số kỹ thuật và câu chuyện sản phẩm.',
    items: [
      {
        id: 'sp-01',
        title: 'Gạch vân đá Calacatta 60x120',
        slug: 'gach-van-da-calacatta-60x120',
        category: 'Gạch ốp lát',
        status: 'Đã xuất bản',
        updatedAt: 'Hôm nay',
        author: 'Linh Trang',
        excerpt: 'Bề mặt mờ cao cấp, phù hợp không gian sang trọng và hiện đại.',
        body: sharedBody('Dòng gạch cao cấp với vân đá trắng tự nhiên.', [
          'Kích thước 60x120 linh hoạt cho sảnh, phòng khách và mặt tiền',
          'Bề mặt chống trầy và hạn chế bám bẩn',
          'Phối màu dễ hòa vào các concept nội thất cao cấp'
        ]),
        cover:
          'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'sp-02',
        title: 'Bộ sen tắm âm tường PVD',
        slug: 'bo-sen-tam-am-tuong-pvd',
        category: 'Thiết bị vệ sinh',
        status: 'Chờ duyệt',
        updatedAt: 'Hôm qua',
        author: 'Editor',
        excerpt: 'Hoàn thiện không gian tắm với điểm nhấn kim loại sang trọng.',
        body: sharedBody('Sen tắm âm tường với lớp phủ PVD bền màu.', [
          'Tối ưu đường nét tối giản',
          'Chống bám vân tay tốt',
          'Dễ phối với lavabo và phụ kiện đồng bộ'
        ]),
        cover:
          'https://images.unsplash.com/photo-1626178793926-22b28830aa30?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'sp-03',
        title: 'Tủ lavabo treo tường Minimal Oak',
        slug: 'tu-lavabo-treo-tuong-minimal-oak',
        category: 'Nội thất',
        status: 'Bản nháp',
        updatedAt: '2 ngày trước',
        author: 'Editor',
        excerpt: 'Thiết kế treo tường giúp phòng tắm gọn gàng và thoáng hơn.',
        body: sharedBody('Tủ lavabo cân bằng giữa thẩm mỹ và công năng.', [
          'Kết cấu treo tường giảm diện tích chiếm chỗ',
          'Vật liệu chống ẩm cho môi trường sử dụng ẩm',
          'Ngăn kéo ẩn giúp tối ưu lưu trữ'
        ]),
        cover:
          'https://images.unsplash.com/photo-1564540574859-0dfb63985953?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  'product-categories': {
    key: 'product-categories',
    title: 'Danh mục sản phẩm',
    description:
      'Quản lý cấu trúc danh mục hiển thị trên landing page, menu điều hướng và block sản phẩm nổi bật.',
    itemLabel: 'Danh mục',
    categories: ['Gạch ốp lát', 'Thiết bị vệ sinh', 'Nội thất', 'Trang trí', 'Vật liệu hoàn thiện'],
    actionLabel: 'Thêm danh mục',
    helperNote: 'Giữ tên ngắn, rõ ràng, để menu và bộ lọc trên landing page luôn dễ đọc.',
    items: [
      {
        id: 'dm-sp-01',
        title: 'Gạch ốp lát',
        slug: 'gach-op-lat',
        category: 'Nhóm sản phẩm',
        status: 'Đã xuất bản',
        updatedAt: 'Hôm nay',
        author: 'Linh Trang',
        excerpt: 'Danh mục chính cho nhóm gạch nội - ngoại thất.',
        body: sharedBody('Danh mục ưu tiên hiển thị đầu menu.', [
          'Tập trung vào dòng gạch nhập khẩu cao cấp',
          'Dễ gắn tag màu, kích thước và bề mặt',
          'Dùng làm group filter cho landing page'
        ]),
        cover:
          'https://images.unsplash.com/photo-1521783593447-5702c1b3b7b5?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'dm-sp-02',
        title: 'Thiết bị vệ sinh',
        slug: 'thiet-bi-ve-sinh',
        category: 'Nhóm sản phẩm',
        status: 'Đã xuất bản',
        updatedAt: '2 ngày trước',
        author: 'Editor',
        excerpt: 'Nhóm lavabo, sen vòi, bồn cầu, phụ kiện phòng tắm.',
        body: sharedBody('Cấu trúc danh mục cho thiết bị vệ sinh.', [
          'Phân tách theo công năng để dễ điều hướng',
          'Có thể gắn landing riêng cho từng collection',
          'Dễ liên kết sang dự án và bài viết'
        ]),
        cover:
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  projects: {
    key: 'projects',
    title: 'Dự án',
    description:
      'Quản lý các dự án đã hoàn thiện, tiến độ, mô tả công trình và hình ảnh before/after.',
    itemLabel: 'Dự án',
    categories: ['Nhà ở', 'Căn hộ', 'Biệt thự', 'Khách sạn', 'Showroom'],
    actionLabel: 'Tạo dự án',
    helperNote: 'Mỗi dự án nên có mô tả ngắn, điểm nhấn và ảnh nổi bật để làm portfolio.',
    items: [
      {
        id: 'da-01',
        title: 'Biệt thự River Bay',
        slug: 'biet-thu-river-bay',
        category: 'Biệt thự',
        status: 'Đã xuất bản',
        updatedAt: 'Hôm nay',
        author: 'Linh Trang',
        excerpt: 'Tổ hợp vật liệu tông ấm, tạo cảm giác sang trọng và bền vững.',
        body: sharedBody('Dự án biệt thự ven sông với ngôn ngữ tối giản.', [
          'Tập trung ánh sáng tự nhiên và vật liệu mộc',
          'Tối ưu phòng tắm và phòng khách theo concept đồng nhất',
          'Ảnh công trình có thể dùng làm case study landing page'
        ]),
        cover:
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'da-02',
        title: 'Showroom Linh Trang Experience',
        slug: 'showroom-linh-trang-experience',
        category: 'Showroom',
        status: 'Chờ duyệt',
        updatedAt: '3 ngày trước',
        author: 'Editor',
        excerpt: 'Không gian trưng bày sản phẩm theo dòng vật liệu và cảm hứng không gian.',
        body: sharedBody('Showroom được thiết kế theo các zone trải nghiệm.', [
          'Phân zone theo nhóm sản phẩm',
          'Tạo điểm dừng thị giác cho khách hàng',
          'Kết hợp nội dung bài viết giới thiệu'
        ]),
        cover:
          'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  'project-categories': {
    key: 'project-categories',
    title: 'Danh mục dự án',
    description:
      'Quản lý các nhóm dự án theo loại công trình để hiển thị bộ lọc và portfolio trên website.',
    itemLabel: 'Danh mục',
    categories: ['Nhà ở', 'Căn hộ', 'Biệt thự', 'Khách sạn', 'Showroom'],
    actionLabel: 'Thêm danh mục dự án',
    helperNote: 'Nhóm dự án nên phản ánh đúng phân loại khách hàng thường quan tâm nhất.',
    items: [
      {
        id: 'dm-da-01',
        title: 'Nhà ở',
        slug: 'nha-o',
        category: 'Dự án',
        status: 'Đã xuất bản',
        updatedAt: 'Hôm nay',
        author: 'Editor',
        excerpt: 'Các công trình nhà phố, nhà riêng và cải tạo không gian sống.',
        body: sharedBody('Nhóm dự án cho khách hàng cá nhân.', [
          'Phù hợp landing page giới thiệu giải pháp tổng thể',
          'Dễ gắn CTA báo giá',
          'Có thể liên kết tới bài viết tư vấn'
        ]),
        cover:
          'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'dm-da-02',
        title: 'Showroom',
        slug: 'showroom',
        category: 'Dự án',
        status: 'Đã xuất bản',
        updatedAt: '2 ngày trước',
        author: 'Editor',
        excerpt: 'Nhóm dự án trưng bày, bán lẻ và trải nghiệm thương hiệu.',
        body: sharedBody('Danh mục dành cho công trình trưng bày.', [
          'Kể chuyện thương hiệu bằng không gian',
          'Phối hợp nội dung bài viết và gallery',
          'Tăng sức mạnh phần portfolio'
        ]),
        cover:
          'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  posts: {
    key: 'posts',
    title: 'Tin tức - bài viết',
    description:
      'Soạn nội dung tư vấn, cập nhật xu hướng, case study và bài viết hỗ trợ SEO cho landing page.',
    itemLabel: 'Bài viết',
    categories: ['Tin tức', 'Tư vấn', 'Xu hướng', 'Case study', 'SEO'],
    actionLabel: 'Viết bài mới',
    helperNote: 'Mỗi bài viết nên có title rõ ràng, slug thân thiện và phần nội dung đủ dài để SEO.',
    items: [
      {
        id: 'bv-01',
        title: '5 lưu ý khi chọn gạch cho phòng khách',
        slug: '5-luu-y-khi-chon-gach-cho-phong-khach',
        category: 'Tư vấn',
        status: 'Đã xuất bản',
        updatedAt: 'Hôm nay',
        author: 'Editor',
        excerpt: 'Hướng dẫn chọn kích thước, màu sắc và bề mặt phù hợp.',
        body: sharedBody('Bài viết tư vấn cho chủ nhà và kiến trúc sư.', [
          'Chia sẻ nguyên tắc chọn gạch theo diện tích',
          'Mở đầu bằng vấn đề khách hàng thường gặp',
          'Đưa CTA dẫn về trang sản phẩm liên quan'
        ]),
        cover:
          'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'bv-02',
        title: 'Xu hướng nội thất tối giản 2026',
        slug: 'xu-huong-noi-that-toi-gian-2026',
        category: 'Xu hướng',
        status: 'Bản nháp',
        updatedAt: '2 ngày trước',
        author: 'Linh Trang',
        excerpt: 'Ghi chú các tone màu, vật liệu và cách phối để cập nhật trang blog.',
        body: sharedBody('Bài viết theo phong cách editorial.', [
          'Nêu xu hướng vật liệu, màu trung tính và đường nét mềm',
          'Lồng ghép ảnh moodboard',
          'Dùng làm bài trụ cột cho SEO'
        ]),
        cover:
          'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'bv-03',
        title: 'Case study: Biệt thự River Bay',
        slug: 'case-study-biet-thu-river-bay',
        category: 'Case study',
        status: 'Chờ duyệt',
        updatedAt: '3 ngày trước',
        author: 'Editor',
        excerpt: 'Mổ tả chi tiết giải pháp vật liệu và cách phối không gian.',
        body: sharedBody('Bài viết case study cho portfolio.', [
          'Giới thiệu bối cảnh công trình',
          'Nêu giải pháp và lựa chọn vật liệu',
          'Kết thúc bằng kết quả đạt được'
        ]),
        cover:
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  }
};
