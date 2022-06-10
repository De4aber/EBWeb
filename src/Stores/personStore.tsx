import {makeAutoObservable, observable, action, runInAction} from "mobx";
import personService from "../Services/personService";
import personThemeStore from "./personThemeStore";

export interface Person {
    id: number;
    name: string;
    color?: string;
    isClicked: boolean;
}

export class PersonStore {
    @observable allPersons: Person[] = [];
    @observable person: Person | undefined;

    @action
    getAll = async () => {
        const response = await personService.getAll();
        this.allPersons = response.data;
        this.allPersons.forEach(person => { person.isClicked = false; });
        this.allPersons.forEach(async person => {
            await personThemeStore.getByPersonId(person.id)
            var theme = personThemeStore.personTheme;
            console.log(theme)
            if(theme?.HasPersonTheme){
                person.color = theme.Color;
                console.log(person)
            }
        });
    }

    @action
    createPerson = async (data: Person) => {
        const response = await personService.createPerson(data);
        this.allPersons.push(response.data);
    }

    @action
    getPersonById = async (id: number) => {
        const response = await personService.getPersonById(id);
        this.person = response.data;
    }

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }
}

const personStore = new PersonStore();
export default personStore;