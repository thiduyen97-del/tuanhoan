import { CirculatoryComponent, SimulationStage } from '../types/circulation';

export const APP_INFO = {
  title: 'HÀNH TRÌNH CHU DU CỦA MÁU KHẮP CƠ THỂ NGƯỜI',
  introParagraph: 'Nhờ có tim và hệ mạch, máu đã được lưu thông khắp cơ thể để thực hiện trao đổi khí, chất dinh dưỡng, chất thải giữa tế bào và môi trường.',
  promptQuestion: 'Bạn đã sẵn sàng khám phá con đường mà máu đi qua mỗi ngày chưa?',
  subjectGrade: 'Khoa học tự nhiên 8 · Sinh học cơ thể người',
};

export const COMPONENTS_DATA: CirculatoryComponent[] = [
  {
    id: 'heart',
    stepNumber: 1,
    label: 'TIM',
    name: 'Trái tim - Máy bơm sinh học',
    shortDesc: 'Cơ quan co bóp tạo lực đẩy máu lưu thông trong toàn bộ hệ mạch.',
    fullDesc: 'Tim là cơ quan co bóp tạo lực đẩy máu lưu thông trong hệ mạch. Tim có bốn ngăn: tâm nhĩ phải, tâm thất phải, tâm nhĩ trái và tâm thất trái.',
    features: [
      'Nửa phải chứa máu nghèo O₂ (máu đỏ thẫm / quy ước xanh dương)',
      'Nửa trái chứa máu giàu O₂ (máu đỏ tươi)',
      'Van nhĩ - thất (van 3 lá bên phải, van 2 lá bên trái) ngăn máu chảy ngược lên tâm nhĩ',
      'Tâm thất có thành cơ dày hơn tâm nhĩ để tạo áp lực bơm máu đi xa'
    ],
    anatomicalType: 'heart',
    oxygenStatus: 'dual',
    focusRegion: {
      cx: 270,
      cy: 400,
      r: 90,
      highlightIds: ['heart-container', 'chambers-all', 'valves']
    }
  },
  {
    id: 'artery',
    stepNumber: 2,
    label: 'ĐỘNG MẠCH',
    name: 'Hệ thống Động mạch',
    shortDesc: 'Đưa máu từ tim ra các cơ quan dưới áp lực co bóp lớn.',
    fullDesc: 'Động mạch đưa máu từ tim đến các cơ quan. Động mạch thường có thành dày và đàn hồi để chịu được áp lực máu.',
    features: [
      'Định nghĩa sinh học: Mạch dẫn máu từ tim RA NGOÀI (không phụ thuộc màu máu)',
      'Thành mạch gồm 3 lớp: mô liên kết, cơ trơn dày và lớp nội mạc',
      'Tính đàn hồi giúp duy trì dòng máu liên tục khi tim dãn',
      'Động mạch phổi mang máu nghèo O₂ đến phổi; Động mạch chủ mang máu giàu O₂ đến khắp cơ thể'
    ],
    anatomicalType: 'vessel',
    oxygenStatus: 'dual',
    focusRegion: {
      cx: 350,
      cy: 280,
      r: 100,
      highlightIds: ['vessel-aorta', 'vessel-pulmonary-artery']
    }
  },
  {
    id: 'vein',
    stepNumber: 3,
    label: 'TĨNH MẠCH',
    name: 'Hệ thống Tĩnh mạch',
    shortDesc: 'Đưa máu từ các cơ quan và phổi trở về các tâm nhĩ của tim.',
    fullDesc: 'Tĩnh mạch đưa máu từ các mô hoặc từ phổi trở về tim. Phần lớn tĩnh mạch có van giúp hạn chế máu chảy ngược.',
    features: [
      'Định nghĩa sinh học: Mạch dẫn máu TRỞ VỀ tim',
      'Thành mỏng hơn động mạch, lòng mạch rộng hơn',
      'Có hệ thống van tổ chim (van tĩnh mạch một chiều) ở các tĩnh mạch chi',
      'Tĩnh mạch phổi dẫn máu giàu O₂ về tim trái; Tĩnh mạch chủ dẫn máu nghèo O₂ về tim phải'
    ],
    anatomicalType: 'vessel',
    oxygenStatus: 'dual',
    focusRegion: {
      cx: 190,
      cy: 280,
      r: 100,
      highlightIds: ['vessel-pulmonary-vein', 'vessel-vena-cava']
    }
  },
  {
    id: 'pulmonary-capillaries',
    stepNumber: 4,
    label: 'MAO MẠCH PHỔI',
    name: 'Mao mạch tại Phổi',
    shortDesc: 'Nơi diễn ra quá trình trao đổi khí thiết yếu giữa máu và phế nang.',
    fullDesc: 'Mao mạch phổi là nơi máu trao đổi khí với phế nang. O₂ khuếch tán từ phế nang vào máu, còn CO₂ khuếch tán từ máu vào phế nang.',
    features: [
      'Mạng lưới vi mạch siêu mỏng bao quanh hàng triệu phế nang phổi',
      'Hồng cầu đi qua từng hàng đơn lẻ, tăng tối đa diện tích tiếp xúc',
      'Khí O₂ khuếch tán theo građien nồng độ: Phế nang → Máu (gắn vào Hemoglobin)',
      'Khí CO₂ khuếch tán: Máu → Phế nang để thở ra ngoài',
      'Màu máu chuyển dần từ xanh dương (đỏ thẫm nghèo O₂) sang đỏ tươi (giàu O₂)'
    ],
    anatomicalType: 'capillary',
    oxygenStatus: 'transition-blue-red' as any,
    focusRegion: {
      cx: 270,
      cy: 75,
      r: 90,
      highlightIds: ['capillaries-pulmonary', 'lungs-alveoli']
    }
  },
  {
    id: 'systemic-capillaries',
    stepNumber: 5,
    label: 'MAO MẠCH Ở CÁC CƠ QUAN',
    name: 'Mao mạch tại các Cơ quan & Tế bào',
    shortDesc: 'Vùng chuyển tiếp nuôi dưỡng toàn bộ tế bào của cơ thể.',
    fullDesc: 'Đây là nơi máu trao đổi chất với dịch mô và tế bào. O₂ cùng các chất dinh dưỡng có thể đi từ máu đến tế bào; CO₂ và nhiều chất thải chuyển từ tế bào vào máu.',
    features: [
      'Thành mao mạch chỉ gồm một lớp tế bào nội mạc có lỗ lọc siêu nhỏ',
      'Chiều từ máu đến tế bào: O₂ và chất dinh dưỡng (glucose, axit amin, axit béo...)',
      'Chiều từ tế bào vào máu: CO₂ và nhiều chất thải chuyển hóa (urê, axit uric...)',
      'Máu chuyển dần từ đỏ tươi (giàu O₂) sang xanh dương quy ước (máu nghèo O₂)'
    ],
    anatomicalType: 'capillary',
    oxygenStatus: 'transition-red-blue' as any,
    focusRegion: {
      cx: 270,
      cy: 640,
      r: 90,
      highlightIds: ['capillaries-systemic', 'body-tissues']
    }
  },
  {
    id: 'pulmonary-circuit',
    stepNumber: 6,
    label: 'VÒNG TUẦN HOÀN NHỎ',
    name: 'Vòng tuần hoàn Phổi',
    shortDesc: 'Vòng tuần hoàn trao đổi khí tại phổi để bổ sung oxy cho máu.',
    fullDesc: 'Máu từ tâm thất phải đi qua động mạch phổi đến mao mạch phổi để trao đổi khí, sau đó trở về tim qua các tĩnh mạch phổi và đổ vào tâm nhĩ trái.',
    features: [
      'Khởi đầu: Tâm thất phải co bóp',
      'Đường đi: Tâm thất phải → Động mạch phổi → Mao mạch phổi → Tĩnh mạch phổi → Tâm nhĩ trái',
      'Nhiệm vụ: Thải CO₂ và tiếp nhận thêm O₂ cho máu',
      'Đặc điểm: Quãng đường ngắn, áp lực bơm máu thấp hơn vòng lớn'
    ],
    anatomicalType: 'circuit',
    oxygenStatus: 'mixed',
    focusRegion: {
      cx: 270,
      cy: 200,
      r: 140,
      highlightIds: ['circuit-pulmonary']
    }
  },
  {
    id: 'systemic-circuit',
    stepNumber: 7,
    label: 'VÒNG TUẦN HOÀN LỚN',
    name: 'Vòng tuần hoàn Cơ thể (Vòng lớn)',
    shortDesc: 'Vòng tuần hoàn nuôi dưỡng tất cả cơ quan, mô và tế bào cơ thể.',
    fullDesc: 'Máu từ tâm thất trái đi qua động mạch chủ đến các cơ quan, trao đổi chất tại mao mạch rồi trở về tâm nhĩ phải qua các tĩnh mạch.',
    features: [
      'Khởi đầu: Tâm thất trái co bóp với lực đẩy rất mạnh',
      'Đường đi: Tâm thất trái → Động mạch chủ → Các động mạch nhánh → Mao mạch cơ quan → Các tĩnh mạch → Tĩnh mạch chủ → Tâm nhĩ phải',
      'Nhiệm vụ: Cung cấp O₂ và dưỡng chất cho toàn bộ tế bào, dọn dẹp CO₂ và chất thải',
      'Đặc điểm: Quãng đường dài khắp cơ thể từ đỉnh đầu đến ngón chân'
    ],
    anatomicalType: 'circuit',
    oxygenStatus: 'mixed',
    focusRegion: {
      cx: 270,
      cy: 500,
      r: 150,
      highlightIds: ['circuit-systemic']
    }
  }
];

