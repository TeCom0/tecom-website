import { object, string } from 'zod'

export const NewMemberSchema = object({
    body: object({
        FirstName: string(),
        LastName: string(),
        Email: string(
            { required_error: 'Email is Required' })
            .email('Invalid Email').regex(/^[\w-]+(\.[\w-]+)*@aui\.ma$/, 'Not an AUI email'),
        MemberId: string(
            { required_error: 'ID is Required' })
            .regex(/^\d+$/, 'Invalid ID')
    })
})