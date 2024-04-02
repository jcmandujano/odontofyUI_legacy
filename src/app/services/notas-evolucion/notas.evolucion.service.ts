import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotaEvolucion } from './notas.evolucion.model';
const PATH_API = environment.API_URL;
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})

export class NotasService {
    constructor(private http: HttpClient) { }

    crearNota(patient_id:any, nota: NotaEvolucion){
        return this.http.post(`${PATH_API}/patients/${patient_id}/notes/`, nota , httpOptions);
    }

    listarNotas(id:any){
        return this.http.get(`${PATH_API}/patients/${id}/notes/`, httpOptions).pipe(
            map((response: any)=> {
                return response
            })
        );
    }

    buscarNotas(patient_id: any, criteria: string){
        return this.http.get(`${PATH_API}/nota-de-evolucions?paciente=${patient_id}&criterio=${criteria}`, httpOptions).pipe(
            map((response: any)=> {
                return response
            })
        );
    }
    
    actualizaNota(patient_id: any, nota_id: number, nota: NotaEvolucion){
        return this.http.put(`${PATH_API}/patients/${patient_id}/notes/${nota_id}`, nota, httpOptions);
    }

    eliminaNota(patient_id: any, nota_id: number){
        return this.http.delete(`${PATH_API}/patients/${patient_id}/notes/${nota_id}`, httpOptions);
    }
}