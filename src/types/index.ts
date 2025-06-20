export interface User {
  id: number
  first_name: string
  last_name: string
  second_name?: string
  email: string
  phone: string
  role: string
  specializations?: Specialization[]
  permissions?: Permission[]
}

export interface Client {
  first_name: string,
  last_name: string,
  second_name: string,
  phone: string,
  birth_date: string,
  notes: string,
  // preferences: string,
  email: string
}

export interface Master extends User {
  services?: Service[]
}

export interface Specialization {
  name: string,
  description: string
}

export interface Permission {
  name: string
}

export interface Service {
  specialization_id: number
  master_id: number
  name: string
  duration: number
  price: number
  description: string
}

export interface LoginData {
  login: string
  password: string,
  keepLoggedIn: boolean
}

export interface RegisterData {
  first_name: string
  last_name: string
  second_name?: string
  email: string
  phone: string
  password: string
  password_confirmation: string
  specializationId: number[],
  agreeToTerms: boolean
}
