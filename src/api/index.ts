import type { IUser } from '@/stores/auth'
import { api } from '@/utils/api'

interface IResponse<T = unknown> {
  success: boolean
  message: string
  data: T
}

interface IAuthSignup {
  userName: string
  email: string
  password: string
}

export interface ICategory {
  name: string
  _id: string
}

export interface IComment {
  content: string
  author: IUser
  post: IPost
}

export interface IPost {
  _id: string
  title: string
  slug?: string
  meta?: {
    description: string
    keywords: string[]
    title: string
  }
  content: string
  author: IUser
  category: ICategory
  tags?: string[]
  media?: {
    type: 'image' | 'video' | 'auto' | 'raw'
    url: string
  }
  likes: string[] | IUser[]
  comments: string[] | IComment[]
  shares: number
  createdAt: Date
  updatedAt: Date
}

export const signUp = async (data: IAuthSignup) => {
  const response = await api.post<IResponse>('/auth/signup', data)
  return response.data
}

export const signIn = async (formData: Partial<IAuthSignup>): Promise<IUser> => {
  const { data } = await api.post<IResponse<IUser>>('/auth/signin', formData)
  return data.data
}

export const logout = async () => {
  const { data } = await api.get<IResponse>('/auth/logout')

  return data
}

//categories
export const getPostCategories = async () => {
  const { data } = await api.get<IResponse<ICategory[]>>('/categories')
  return data.data
}
//posts
export const createPost = async (formData: FormData) => {
  const { data } = await api.post<IResponse>('/posts', formData)

  return data
}

export const getPosts = async () => {
  const { data } = await api.get<IResponse<{ posts: IPost[] }>>('/posts')
  return data.data
}
export const getUSerPosts = async () => {
  const { data } = await api.get<IResponse<{ posts: IPost[] }>>('/author-posts')
  return data.data
}
export const getPost = async (id: string) => {
  const { data } = await api.get<IResponse<{ post: IPost }>>(`/posts/${id}`)
  return data.data
}

export const getPostComments = async (id: string) => {
  const { data } = await api.get<IResponse<{ post: IComment[] }>>(`/posts/${id}/comments`)

  return data.data
}

export const likePost = async (id: string) => {
  const { data } = await api.post('`/posts/${id}/like`')

  return data
}
export const unlikePost = async (id: string) => {
  const { data } = await api.post('`/posts/${id}/unlike`')

  return data
}

export const sharePost = async (id: string) => {
  const { data } = await api.post('`/posts/${id}/share`')

  return data
}
export const commentPost = async (id: string, content: string) => {
  const { data } = await api.post('`/posts/${id}/comment`', { content })

  return data
}
