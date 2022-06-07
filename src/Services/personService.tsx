import http from "../http-common";
import { Person } from "../Stores/personStore";

export interface createPersonDTO {
    name: string;
}

class PersonService {
    async getAll() {
        return http.get<Person[]>("/Person");
    }
    async createPerson(data: createPersonDTO) {
        return http.post<Person>("/Person", data);
    }
    async getPersonById(id: number) {
        return http.get<Person>(`/Person/GetById/${id}`);
    }
}
export default new PersonService();