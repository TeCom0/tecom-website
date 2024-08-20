

export const EventTypes = ["all", "Workshop", "TechnoBreak", "TechTalk", "Competition", "Trip", "UpComingEvents"]

export const SelectedTypes = [
    { value: 'all', label: 'All' },
    { value: 'Workshop', label: 'Workshop' },
    { value: 'Competition', label: 'Competition' },
    { value: 'Trip', label: 'Trip' },
    { value: 'TechnoBreak', label: 'TechnoBreak' },
    { value: 'TechTalk', label: 'TechTalk' },
    { value: 'UpComingEvent', label: 'UpComingEvents' }]

export const Membership = ["Members", "Board Members"]

export const selectedMembers = [{ value: "all", label: "all" }, { value: "Member", label: "Members" }, { value: "board", label: "Board Members" }]

export const Positions = [
    { value: 'President', label: 'President' },
    { value: 'Vice President', label: 'Vice President' },
    { value: 'General Secretary', label: 'General Secretary' },
    { value: 'Treasurer', label: 'Treasurer' }
]

export const Descriptions = [
    { type: 'Workshop', description: 'Provide Hands-on STEM Learning Experience across multiple sessions with knowledgeable instructors.' }, 
    { type: 'TechnoBreak', description: 'a Weekly event where a student presents a STEM topic to the audience, followed by discussion and interaction.' }, 
    { type: 'TechTalk', description: 'TechTalk invites credible renowned figures in STEM to deliver informative talks to club members' }, {type:'UpComingEvent', description:'Our Future Events.. STAY TUNED!'}
]
