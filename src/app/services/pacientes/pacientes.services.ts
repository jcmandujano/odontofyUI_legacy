import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paciente } from './pacientes.model';
const API_PATH = environment.API_URL;
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
    providedIn: 'root'
})

export class PacientesService {
    constructor(private http: HttpClient) { }

    creaPaciente(paciente: Paciente){ //crear modelo de paciente
        return this.http.post(API_PATH + '/patients',  paciente , httpOptions);
    }

    listarPacientes(){
        return this.http.get(API_PATH + '/patients', httpOptions).pipe(
            map((response: any)=> {
                return response
            })
        );
    }

    buscarPaciente(id: any){
        return this.http.get(`${API_PATH}/patients/${id}`, httpOptions).pipe(
            map((response: any)=> {
                return response
            })
        );
    }
    
    actualizaPaciente(id: any, paciente: Paciente){
        return this.http.put(`${API_PATH}/patients/${id}`, paciente, httpOptions);
    }

    eliminaPaciente(id: any){
        return this.http.delete(`${API_PATH}/patients/${id}`, httpOptions);
    }
}