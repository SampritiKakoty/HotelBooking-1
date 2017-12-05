import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  Hotel;

  constructor(private _dataService:DataService) 
  {

  }

  ngOnInit() 
  {
    this._dataService.getUsers().subscribe(res => {
      console.log("========szlnd========="+res);
      this.Hotel = res;
      
    });
    
  }

}
