import { Component, OnInit } from '@angular/core';
import { HerokuService } from '../servicios/heroku.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss']
})
export class TrainComponent implements OnInit {

  formModelo : FormGroup
  topicoString = ""

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
    })
    this.formModelo.value.topics.value = this.topicoString.split(",")
    this.service.postTrain(this.formModelo.value).subscribe(
      res => {
        Swal.close()
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
