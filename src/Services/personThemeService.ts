import http from "../http-common";
import { PersonTheme } from "../Stores/personThemeStore";

class PersonThemeService {
    async getByPersonId(id: number) {
        return http.get<PersonTheme>(`/PersonTheme/GetByPersonId/${id}`);
    }
}
export default new PersonThemeService();