export const SIMULATION_STAGES: SimulationStage[] = [
  {
    id: 1,
    label: 'TÂM THẤT PHẢI',
    name: 'Giai đoạn 1: Tâm thất phải bơm máu',
    caption: 'Tâm thất phải co bóp, đẩy máu nghèo O₂ vào động mạch phổi để đưa máu đến phổi.',
    bloodType: 'poor',
    oxygenLabel: 'Máu nghèo O₂ (Đỏ thẫm / Quy ước xanh dương)',
    highlightRegion: { cx: 320, cy: 360, zoomScale: 1.35 },
    activePathSegment: 'rv-pa'
  },
  {
    id: 2,
    label: 'ĐỘNG MẠCH PHỔI',
    name: 'Giai đoạn 2: Động mạch phổi vận chuyển',
    caption: 'Máu nghèo O₂ đi từ tâm thất phải đến phổi qua động mạch phổi.',
    bloodType: 'poor',
    oxygenLabel: 'Máu nghèo O₂ đang di chuyển lên phổi',
    highlightRegion: { cx: 320, cy: 230, zoomScale: 1.3 },
    activePathSegment: 'pa'
  },
  {
    id: 3,
    label: 'MAO MẠCH PHỔI',
    name: 'Giai đoạn 3: Mao mạch phổi — trao đổi khí',
    caption: 'Tại mao mạch phổi, O₂ khuếch tán từ phế nang vào máu, còn CO₂ khuếch tán từ máu vào phế nang.',
    bloodType: 'transition-blue-red',
    oxygenLabel: 'Máu được bổ sung O₂ (Chuyển dần sang Đỏ tươi)',
    exchangeSummary: {
      title: 'Cơ chế trao đổi khí tại Phế nang & Mao mạch phổi',
      inflow: ['O₂ từ phế nang khuếch tán vào huyết tương và gắn vào hemoglobin của hồng cầu'],
      outflow: ['CO₂ từ máu khuếch tán qua màng phế nang vào lòng phế nang để thải ra ngoài'],
      directionNotes: 'Chiều khuếch tán: O₂ → Máu | CO₂ → Phế nang'
    },
    highlightRegion: { cx: 350, cy: 110, zoomScale: 1.45 },
    activePathSegment: 'pulmonary-cap'
  },
  {
    id: 4,
    label: 'TĨNH MẠCH PHỔI',
    name: 'Giai đoạn 4: Tĩnh mạch phổi dẫn máu về tim',
    caption: 'Máu giàu O₂ từ phổi trở về tim qua các tĩnh mạch phổi và đổ vào tâm nhĩ trái.',
    bloodType: 'rich',
    oxygenLabel: 'Máu giàu O₂ (Đỏ tươi)',
    highlightRegion: { cx: 380, cy: 230, zoomScale: 1.3 },
    activePathSegment: 'pv'
  },
  {
    id: 5,
    label: 'TIM TRÁI',
    name: 'Giai đoạn 5: Tâm nhĩ trái và tâm thất trái',
    caption: 'Máu giàu O₂ đi vào tâm nhĩ trái, sau đó được chuyển xuống tâm thất trái. Tâm thất trái co bóp để bơm máu vào động mạch chủ.',
    bloodType: 'rich',
    oxygenLabel: 'Máu giàu O₂ trong buồng tim trái',
    highlightRegion: { cx: 380, cy: 340, zoomScale: 1.35 },
    activePathSegment: 'left-heart'
  },
  {
    id: 6,
    label: 'ĐỘNG MẠCH CHỦ VÀ ĐỘNG MẠCH',
    name: 'Giai đoạn 6: Động mạch chủ phân phối máu',
    caption: 'Máu giàu O₂ được tâm thất trái bơm qua động mạch chủ rồi phân phối đến các cơ quan trong cơ thể.',
    bloodType: 'rich',
    oxygenLabel: 'Máu giàu O₂ di chuyển đến các cơ quan',
    highlightRegion: { cx: 410, cy: 410, zoomScale: 1.25 },
    activePathSegment: 'aorta'
  },
  {
    id: 7,
    label: 'MAO MẠCH Ở CÁC CƠ QUAN',
    name: 'Giai đoạn 7: Mao mạch ở các cơ quan — trao đổi chất',
    caption: 'Tại mao mạch, O₂ và các chất dinh dưỡng đi từ máu đến tế bào. CO₂ cùng nhiều chất thải chuyển từ tế bào vào máu.',
    bloodType: 'transition-red-blue',
    oxygenLabel: 'Máu nhường O₂ cho tế bào (Chuyển dần sang Xanh dương)',
    exchangeSummary: {
      title: 'Cơ chế trao đổi chất tại Mô & Tế bào cơ thể',
      inflow: ['CO₂ từ tế bào khuếch tán vào máu', 'Nhiều chất thải chuyển hóa từ tế bào vào máu'],
      outflow: ['O₂ từ máu tách khỏi hemoglobin khuếch tán vào tế bào', 'Chất dinh dưỡng (glucose, axit amin...) đi từ máu qua dịch mô đến tế bào'],
      directionNotes: 'Chiều: (O₂ + Dinh dưỡng) → Tế bào | (CO₂ + Chất thải) → Máu'
    },
    highlightRegion: { cx: 350, cy: 530, zoomScale: 1.4 },
    activePathSegment: 'systemic-cap'
  },
  {
    id: 8,
    label: 'TĨNH MẠCH VÀ TĨNH MẠCH CHỦ',
    name: 'Giai đoạn 8: Hệ tĩnh mạch thu gom máu',
    caption: 'Máu sau khi trao đổi chất tại các cơ quan trở về tim qua hệ tĩnh mạch và các tĩnh mạch chủ.',
    bloodType: 'poor',
    oxygenLabel: 'Máu nghèo O₂ đang trở về tim',
    highlightRegion: { cx: 280, cy: 430, zoomScale: 1.25 },
    activePathSegment: 'vc'
  },
  {
    id: 9,
    label: 'TÂM NHĨ PHẢI',
    name: 'Giai đoạn 9: Hoàn thành một chu trình',
    caption: 'Máu trở về tâm nhĩ phải, tiếp tục đi xuống tâm thất phải để bắt đầu vòng tuần hoàn phổi.',
    bloodType: 'poor',
    oxygenLabel: 'Chu trình hoàn tất — Sẵn sàng cho vòng tiếp theo',
    highlightRegion: { cx: 310, cy: 310, zoomScale: 1.35 },
    activePathSegment: 'ra'
  }
];

