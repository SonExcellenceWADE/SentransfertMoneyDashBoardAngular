export interface User {
    id: number,
    username: string,
    password: string,
    confirmPassword: string,
    prenom: string,
    nom: string,
    email: string,
    isActive: boolean,
    userRole: string,  
    imageProfile?: string,
    partenaire?: string,
    token?: string
}
