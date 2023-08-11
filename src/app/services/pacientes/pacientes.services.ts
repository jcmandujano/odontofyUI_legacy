import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paciente } from './pacientes.model';
const AUTH_API = environment.API_URL;
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
    providedIn: 'root'
})

export class PacientesService {
    constructor(private http: HttpClient) { }

    creaPaciente(paciente: Paciente){ //crear modelo de paciente
        return this.http.post(AUTH_API + '/pacientes', { data: paciente }, httpOptions);
    }

    listarPacientes(){
        return this.http.get(AUTH_API + '/pacientes', httpOptions).pipe(
            map((response: any)=> {
                return response
            })
        );
    }

    buscarPaciente(id: any){
        return this.http.get(`${AUTH_API}/pacientes/${id}`, httpOptions).pipe(
            map((response: any)=> {
                return response
            })
        );
    }
    
    actualizaPaciente(id: any, paciente: Paciente){
        return this.http.put(`${AUTH_API}/pacientes/${id}`, { data: paciente }, httpOptions);
    }

    eliminaPaciente(id: any){
        return this.http.delete(`${AUTH_API}/pacientes/${id}`, httpOptions);
    }
}