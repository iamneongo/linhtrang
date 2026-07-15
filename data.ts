import { Category, Project, Product, BlogPost } from './types';

export const LOGO_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMEyCSTbiS4UUhsSapj8OM2h86O3s2gAqLeq3yAyVgUIRKQQlc5LY2WAQHOnBLPCle7s3GXO0Pj7Hz3qca2zQggypkmwShmDH2ZLN-qTT79uEGjq1qOG_s6ALooJlMZ9lGzj2eYFiE4vd0l-cvx4ZirMZZ3-RWTYBPWOeVuVvgk3PDRxBTmpvXJtsPWlH2Uwq6tIOv0iCp6rmY4_h3w-uw9GueVwy8K1O2TLUkXRlc-8aAG7x1xum8CnoTgpO93zLuLEPa0JN8oF4';
export const HERO_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdNFl8lnB8rfBDh5mMiM_2vM5eVXQepWterSkjV4t07uorUY9sgRGebz7smnRjDWLXLOuOTpMOa4GjieIfHkiQfpNpwGAyGv_9FcQ5OXdGMJ3BPARku2Jvh9-lWx5e1wFLU-QqP0VCeoZBqPTedxbFIqqXqF7QgjhFDxMMTHr-9GXOOUiN1zgxB9tFKVz8e0vThX-E4Tj96CDYch1KYP-zz-W_Ffb8mK-Pd0yHzS3oNj_B8Elpr0DQCdBg3UFbEGwUXtT1Je8NcRQ';
export const ABOUT_SHOWROOM_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCmRdli4icQRO6S2ky3DQKpeiM1xxMSAeLH_cHdg_yBOh_O71fAOzGER5YjNw4RVfzdzzLvjBczWjjwOFy8KgckKYd46AyA0uH5h_xCJxBtlVhTLyHy9lQpw9s3KwwJV9GDS6DRxKsppqyR8t9GjngmcoqeVvuXOg4CoTQQwmAjXj6pCOsD-onRhwToaRLCBM7cAfXjOV-WnrlQ1DLGcEwjTQvZIn-hzApEXvi2b0mlZZoMVfS5JYjwOp1rv6tDRESCAWna8ulm3g';

