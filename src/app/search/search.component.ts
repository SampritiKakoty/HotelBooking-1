import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from '../data.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  number:number[];
  formGroup:FormGroup;
  search:AbstractControl;
  numb:AbstractControl;

  users;
  

  constructor(private formBuilder:FormBuilder, private _dataService: DataService,private router:Router) 
  {
    this.number=[1,2,3,4,5,6,7,8];

    this.formGroup= formBuilder.group({
      "numb" : ['',Validators.required],
      "search" : ['',Validators.required]
    })
    this.numb=this.formGroup.controls['numb'];
    this.search=this.formGroup.controls['search'];

    this._dataService.getUsers()
    .subscribe(res => this.users = res);
  }

  onSubmit()
  {
    console.log("============================="+this.formGroup.controls.numb.value);
    console.log("============================="+this.formGroup.get('search').value);

    this.router.navigate(['./result']);
  }

  ngOnInit() 
  {

  }

}
