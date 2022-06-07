import { makeAutoObservable, observable, action } from "mobx";
import tileServices from "../Services/tileServices";
import { Person } from "./personStore";

export interface Tile {
    id: number;
    condition: string;
    ofPersonId: number;
    ofPerson: Person;
}

export class TileStore {
    @observable tiles: Tile[] = [];
    @observable tile: Tile | undefined;

    @action
    getAll = async () => {
        const response = await tileServices.getAll();
        this.tiles = response.data;
    }

    @action
    createTile = async (data: Tile) => {
        const response = await tileServices.createTile(data);
        this.tiles.push(response.data);
    }

    @action
    getTileById = async (id: number) => {
        const response = await tileServices.getTileById(id);
        this.tile = response.data;
    }

    constructor() {
        makeAutoObservable(this);
    }
}


const tileStore = new TileStore();
export default tileStore;
