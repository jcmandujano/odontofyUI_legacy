import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotaEvolucion } from './notas.evolucion.model';
const AUTH_API = environment.API_URL;
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})

export class NotasService {
    constructor(private http: HttpClient) { }

    crearNota(nota: NotaEvolucion){
        return this.http.post(AUTH_API + '/nota-de-evolucions', { data: nota }, httpOptions);
    }

    listarNotas(id:any){
        return this.http.get(`${AUTH_API}/nota-de-evolucions?paciente=${id}`, httpOptions).pipe(
            map((response: any)=> {
                return response
            })
        );
    }

    buscarNotas(id: any, criteria: string){
        return this.http.get(`${AUTH_API}/nota-de-evolucions?paciente=${id}&criterio=${criteria}`, httpOptions).pipe(
            map((response: any)=> {
                return response
            })
        );
    }
    
    actualizaNota(id: any, nota: NotaEvolucion){
        return this.http.put(`${AUTH_API}/nota-de-evolucions/${id}`, { data: nota }, httpOptions);
    }

    eliminaNota(id: any){
        return this.http.delete(`${AUTH_API}/nota-de-evolucions/${id}`, httpOptions);
    }
}