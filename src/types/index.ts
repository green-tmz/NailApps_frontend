export interface User {
  id: number
  first_name: string
  last_name: string
  second_name?: string
  email: string
  phone: string
  specializations?: Specialization[]
}

export interface Client {
  id: number
  user_id: number
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
  id: number
  name: string
}

export interface Service {
  id: number
  specialization_id: number
  master_id: number
  name: string
  duration: number
  price: number
  description: string
}

export interface LoginData {
  login: string
  password: string
}

export interface RegisterData {
  first_name: string
  last_name: string
  second_name?: string
  email: string
  phone: string
  password: string
  password_confirmation: string
  specializationId: number[]
}
