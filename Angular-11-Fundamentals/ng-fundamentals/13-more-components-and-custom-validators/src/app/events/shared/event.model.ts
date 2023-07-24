//Create an interface for an event
//This will allow us to assign a type to events for compile time type checking
export interface IEvent {
    id: number
    name: string
    date: Date
    time: string
    price: number
    imageUrl: string
    location?: {
        address: string
        city: string
        country: string
    },
    onlineUrl?: string,
    sessions: ISession[]
}

export interface ISession {
    id: number
    name: string
    presenter: string
    duration: number
    level: string
    abstract: string
    voters: string[]
}