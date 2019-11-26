import { Component, OnInit } from '@angular/core';
import { HerokuService } from '../servicios/heroku.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

export interface TrainResults {
  topic: string;
  precision: number;
  recall: number;
  f1_score: number;
  support: number;
}

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss']
})
export class TrainComponent implements OnInit {

  formModelo : FormGroup
  topicoString = ""
  allData = []
  displayedColumns: string[] = ['topic', 'precision', 'recall', 'f1_score', 'support'];
  ELEMENT_DATA: TrainResults[] = [];
  dataSource

  constructor(private service: HerokuService) { 
    this.formModelo = new FormGroup({
      model: new FormControl(0, [Validators.required]),
      testSize: new FormControl('', [Validators.required, Validators.min(0.1), Validators.max(0.90)]),
      topics: new FormControl(Array<String>(), [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.max(20)]),

    });
  }

  enviarModelo(){
    Swal.fire({
      title: 'Entrenando...',
      html: 'Esto puede tardar unos segundos...',
      timerProgressBar: true,
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      showCancelButton: false
    })
    this.formModelo.value.topics = this.topicoString.split(",")
    this.service.postTrain(this.formModelo.value).subscribe(
      res => {
        console.log("OK!!!!!!!!!!!!!")
        Swal.close()
        this.allData = []
        for(let key in res) {
          let tr = {topic: key,
            precision: res[key][0],
            recall: res[key][1],
            f1_score: res[key][2],
            support: res[key][3]}

          this.ELEMENT_DATA.push(tr)
          this.dataSource = this.ELEMENT_DATA
        }
        Swal.fire({
          icon: 'success',
          title: 'Modelo Entrenado... ',
          text: 'No olvides probarlo usando el mismo modelo...'
        })

      },
      err => {
        Swal.close()
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
        console.log(err);
        alert(err)

      }
    )
  }

  ngOnInit() {
  }

}
