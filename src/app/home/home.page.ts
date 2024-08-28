import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  lampicon: string = 'bulb';
  lampcolor: string = 'gray';
  apiurl: string = environment.apiRepl;
  intervalid: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.startpolling();
  }

  ngOnDestroy() {
    if(this.intervalid){
      clearInterval(this.intervalid)
    }
  }

  startpolling() {
    this.intervalid = setInterval(() => {
      this.getLampStatus();
    }, 5000); //Ganti 5000 dengann Interval Waktu yang diinginkan dalam milidetik (ms)
  }


  getLampStatus() {
    this.http.get<{ status: string; data: { command: string }[] }>(this.apiurl).subscribe(response => {
          if (response.status === 'success' && response.data.length > 0) {
            const command = response.data[0].command;
            this.updateLampColor(command);
          }
        }, error => {
          console.error('API error:', error);
        });
  }

  updateLampColor(command: string) {
    switch (command) {
      case 'Nyalakan Lampu Merah':
        this.lampcolor = 'red';
        break;
      case 'Nyalakan Lampu Hijau':
        this.lampcolor = 'green';
        break;
      case 'Nyalakan Lampu Biru':
        this.lampcolor = 'blue';
        break;
      case 'Matikan Lampu':
      default:
        this.lampcolor = 'gray';
        break;
    }
  }
}
