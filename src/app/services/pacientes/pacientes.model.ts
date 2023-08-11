export class Paciente {
    public id!: string
    public nombre: string
    public apellido_paterno!:string
    public apellido_materno!:string
    public email!: string
    public fecha_nacimiento!: Date
    public genero!: string
    public ocupacion!: string
    public telefono!: string
    public domicilio!: string
    public nombre_contacto_emergencia!:string
    public telefono_contacto_emergencia!:string
    public relacion_contacto_emergencia!:string
    public motivo_de_consulta!:string
    public rfc!:string
    public createdAt!: Date
    public antecedentes_heredofamiliares!:string
    public antecedentes_personales_patologicos!: {}
    public estado_civil!:string

    constructor(){
        this.nombre = ''
        this.apellido_paterno = ''
        this.apellido_materno = ''
        this.email = ''
        this.fecha_nacimiento = new Date()
        this.genero = ''
        this.ocupacion = ''
        this.telefono = ''
        this.domicilio = ''
        this.nombre_contacto_emergencia = ''
        this.telefono_contacto_emergencia = ''
        this.relacion_contacto_emergencia = ''
        this.motivo_de_consulta = ''
        this.rfc = ''
        this.antecedentes_heredofamiliares = ''
        this.antecedentes_personales_patologicos = ''
        this.estado_civil = ''
    }
}