import http from "../http-common";
import { Tile } from "../Stores/tileStore";

export interface createTileDTO {
    condition: string;
    ofPersonId: number;
}

class TileService {
    async getTilesOfPerson(personId: number) {
        return http.get<Tile[]>(`/TileItem/GetByPersonId?personId=${personId}`);
    }
    async getAll() {
        return http.get<Tile[]>("/TileItem");
    }

    async createTile(data: createTileDTO) {
        return http.post<Tile>("/TileItem", data);
    }
    async getTileById(id: number) {
        return http.get<Tile>(`/TileItem/GetById/${id}`);
    }
}
export default new TileService();