export interface CreateUserDTO{

    fullName: string,
    age: number,
    email: string,
    password: string,

}

export interface LoginUserDTO{

    email: string,
    password: string,
    
}