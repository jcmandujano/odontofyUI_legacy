export class NotaEvolucion {
    id!: number
    nota!: string
    fecha_creacion!: Date
    paciente!: any

    constructor(){
        this.nota = ''
        this.fecha_creacion = new Date()
    }
}