import { makeAutoObservable, observable, action } from "mobx";
import personThemeService from "../Services/personThemeService";

export interface PersonTheme {
    HasPersonTheme: boolean;
    Color: string;
}

export class PersonThemeStore {
    @observable personTheme: PersonTheme | undefined;

    @action
    getByPersonId = async (id: number) => {
        const response = await personThemeService.getByPersonId(id);
        this.personTheme = response.data;
    }

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }
}

const personThemeStore = new PersonThemeStore();
export default personThemeStore;
