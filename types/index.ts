export type Mentee = {
    id: string
    menteeUserId: string
    name: string
    email: string
    age: number
    location: string
    avatar: string
    goal: string
    careerPath: string
    interests: string[]
    socials: {
      twitter?: string
      linkedin?: string
    }
    time: string
  }