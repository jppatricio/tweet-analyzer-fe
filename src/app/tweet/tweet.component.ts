import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HerokuService } from '../servicios/heroku.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

  formModelo : FormGroup

  constructor(private service: HerokuService) { 
    this.formModelo = new FormGroup({
      model: new FormControl(0, [Validators.required]),
      tweet: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.max(20)]),

    });
  }
  ngOnInit() {
  }

  enviarModelo(){
    Swal.fire({
      title: 'Etiquetando...',
      html: 'Esto puede tardar unos segundos...',
      timerProgressBar: true,
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      showCancelButton: false
    })
    this.service.postLabel(this.formModelo.value).subscribe(
      res => {
        Swal.close()
        Swal.fire({
          icon: 'success',
          title: 'Etiqueta calculada:',
          text: res["label"]
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

}
