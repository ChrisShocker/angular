import { Note } from "./note";

//model for a user object
//includes notes from the note model
export class User {
    id: number = 0;
    birthDate: Date = new Date();
    name: string = '';
    avatar: string = '';
    bio: string = '';

    notes: Note[] = [];
}
