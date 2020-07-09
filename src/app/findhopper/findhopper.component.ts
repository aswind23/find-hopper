import { Component, OnInit , Pipe, PipeTransform, HostListener, Inject } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';  
import { DOCUMENT } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-findhopper',
  templateUrl: './findhopper.component.html',
  styleUrls: ['./findhopper.component.scss'],
  animations:[ 
    trigger('fade',
    [ 
      state('void', style({ opacity : 0})),
      transition(':enter',[ animate(300)]),
      transition(':leave',[ animate(500)]),
    ]
 )]
})

@Pipe({
  name: 'unique',
  pure: false
})

export class FindhopperComponent implements OnInit{
  constructor(@Inject(DOCUMENT) document) { }
  title = 'find-hopper';

  public cityData:string[];
  public selectCity = 'Delhi';
  public areaData:string[];
  public selectedArea = 'All';
  public locations = [];
  public isbarenabled = true;
  public isstoreenabled = true;
  public locationsCopy;

ngOnInit (){

  

  
  var url = "/assets/datas/Availability_list.xlsx";
  var oReq = new XMLHttpRequest();
  var collectData = new Array();
  var actualData = new Array();
  oReq.open("GET", url, true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function(e) {
    var arraybuffer = oReq.response;
    
    var data = new Uint8Array(arraybuffer);
    var arr = new Array();
    for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");
    var workbook = XLSX.read(bstr, {type:"binary"});
    var Sheets = workbook.Sheets;

      for (const i of Object.keys(Sheets)) {
        var objects = {
          'name': i,
          'category':i.indexOf('Retail') > -1 ? 'Stores':'Bar',
          'city_name':i.replace(' Bar & Rest','').replace(' Retail',''),
          'place':{}
        };

        for (const j of Object.keys(Sheets[i])) {
          if(Sheets[i][j]['h'] !== undefined){
            var key;
             if(Sheets[i][j]['h'].indexOf('Place:') > -1){

                key = Sheets[i][j]['h'].replace('Place:','');
                objects.place[''+key+''] = [];
             }else{
                 var locateData = {
                   'name' : Sheets[i][j]['h'],
                   'category' : i.indexOf('Retail') > -1 ? 'Stores':'Bar'
                 }
                 objects.place[''+key+''].push(locateData)
             }  
          }
        }
        collectData.push(objects);
      }  
       var delhiData = {
          'city_name' : collectData[0].city_name,
          'place_lists' : collectData[0].place
        }
        for(let [key, value] of Object.entries(collectData[1].place)){
          if(delhiData.place_lists[key] && delhiData.place_lists[key].length > 0){
            delhiData.place_lists[key] = delhiData.place_lists[key].concat(value)
          }else{
            var duplicate = {}
            duplicate[key] = value;
            delhiData.place_lists = Object.assign(delhiData.place_lists,duplicate);
          }
        }
        

        var mumbaiData = {
          'city_name' : collectData[2].city_name,
          'place_lists' : collectData[2].place
        }
        for(let [key, value] of Object.entries(collectData[3].place)){
          if(mumbaiData.place_lists[key] && mumbaiData.place_lists[key].length > 0){
            mumbaiData.place_lists[key] = mumbaiData.place_lists[key].concat(value)
          }else{
            var duplicate = {}
            duplicate[key] = value;
            mumbaiData.place_lists = Object.assign(mumbaiData.place_lists,duplicate);
          }
        }

        var tnData = {
          'city_name' : collectData[4].city_name,
          'place_lists' : collectData[4].place
        }

        for(let [key, value] of Object.entries(collectData[5].place)){
          if(tnData.place_lists[key] && tnData.place_lists[key].length > 0){
            tnData.place_lists[key] = tnData.place_lists[key].concat(value)
          }else{
            var duplicate = {}
            duplicate[key] = value;
            tnData.place_lists = Object.assign(tnData.place_lists,duplicate);
          }
        }

        var karnatakaData = {
          'city_name' : collectData[6].city_name,
          'place_lists' : collectData[6].place
        }

        for(let [key, value] of Object.entries(collectData[7].place)){
          if(karnatakaData.place_lists[key] && karnatakaData.place_lists[key].length > 0){
            karnatakaData.place_lists[key] = karnatakaData.place_lists[key].concat(value)
          }else{
            var duplicate = {}
            duplicate[key] = value;
            karnatakaData.place_lists = Object.assign(karnatakaData.place_lists,duplicate);
          }
        }
        actualData.push(delhiData,mumbaiData,tnData,karnatakaData);

    }

    this.cityData = actualData;
    setTimeout(()=>{
     console.log(actualData)
      this.changeCityData(this.selectCity);
    }, 1000);
     oReq.send();
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll (e) {
     if (window.pageYOffset > 100 && window.pageYOffset < window.outerHeight+100) {
       let element = document.getElementById('header');
       element.classList.add('sticky');
     } else if (window.pageYOffset > window.outerHeight + 100) {
         let element = document.getElementById('stickySearch');
         element.classList.add('sticky');
     }else{
        let element = document.getElementById('header');
        element.classList.remove('sticky');
        let element1 = document.getElementById('stickySearch');
         element1.classList.remove('sticky');
     }

  }
  changeCity(event, city:any){
     this.selectCity = city.city_name;
     this.changeCityData( city.city_name);
     event.preventDefault();
  }

  changeCityData(city:any){
     for (var i = 0; i < this.cityData.length; i++) {
        if(city === this.cityData[i]['city_name']){
          this.areaData = Object.keys(this.cityData[i]['place_lists']);
          this.selectedArea = 'All';
          this.selectCity = city;
          this.getLocationDatas(city, this.selectedArea);
          return;
        }
     }
  }

  changeAreaData(event, place:any){
    this.getLocationDatas(this.selectCity, place)
  }

  getLocationDatas(city:any, place:any){
    this.locations = [];
     for (var i = 0; i < this.cityData.length; i++) {
        if(city === this.cityData[i]['city_name']){
          if(place === 'All'){
            for(let [key, value] of Object.entries(this.cityData[i]['place_lists'])){
              this.locations = this.locations.concat(value)
            }
            
          }else{
            this.locations = this.cityData[i]['place_lists'][place];
          }
        }
      }
    }
   
  changeValue(isChecked, value){
    if(this.locationsCopy === undefined){
      this.locationsCopy = this.locations;
    }
    
    if(value === 'Bar'){
      this.isbarenabled = isChecked;
      this.locations = this.locationsCopy.filter(function(array){
         if(isChecked === true){
           return array.category === 'Bar'
         }else{
           return array.category !== 'Bar'
         }
      })

    }
    if(value === 'Stores'){
      this.isstoreenabled = isChecked;
       this.locations = this.locationsCopy.filter(function(array){
         if(isChecked === true){
           return array.category === 'Stores'
         }else{
           return array.category !== 'Stores'
         }
      })
    }
    
    if(this.isstoreenabled === false && this.isbarenabled === false){
      this.locations = [];
    }
    if(this.isstoreenabled === true && this.isbarenabled === true){
      this.locations = this.locationsCopy;
    }
   

  }


}
