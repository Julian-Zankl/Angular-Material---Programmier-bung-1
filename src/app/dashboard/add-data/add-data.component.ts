import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, public storeService: StoreService, public backendService: BackendService) {}

  @Input({required: true}) public currentPage!: number;
  @ViewChild('form') form!: NgForm;

  public addChildForm!: FormGroup;
  public showSuccessMsg = false;

  ngOnInit(): void {
    this.addChildForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      kindergardenId: ['', Validators.required],
      birthDate: [null, Validators.required,]
    })
  }

  onSubmit() {
    if (this.addChildForm.valid) {
      this.backendService.addChild(this.addChildForm.value, this.currentPage);
      this.addChildForm.reset();
      this.form.resetForm();
      this.showSuccessMsg = true;
    }
  }
}
