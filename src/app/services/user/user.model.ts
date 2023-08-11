class Profile {
    public id!: number
    public username!: string
    public email!: string
    public provider!: string
    public confirmed!: boolean
    public blocked!: boolean
    public createdAt!: Date
    public updatedAt!: Date
    public nombre!: string
    public apellido_paterno!: string
    public apellido_materno!: string
    public fecha_nacimiento!: Date
    public no_cedula!: string
    public especialidad!: string
    public cedula_especialidad!: string
    public biografia!: string

}

export class User {
    public id!: number
    public username!: string
    public email!: string
    public provider!: string
    public confirmed!: boolean
    public blocked!: boolean
    public createdAt!: Date
    public updatedAt!: Date
    public nombre!: string
    public apellido_paterno!: string
    public apellido_materno!: string
    public fecha_nacimiento!: Date
    public no_cedula!: string
    public especialidad!: string
    public cedula_especialidad!: string
    public biografia!: string

    /* static fromJson(json: any): User{
        const user = new User()
        user.jwt = json.jwt
        
        user.profile = new Profile()
        user.profile.id = json.user.id
        user.profile.username = json.user.username
        user.profile.email = json.user.email
        user.profile.provider = json.user.provider
        user.profile.confirmed = json.user.confirmed
        user.profile.blocked = json.user.blocked
        user.profile.createdAt = json.user.createdAt
        user.profile.updatedAt = json.user.updatedAt
        user.profile.nombre = json.user.nombre
        user.profile.apellido_paterno = json.user.apellido_paterno
        user.profile.apellido_materno = json.user.apellido_materno
        user.profile.fecha_nacimiento = json.user.fecha_nacimiento
        user.profile.no_cedula = json.user.no_cedula
        user.profile.especialidad = json.user.especialidad
        user.profile.cedula_especialidad = json.user.cedula_especialidad
        user.profile.biografia = json.user.biografia
        return user
    }

    static toJson(user: User): any{
        const obj = {
            jwt: user.jwt,
            profile: user.profile
        }
        return obj
    } */

}