export const REVIEW_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Trong vòng tuần hoàn nhỏ, máu từ tâm thất phải được bơm qua mạch máu nào để đến phổi?',
    options: [
      'Động mạch phổi mang máu nghèo O₂',
      'Tĩnh mạch phổi mang máu giàu O₂',
      'Động mạch chủ mang máu giàu O₂',
      'Tĩnh mạch chủ mang máu nghèo O₂'
    ],
    correctIndex: 0,
    explanation: 'Chính xác! Tâm thất phải co bóp bơm máu nghèo O₂ qua động mạch phổi để lên mao mạch phổi trao đổi khí.'
  },
  {
    id: 2,
    question: 'Tại mao mạch phổi, khí O₂ và khí CO₂ khuếch tán theo chiều nào?',
    options: [
      'O₂ từ máu vào phế nang, CO₂ từ phế nang vào máu',
      'O₂ từ phế nang vào máu, CO₂ từ máu vào phế nang',
      'Cả O₂ và CO₂ đều đi từ máu vào phế nang',
      'Cả O₂ và CO₂ đều đi từ phế nang vào máu'
    ],
    correctIndex: 1,
    explanation: 'Chính xác! O₂ khuếch tán từ phế nang vào máu để bổ sung oxy, còn CO₂ từ máu khuếch tán vào phế nang để thở ra ngoài.'
  },
  {
    id: 3,
    question: 'Động mạch nào sau đây mang máu GIÀU oxy (O₂)?',
    options: [
      'Động mạch phổi',
      'Động mạch chủ',
      'Tĩnh mạch chủ trên',
      'Tĩnh mạch chủ dưới'
    ],
    correctIndex: 1,
    explanation: 'Chính xác! Động mạch chủ nhận máu giàu O₂ từ tâm thất trái để đưa đi nuôi toàn bộ cơ thể. Lưu ý: Động mạch phổi lại mang máu nghèo O₂!'
  },
  {
    id: 4,
    question: 'Tại mao mạch ở các cơ quan, tế bào cơ thể tiếp nhận những chất gì từ máu?',
    options: [
      'CO₂ và các chất thải',
      'Chỉ duy nhất khí CO₂',
      'O₂ và các chất dinh dưỡng',
      'Khí O₂ và chất thải'
    ],
    correctIndex: 2,
    explanation: 'Chính xác! Máu nhường O₂ và chất dinh dưỡng cho tế bào sử dụng, đồng thời nhận CO₂ và nhiều chất thải chuyển hóa từ tế bào đưa về tim.'
  },
  {
    id: 5,
    question: 'Máu chảy một chiều trong hệ mạch nhờ cấu tạo nào?',
    options: [
      'Lực hút từ phổi và dịch mô',
      'Sự co bóp nhịp nhàng của tim và các van tim, van tĩnh mạch',
      'Máu tự chảy do trọng lực kéo xuống',
      'Chỉ do thành động mạch co bóp liên tục'
    ],
    correctIndex: 1,
    explanation: 'Chính xác! Lực co bóp của tim cùng các van tim (ngăn máu trào ngược) và van tĩnh mạch một chiều giúp máu lưu thông theo một chiều xác định.'
  }
];
