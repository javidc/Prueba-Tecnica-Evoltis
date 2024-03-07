export interface PaginationClub {
    totalQuantity: number;
    numberOfPages: number;
    lstClubsGetDto: ClubData[];
}

export interface ClubData {
    idClub: number;
    name: string;
    address: string;
    cuit: string;
    fileName: string;
    stadiumName: string;
    tournament: string;
    active: boolean;
    image?: any;
}

export interface ClubCreate {
    name: string;
    address: string;
    cuit: string;
    stadiumName: string;
    idTournament: number;
    image?: any;
}