export const categories: Category[] = [
  {
    id: 'gach-op-lat',
    name: 'GẠCH ỐP LÁT',
    iconName: 'Grid3X3',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJqV4CMksqAVLES9Zo2dfhfIi5WEAAwJO3mKiU1SxOcP17U1Z-DApKkZFE3UCS_4p0iwXKfmvn8pEnaFwZ0hhBcpox7hbEczVktEU0u02OhJHZECleFoYptt5_1qyC-_WQKVAOQ3kA-00tJzwIrFggV8Tn6QQizwlwVk4tw7jO4nXkf9I5ddfS8wa01f8VtsP5QWjM-cQPLDRRW7GW9GpVCjTbWUt_IbD8Sz3GjmAk0AcEMj13jtwkTsmWzYnKmcwE-7KhjqzCclQ',
    description: 'Bao gồm các dòng gạch Porcelain, Granite nhập khẩu từ Tây Ban Nha, Ý, Ấn Độ với vân đá Marble tự nhiên sắc nét.',
    badge: 'Đa dạng mẫu mã'
  },
  {
    id: 'thiet-bi-ve-sinh',
    name: 'THIẾT BỊ VỆ SINH',
    iconName: 'Bath',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDCCykvNAYhRfR9oWJGab7WB4yqcVnCASCPvcwuuK24wTnF7O65TiU2VWwOx8nn9fGsUmKDW5L4zMK_O9uUkMFRiw6HqBvvSqo1LOTEPkWUJgcRmbIZrpobBkSqe4SGLWqadu3qRjBpGQkKzuJbJsKsB-vgB8cyCkvcNdqgXQbfB5AuS0o9ByC2BuMaUXssDl_brRIhX3335E3fvWubggDkesbDw2keV5XxJS7vnJpDde-PyypvnEkV7Baxtz4pZWjz4F9O_HmXZE',
    description: 'Bồn cầu thông minh, sen vòi mạ PVD cao cấp, bồn tắm nằm đá tự nhiên từ các thương hiệu hàng đầu thế giới.',
    badge: 'Chất lượng cao cấp'
  },
  {
    id: 'noi-that',
    name: 'NỘI THẤT',
    iconName: 'Armchair',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMs_1Fy_SgjGXk_XYViSQvbgOv1F6bt7yqmIlV43Unx2jnAsyVJDgg8EnO6V40sOt0j9NpHEhaa3DVUHYQQPuzVbDz9jWbB1hleVQvo1__IZtq3rnN9IAonJ7dbaqVI67tk_0CQl5DCSwEEtrMHkqXBAKG58OtJvdqkCKlqZx4mo8HmzyZNY6pFf7w9ETDmCGI5lSER2RtAnkpJ6Lly5bDo7tdmL9EWpUGviBldJdAYCFNi1We8-rf192aZXT8qLI5u0Xi6FgG4w4',
    description: 'Sofa da bò Ý cao cấp, bàn ăn mặt đá phiến, tủ bếp nhập khẩu thiết kế tối giản, tinh tế sang trọng.',
    badge: 'Hiện đại - Sang trọng'
  },
  {
    id: 'trang-tri-noi-that',
    name: 'TRANG TRÍ NỘI THẤT',
    iconName: 'Flower',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaAMveGFtOju8FTN8_P1GqP5mCw2Wxa9GunivIOCebXayjL5XqeeI1H3lYu-yu_lOktTaxT9uaZxYlOLiWJDINSgAzzo5D-hK8orSohjwrS-5Pc7_fJuK4clf0SR8DtBodbPAQf1SbMon6cqIbfYovJYEDnGzcsFEEKd6oLYYQsdLUfiG_xP3kBlb95sgIRi8o06_c6sZRcPFr3RiV_FlChjvbr1WjTmR_tiBopqCmCmysY7trkx1XjaSb_JBIy6T9HaDarRpHAnE',
    description: 'Lọ hoa gốm điêu khắc, tranh sơn dầu nghệ thuật và gương Bỉ tráng bạc giúp hoàn thiện không gian tinh tế.',
    badge: 'Tinh tế - Đẳng cấp'
  },
  {
    id: 'den-trang-tri',
    name: 'ĐÈN TRANG TRÍ',
    iconName: 'Lightbulb',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK-uaJxlx9LMWkNAwSTdxph41RZYzbAzymD4yhYVpv7oKw46J3q-omblH6rRcsnHbUmy3YyoWP_78GJ_sk-l8lOlHnU267ObCd_TstTXM9M3t563zKJtZi3y4jleYV2Hf0Nu6rgxY7-dvHS9QvX0nKsy5Vx_nTFcTkQnYllpbMeMd4SIrDNAHun0fxvS53gL5xbRgFSZDsb-soxG0PLlXICNzAfTQcoAu9g5Id80WxOZccVu2vY82c8rPIdeFsbj1eFtCWFBTZiiw',
    description: 'Đèn chùm pha lê baccarat, đèn thả bàn ăn hiện đại, đèn cây phòng khách thiết kế đậm tính nghệ thuật.',
    badge: 'Ánh sáng hoàn hảo'
  },
  {
    id: 'vat-lieu-hoan-thien',
    name: 'VẬT LIỆU HOÀN THIỆN',
    iconName: 'Layers',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKGFx89Z13DD1Nzgpk1Me2UfEjdPoVnKgKuWXjf6C0oRf1DigtAtGxqm5Vs4tOgChhpbfM2yZYfnNGDkVUL8JtzhgOz0VLwMM5RE_-ReUEb2PDGChJfmf1uYzzPI2K311JQaxSfzleF2P6KlRFZTORI8JcG4c8vpNddg9WxdO-mhrqBun9pFw3nQ1W9s_5Z_8IBS1PCFNdU7JzQmwE2GBbkXgkrddspaJc8knPCo6D89QtR5Y0EPQyEY48_di2gO8TP2VbAnrL9Vg',
    description: 'Phào chỉ gỗ tự nhiên, tấm ốp lam sóng PVC vân gỗ, gạch nung cổ điển, sơn hiệu ứng cao cấp nhập khẩu.',
    badge: 'Bền đẹp theo thời gian'
  }
];

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'BIỆT THỰ VINHOMES RIVERSIDE',
    location: 'Hà Nội',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXseOFtHa991gQ5qGJDBuUwlkRdNipIhkDB_OSM_gHjpnxacToZ2IPzCciP7gro3s51kT83Dr7E1jVFqP2QrqgsaLv_avV8csQh3QwycEAZxiGAB88dbFQ55_Zb14zVR8CV6Y0sTiz3WfzhTwbCnIj-7C90m2VFTFShcvxI-N2hw-Bo-G-ng3b8VIKhGdSpHDU9_E4vjLU1ECVaIbWyHDC_ykL0wHAa-C_W48T2pQgz_2nJPQIWNJiHb-7WJyo8rvWTLf5Jxe4bjc',
    category: 'Biệt Thự Đơn Lập',
    year: '2025',
    area: '450m²',
    style: 'Modern Luxury',
    description: 'Biệt thự siêu cao cấp ứng dụng toàn bộ gạch Porcelain vân đá khổ lớn Tây Ban Nha kết hợp hệ thống thiết bị nhà tắm thông minh mạ vàng PVD đen đẳng cấp.'
  },
  {
    id: 'proj-2',
    title: 'CĂN HỘ SUNSHINE CITY',
    location: 'Hà Nội',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjHxN67aqRIDzFYnf9Up9r6K1BZNQaRl7IhQ37R9jzdMjPViP2HBFtQE8-izhowRwRynP9rKCJZ0mPHXqgS5Ur7SHlqEpJ9kvbvGznTnWWV6hUEwb84tlBhg2HixhfVaKK7h12H4qAfNylu1NTaUy1EIPGfvMvUB7shFYpRaHGOBAHx3MU7-cIq7RVhSfhb-cyKfLCBqC-vX1E7ZBYaonD07uAkmFpOjQm5AvdcT94n-_yWSZ21uuLIxcgYmaMLGjzUluY60GiwLo',
    category: 'Penthouse Cao Cấp',
    year: '2025',
    area: '210m²',
    style: 'Contemporary & Elegant',
    description: 'Căn Penthouse thời thượng với tone màu trầm tối. Phòng tắm kính hở ôm trọn view thành phố, trang bị bồn tắm đúc nguyên khối bằng đá tự nhiên đen nhám.'
  },
  {
    id: 'proj-3',
    title: 'KHÁCH SẠN MƯỜNG THANH',
    location: 'Thanh Hóa',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxMTyFHAlKC7CDsQy3cCZGphaKRqoMEmewamwMUEsgoNFr0nyw9xRry1xDIeZv-a2-Lx83U9F7mQg47VghlcIvcjJnQ3b9N1EAIHZ6rZzxAoWDbmoO1lllmMtrgtt44xNjgmh3TXRz8Xbb5OxuQj0nEkiGdv30NXzDQ0nI5Ip10e-Dey0aOaKbXb6tqmaDNwHO_ts5amu_R2Sl8-k3-InRnEKiE9DXZ4hQZR1rnYmiPX0fkuZ1IQIgnXaMwQCFoOTO2MBJWiOOhFg',
    category: 'Khách Sạn & Resort',
    year: '2024',
    area: '12,500m²',
    style: 'Grand Architecture',
    description: 'Toàn bộ sảnh chính và phòng VIP sử dụng các dòng đá tự nhiên & gạch khổ lớn do Linh Trang Home cung cấp độc quyền, khẳng định quy mô bề thế và sự tinh tế.'
  },
  {
    id: 'proj-4',
    title: 'VILLA FLC SẦM SƠN',
    location: 'Thanh Hóa',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6f7D6JY3lii13qR5YaQ5tpd7SfB42jGnWNK8ExurQc5FeCQAjuSL_1M-vdRIlC3iszf3uzGSrfc8_jdTn3rJUvWPHT2vRJLWO86E1_Px0YT4giEyCbyj0tw9BzYXECQBSToh83FLa0iXWDnQV_jWEwD6HuhEEdbbfciAdA4d48q8qpwgPWl_ElhZDjRi_MnW-Cdeu7q5gWPgzB-add_qvu28XocNlmQrrgvE94gwIbS4CDecb95ZIrgYXomNKmiYsvwdAv7z_EeI',
    category: 'Biệt Thự Nghỉ Dưỡng',
    year: '2024',
    area: '380m²',
    style: 'Eco Luxury',
    description: 'Thiết kế mở giao thoa thiên nhiên, sử dụng gạch hạt mịn chống trơn trượt cao cấp cho hành lang ngoài trời và khu vực bể bơi gia đình đẳng cấp nghỉ dưỡng.'
  }
];

