export interface Image {
    ImageId: string
    name: string
    url: string

}
export interface Events {
    EventId: string
    EventType: string
    updatedAt: string
    date: string
    description: string
    Location: string
    Title: string
    Images: Image[]
}

export interface EditUser {
    MemberId: string
    Email: string
    FirstName: string
    LastName: string
    Password?: string
    ConfirmPassword?: string
    Position: string
}

export interface EditEvent{
    Title: string
    description:string
    EventId: string
 }