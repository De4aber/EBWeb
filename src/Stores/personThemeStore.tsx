import { makeAutoObservable, observable, action } from "mobx";
import personThemeService from "../Services/personThemeService";

export interface PersonTheme {
    HasPersonTheme: boolean;
    Color: string;
    id: number;
}

export class PersonThemeStore {
    @observable personTheme: PersonTheme | undefined;
    @observable allPersonThemes: PersonTheme[] = [];

    @action
    getByPersonId = async (id: number) => {
        this.allPersonThemes = [];
        const response = await personThemeService.getByPersonId(id);
        this.personTheme = response.data;
        if (this.allPersonThemes.find(personTheme => personTheme.id === id) === undefined) {
            this.allPersonThemes.push(response.data);
        }
        this.allPersonThemes.forEach(personTheme => { personTheme.id = id; });
    }



    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
}

const personThemeStore = new PersonThemeStore();
export default personThemeStore;