export const productsByCategoryId: Record<string, Product[]> = {
  'gach-op-lat': [
    {
      id: 'prod-g1',
      categoryId: 'gach-op-lat',
      name: 'Gạch Vân Đá Marble Calacatta Tây Ban Nha',
      code: 'LT-MARBLE-01',
      imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
      origin: 'Tây Ban Nha',
      material: 'Porcelain siêu cứng bóng kính',
      size: '80x160 cm, 120x240 cm',
      price: 'Liên hệ',
      description: 'Đường vân Calacatta xám mảnh tinh tế trên nền đá trắng tuyết tự nhiên tạo không gian rộng mở và ngập tràn sang trọng quý phái.'
    },
    {
      id: 'prod-g2',
      categoryId: 'gach-op-lat',
      name: 'Gạch Slate Thô Đen Obsidian Nhập Khẩu Ý',
      code: 'LT-SLATE-02',
      imageUrl: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80',
      origin: 'Ý',
      material: 'Granite nhám chống trơn trượt R11',
      size: '60x120 cm',
      price: 'Liên hệ',
      description: 'Nhám tự nhiên từ mỏ đá phiến vùng Tuscany. Thích hợp cho mảng tường nhấn phòng tắm hoặc lát nền sân vườn cao cấp.'
    },
    {
      id: 'prod-g3',
      categoryId: 'gach-op-lat',
      name: 'Gạch Terrazzo Nghệ Thuật Premium',
      code: 'LT-TER-03',
      imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80',
      origin: 'Ý',
      material: 'Bột đá thạch anh tự nhiên',
      size: '60x60 cm, 80x80 cm',
      price: 'Liên hệ',
      description: 'Những mảnh thạch anh ngũ sắc được đúc liền khối tạo xúc cảm ấn tượng mạnh mẽ cho sàn trang trí trung tâm biệt thự.'
    }
  ],
  'thiet-bi-ve-sinh': [
    {
      id: 'prod-v1',
      categoryId: 'thiet-bi-ve-sinh',
      name: 'Bồn Cầu Thông Minh Linh Trang Luxury One',
      code: 'LT-TOILET-01',
      imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      origin: 'Đức',
      material: 'Men công nghệ Nano-Glaze chống bám bẩn trọn đời',
      size: '720x400x520 mm',
      price: 'Liên hệ',
      description: 'Hệ thống xịt rửa hồng ngoại đa chức năng, sưởi ấm bệ ngồi tự động, xả xoáy Cyclone lốc xoáy siêu trơn tru ít ồn.'
    },
    {
      id: 'prod-v2',
      categoryId: 'thiet-bi-ve-sinh',
      name: 'Sen Cây Nhiệt Độ Cao Cấp Matte Black PVD',
      code: 'LT-SHOWER-02',
      imageUrl: 'https://images.unsplash.com/photo-1504156806580-c161d36551b4?auto=format&fit=crop&w=600&q=80',
      origin: 'Đức',
      material: 'Đồng mạ PVD 5 lớp chống trầy màu đen mờ',
      size: 'Chiều cao tự điều chỉnh 85-120cm',
      price: 'Liên hệ',
      description: 'Bát sen mưa siêu mỏng tạo bọt khí massage thư giãn êm ái cùng hệ thống khóa nhiệt thông minh chống bỏng an tâm cho trẻ nhỏ.'
    },
    {
      id: 'prod-v3',
      categoryId: 'thiet-bi-ve-sinh',
      name: 'Bồn Tắm Nằm Đá Nhân Tạo Solid Surface',
      code: 'LT-TUB-03',
      imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=600&q=80',
      origin: 'Hàn Quốc',
      material: 'Đá acrylic rắn nguyên thạch',
      size: '1700x800x600 mm',
      price: 'Liên hệ',
      description: 'Thiết kế công thái học liền sọc, khả năng giữ nhiệt nước lâu tối đa, bề mặt mịn lỳ cực kỳ dễ lau rửa sờ mịn tay cực sang.'
    }
  ],
  'noi-that': [
    {
      id: 'prod-n1',
      categoryId: 'noi-that',
      name: 'Sofa Da Bò Ý Nhập Khẩu Cao Cấp Milano Lounge',
      code: 'LT-SF-MILANO',
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
      origin: 'Ý',
      material: 'Da thật 100% Full-grain nhập Ý cao cấp',
      size: 'Băng dài 3m2 x 1m8',
      price: 'Liên hệ',
      description: 'Thiết kế bập bênh thư giãn linh hoạt, mút foam 3 tầng chống xẹp mật độ cao cùng độ đàn hồi mềm mượt như mây khói.'
    },
    {
      id: 'prod-n2',
      categoryId: 'noi-that',
      name: 'Bàn Ăn Mặt Đá Phiến Cao Cấp Hermes',
      code: 'LT-BA-HERMES',
      imageUrl: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=600&q=80',
      origin: 'Tây Ban Nha',
      material: 'Đá phiến dày 12mm chịu lực, chống xước, chịu nhiệt độ cao',
      size: '180x90 cm (Kèm 6 ghế da)',
      price: 'Liên hệ',
      description: 'Chân bàn làm bằng đồng thau đúc nghệ thuật, mặt gốm nung siêu cứng cáp có thể chặt thái trực tiếp không lo vết xước.'
    }
  ],
  'trang-tri-noi-that': [
    {
      id: 'prod-t1',
      categoryId: 'trang-tri-noi-that',
      name: 'Gương Bỉ Tráng Bạc Treo Tường Led Halo',
      code: 'LT-MIRROR-LED',
      imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=600&q=80',
      origin: 'Bỉ',
      material: 'Kính AGC 8 lớp tráng bạc nguyên chất cực sáng',
      size: 'Đường kính 80cm',
      price: 'Liên hệ',
      description: 'Hệ đèn LED âm hắt gián tiếp tạo vòng sáng huyền ảo lãng mạn, tích hợp màng sấy phá sương cảm ứng tiện dụng tối đa.'
    },
    {
      id: 'prod-t2',
      categoryId: 'trang-tri-noi-that',
      name: 'Bình Gốm Điêu Khắc Đương Đại Noir',
      code: 'LT-VASE-01',
      imageUrl: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=80',
      origin: 'Bát Tràng Premium',
      material: 'Đất sét phủ men lỳ thủ công nghệ thuật',
      size: 'Cao 45cm, Rộng 22cm',
      price: 'Liên hệ',
      description: 'Sáng tạo từ những đường lượn sóng tối giản đương đại, tạo điểm nhấn nghệ thuật độc nhất vô nhị trên bục console.'
    }
  ],
  'den-trang-tri': [
    {
      id: 'prod-d1',
      categoryId: 'den-trang-tri',
      name: 'Đèn Chùm Pha Lê Baccarat Hoàng Gia',
      code: 'LT-LIGHT-CH01',
      imageUrl: 'https://images.unsplash.com/photo-1543248939-ff40856f65d4?auto=format&fit=crop&w=600&q=80',
      origin: 'Pháp',
      material: 'Pha lê tinh khiết K9 mạ vàng 24k chống oxy hóa',
      size: 'Đường kính 120cm, cao 95cm',
      price: 'Liên hệ',
      description: 'Ánh sáng khúc xạ rực rỡ lộng lẫy từ hàng trăm viên pha lê mài tay tinh xảo, biến phòng ngủ hay sảnh biệt thự thành lâu đài tráng lệ.'
    },
    {
      id: 'prod-d2',
      categoryId: 'den-trang-tri',
      name: 'Đèn Thả Bàn Ăn Bắc Âu Minimalist Slim',
      code: 'LT-LIGHT-TH02',
      imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80',
      origin: 'Thụy Điển',
      material: 'Nhôm chế tạo máy bay phủ mờ anodized',
      size: 'Dài 150cm',
      price: 'Liên hệ',
      description: 'Thanh mảnh như một dải sáng bay tự do lơ lửng, tùy chỉnh độ sáng thông qua vẫy tay cảm ứng không dây thông minh.'
    }
  ],
  'vat-lieu-hoan-thien': [
    {
      id: 'prod-materials1',
      categoryId: 'vat-lieu-hoan-thien',
      name: 'Tấm Ốp Lam Sóng Charcoal Gỗ Óc Chó Ý',
      code: 'LT-CHARCOAL-01',
      imageUrl: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=600&q=80',
      origin: 'Nhật Bản',
      material: 'Than tre ép bề mặt hoàn thiện màng nhựa kỹ thuật chống nước',
      size: '1220x2440 mm',
      price: 'Liên hệ',
      description: 'Kháng khuẩn vượt trội, triệt tiêu tiếng vang, chống mối mọt dẻo dai làm vách trang trí 3D phòng khách cực kỳ sang quý.'
    },
    {
      id: 'prod-materials2',
      categoryId: 'vat-lieu-hoan-thien',
      name: 'Sơn Hiệu Ứng Bê Tông Premium Stucco',
      code: 'LT-STUCCO-02',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
      origin: 'Ý',
      material: 'Vữa thạch cao gốc vôi dẻo nhập khẩu Ý',
      size: 'Mét vuông thi công',
      price: 'Liên hệ',
      description: 'Bề mặt vân mây sáng tối ẩn hiện có chiều sâu nghệ thuật cực cao, mát mịn và hoàn toàn lành tính cho sức khỏe.'
    }
  ]
};

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Xu hướng gạch ốp lát 2026 - Đẹp, sang trọng và hiện đại',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWi8yoN42LlMSenNu1kufxnytwkI-xu0nfWRIAPtZoU_mJy8QboyNCnGaOhTvi7kXZ3AwNZNG7mdIk47D-0x92BrPqA9DPUbYyLU5qnGxz0AmlNU7dRaVmB2iwjYKqz3fy8A7Y0SromDOClLbaTTA1nOcBc0nXKpVRs7i0_OMBDBxlXpk5-00mVbO3064Uji3nl5kVfQozb6ve6PK3HXsd2hwL8kunEC4kDZyqCsdcj1rLkAtz2OJDAT_yQo2UiBvQAdLQwS_FK2M',
    date: '20/05/2026',
    author: 'Admin Linh Trang',
    summary: 'Khám phá những mẫu gạch ốp lát khổ lớn đang dẫn đầu xu hướng năm 2026 cho không gian căn hộ và biệt thự thượng lưu.',
    content: `Năm 2026 đánh dấu sự chuyển mình mạnh mẽ trong phong cách chọn gạch ốp lát của các gia chủ và kiến trúc sư hàng đầu. Thay vì các dòng gạch kích thước nhỏ truyền thống, **gạch khổ lớn (Slab)** với các kích cỡ cực đại như 120x240cm hay 160x320cm nhập khẩu từ Tây Ban Nha và Ý đang chiếm lĩnh hoàn toàn phân khúc bất động sản hạng sang.

### Những ưu điểm vượt trội đưa gạch khổ lớn thành "Vua":

1. **Hạn chế tối đa đường ron gạch:** Việc tối giản mạch vữa mang lại một sàn nhà phẳng lỳ, tạo cảm giác vô biên như đá nguyên thạch được xẻ ra cả tấm.
2. **Đường vân liên tục sống động:** Các bộ sưu tập cao cấp tại Linh Trang Home sở hữu vân đá chạy nối tiếp hoàn hảo (Bookmatch) làm nên những bức tranh đá tự nhiên ngoạn mục.
3. **Chống thấm, chịu nhiệt và chống bám bẩn:** Công nghệ ép lực nén hàng vạn tấn cùng lớp men siêu vi tối cao giúp độ hút nước gần như bằng không, giữ vẻ bóng sáng quý tộc trọn đời gạch.

Đến với hệ thống showroom quy mô tại Thanh Hóa và Hà Nội, Linh Trang Home luôn sẵn lòng tư vấn cho quý khách giải pháp mặt bằng liền sọc thời đại mới.`
  },
  {
    id: 'post-2',
    title: '5 Mẫu thiết bị vệ sinh cao cấp đáng đầu tư nhất hiện nay',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcwwEO4ZR8Ri2WN8nVSd1-hNZcqqSTyLbfNe7Mzmoyfq8bbaqMvc-xwkDeVtCCmA99SLwyHctfGdKHzRqpDEvROUPv1hCSCvV8FuKGf9YGkW9xT5LIMkwZA5-8gYDgvYQfIfiawMolRmz5Bbbhr6NhizbbEY6cANZLxGW2eqmBwvmaOo6I9DnchpuqqZx9SFUS3Np6ZXD6PJvRQraWBqwA1ueElZgGqQpfPBneB0RPIKaArPrvyK4iU-66QC7Z7Ui4YlPv0-6ZAYI',
    date: '15/05/2026',
    author: 'KTS. Lê Anh Đức',
    summary: 'Phòng tắm sang trọng cần những thiết bị phù hợp cả về công năng lẫn thẩm mỹ. Cùng tham khảo các mẫu bồn cầu thông minh và sen tắm nổi bật.',
    content: `Phòng tắm không còn đơn thuần là khu vực vệ sinh mà đã nâng tầm thành "Home Spa" - không gian rũ bỏ bụi bặm, kiến tạo bình yên sau ngày dài học tập và làm việc căng thẳng. Vì thế, việc nâng cấp thiết bị vệ sinh thông minh là khoản đầu tư thông thái mang lại giá trị thực tế hàng giờ cho sức khỏe cả gia đình.

### Top 5 bảo vật phòng tắm đáng đồng tiền bát gạo tại Linh Trang Home:

1. **Bồn cầu tự động xịt rửa sấy khô đa chức năng:** Trang bị mắt cảm ứng radar tự mở nắp khi bạn bước đến gần, tự xả nước và khép kín tinh tươm kèm đèn LED định hướng ban đêm dịu mát mắt.
2. **Sen tắm nhiệt độ mạ PVD đen Matte:** Khóa an toàn 38°C cố định nhiệt lượng hoàn hảo, tránh hoàn toàn nguy hiểm bỏng nhiệt đột ngột của sen cây lỗi thời.
3. **Bồn tắm đá Solid Surface đúc khuôn công thái học:** Chất liệu siêu cách nhiệt ôm khít tự nhiên sống lưng, giữ trọn vẹn nước ấm cho kì ngâm thảo mộc sâu sảng khoái.
4. **Lavabo đá Marble mài tay thủ công mộc mạc:** Độc bản với những thớ rạn đặc hữu tinh tế đầy tính nghệ thuật.
5. **Gương bỉ chống mốc cảm ứng halo sấy gương thông minh:** Sự kết hợp hoàn mỹ giữa gương soi chuẩn studio chân thật nhất và công nghệ phá màng sương tiện nghi.`
  }
];
