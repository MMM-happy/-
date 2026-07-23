export type PetType = 'all' | 'dog' | 'cat';
export type Gender = 'male' | 'female';
export type AgeGroup = 'puppy' | 'adult' | 'senior';
export type PetStatus = 'available' | 'pending' | 'adopted';

export interface PetTraits {
  friendliness: number; // 1-5親人度
  energy: number;       // 1-5活力值
  intelligence: number; // 1-5聰明度
  quietness: number;    // 1-5安靜度
}

export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat';
  breed: string;
  age: string; // e.g. "5個月", "2歲", "4歲"
  ageGroup: AgeGroup;
  gender: Gender;
  size: 'small' | 'medium' | 'large';
  weight: string; // e.g. "3.2 kg"
  photo: string;
  galleryImages: string[];
  personality: string[]; // e.g. ['親人討摸', '活潑好動', '溫和黏人']
  personalityDesc: string; // 詳細個性說明
  healthStatus: string[]; // e.g. ['已三劑疫苗', '已絕育', '已植晶片', '定期驅蟲']
  healthDetails: string; // 健康詳細評估
  vaccineDone: boolean;
  neutered: boolean;
  microchipped: boolean;
  traits: PetTraits;
  story: string; // 拯救/被發現的背後故事
  shelterLocation: string; // 所在分館/園區
  arrivalDate: string; // 入園日期
  urgentAdoption: boolean; // 是否為緊急急尋家
  status: PetStatus;
  compatibleWith: string[]; // e.g. ['適合新手', '適合有小朋友家庭', '適合多寵家庭']
}

export interface AdoptionApplication {
  id: string;
  petId: string;
  petName: string;
  petBreed: string;
  petPhoto: string;
  applicantName: string;
  phone: string;
  email: string;
  city: string;
  housingType: string; // 自有公寓, 租屋(可養寵), 透天厝等
  hasPets: string; // 有/無
  familyAgreed: boolean;
  experience: string;
  reason: string;
  status: 'pending' | 'interviewing' | 'approved' | 'rejected';
  createdAt: string;
}

export interface FilterState {
  type: PetType;
  ageGroup: string; // 'all' | 'puppy' | 'adult' | 'senior'
  gender: string;   // 'all' | 'male' | 'female'
  urgentOnly: boolean;
  search: string;
  sortBy: 'default' | 'urgent' | 'youngest' | 'newest';
}

export type PageRoute = 'home' | 'pets' | 'pet-detail' | 'process' | 'applications' | 'about' | 'contact';
