'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface AuthUser {
  id: string
  email: string
  name: string
  phone?: string
  provider: 'email' | 'google'
  createdAt: string
}

export interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: (googleUser: any) => Promise<void>
  registerWithEmail: (email: string, password: string, name: string, phone: string) => Promise<void>
  verifyOTP: (email: string, otp: string) => Promise<void>
  sendOTP: (email: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for stored session on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('securebank_user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newUser: AuthUser = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
        provider: 'email',
        createdAt: new Date().toISOString(),
      }
      
      setUser(newUser)
      localStorage.setItem('securebank_user', JSON.stringify(newUser))
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async (googleUser: any) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newUser: AuthUser = {
        id: googleUser.sub,
        email: googleUser.email,
        name: googleUser.name,
        provider: 'google',
        createdAt: new Date().toISOString(),
      }
      
      setUser(newUser)
      localStorage.setItem('securebank_user', JSON.stringify(newUser))
    } catch (error) {
      console.error('Google login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const sendOTP = async (email: string) => {
    // Simulate sending OTP
    await new Promise(resolve => setTimeout(resolve, 500))
    // Store OTP in session (in production, this would be server-side)
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    sessionStorage.setItem(`otp_${email}`, otp)
    console.log('OTP sent to', email, '- OTP:', otp) // For testing
  }

  const verifyOTP = async (email: string, otp: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const storedOTP = sessionStorage.getItem(`otp_${email}`)
      if (storedOTP !== otp) {
        throw new Error('Invalid OTP')
      }
      
      const userData = sessionStorage.getItem(`signup_${email}`)
      if (!userData) {
        throw new Error('Registration data not found')
      }

      const { email: userEmail, name, phone, password } = JSON.parse(userData)
      
      const newUser: AuthUser = {
        id: `user_${Date.now()}`,
        email: userEmail,
        name,
        phone,
        provider: 'email',
        createdAt: new Date().toISOString(),
      }
      
      setUser(newUser)
      localStorage.setItem('securebank_user', JSON.stringify(newUser))
      sessionStorage.removeItem(`otp_${email}`)
      sessionStorage.removeItem(`signup_${email}`)
    } catch (error) {
      console.error('OTP verification failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const registerWithEmail = async (email: string, password: string, name: string, phone: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Store registration data temporarily
      sessionStorage.setItem(`signup_${email}`, JSON.stringify({
        email,
        password,
        name,
        phone,
      }))
      
      // Send OTP
      await sendOTP(email)
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('securebank_user')
    sessionStorage.clear()
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    loginWithGoogle,
    registerWithEmail,
    verifyOTP,
    sendOTP,
    logout,
    isAuthenticated: user !== null,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
