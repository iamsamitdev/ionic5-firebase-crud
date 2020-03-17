import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppointmentService } from './../shared/appointment.service';


@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.page.html',
  styleUrls: ['./make-appointment.page.scss'],
})
export class MakeAppointmentPage implements OnInit {

  bookingForm: FormGroup;
  isSubmitted = false;

  constructor(
    private aptService: AppointmentService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10)]]
    })
  }


formSubmit() {
    this.isSubmitted = true;
    if (!this.bookingForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.bookingForm.value)
      this.aptService.createBooking(this.bookingForm.value).then(res => {
        console.log(res)
        this.bookingForm.reset();
        this.router.navigate(['/home']);
      })
        .catch(error => console.log(error));
    }
  }

  get errorControl() {
    return this.bookingForm.controls;
  }

}
