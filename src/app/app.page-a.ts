import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { DatePipe } from '@angular/common';

const API_KEY       = '3fe23de8577d43df072fd94edd8f565a';
const BASE_URL      = 'http://api.themoviedb.org/3/discover/movie?api_key=' 
                    +  API_KEY 
                    // Hint: You will need a function to change this URL to  
                    // dynamically modify the start and end date range. 
                    + '&primary_release_date.gte=2021-02-21' 
                    + '&primary_release_date.lte=2021-03-21' 
                    + '&page=1&with_genres=16';
const GENRE_URL     = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' 
                    +  API_KEY 
                    + '&language=en-US';

@Component({
    template:   `<h1>Genres</h1> 
    
                <label for="genres">Choose a Genre:
                <select [(ngModel)]="inputGenre" (change)="handleGenreChange()" name='genre' id='genre'> 
                    <option *ngFor="let genre of _genreArray" value="{{genre.id}}">{{genre.name}} </option>
                </select>

                <h1>Movies</h1>

                <pagination-controls
                (pageChange)="handlePageChange($event)"
                >
                </pagination-controls>

                <div>
                <ul style="list-style-type: none; display: grid; grid-template-columns: repeat(auto-fit,minmax(300px, 1fr));"> 
                    <li  style="list-style-type: none; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); text-align: center; background-color: #f1f1f1; padding: 15px; margin: 15px; display: inline-block;" 
                    *ngFor="let movie of _movieArray | paginate: {
                        itemsPerPage: 20,
                        currentPage: page,
                        totalItems: this.totalResults}" >
                        <img src="http://image.tmdb.org/t/p/w185/{{movie.poster_path}}"/>
                        <h3>{{movie.title}}</h3>
                        <p><b>Overview: </b>{{movie.overview}}</p>
                    </li> 
                </ul>
                </div>`,
    styles: ['h1, h3, p, label, select{font-family: "Lucida Console", "Courier New", monospace;}']
})
export class PageAComponent {

    page: number = 1;
    inputGenre: number = 35;
    todayDate: string;
    pastDate: string;
    totalResults: number;
    _movieArray: Array<any>; 
    _genreArray: Array<any>; 
    _http:HttpClient;
    newURL: string;


    constructor(private http: HttpClient, private datePipe: DatePipe) { 
        this._http = http;
    }

    ngOnInit() { 
        this.getGenres(); 
        this.getDateRange();
    }


    getDateRange() { 
        let today = new Date(); 
        this.todayDate = (this.datePipe.transform(today,"yyyy-MM-dd"));
        let thirtyDaysAgo = new Date(); 
        console.log(this.todayDate);
        thirtyDaysAgo.setDate( thirtyDaysAgo.getDate() - 30 );
        this.pastDate = (this.datePipe.transform(thirtyDaysAgo,"yyyy-MM-dd"));
        console.log(this.pastDate);
        this.newURL = 'http://api.themoviedb.org/3/discover/movie?api_key=' 
                    +  API_KEY 
                    + '&primary_release_date.gte='
                    + this.pastDate
                    + '&primary_release_date.lte='
                    + this.todayDate 
                    + '&page='
                    + this.page
                    +'&with_genres='
                    + this.inputGenre;
        this.getMovies(this.newURL);
    } 
    getMovies(URL) { 
        this._http.get<any>(URL) 
          .subscribe(data => { 
              let totalResults  = data.total_results;
              this._movieArray  = data.results;
              this.totalResults = totalResults;
          },  
          error =>{ 
            alert(error); 
            console.error(error) 
          }) 
    }
    getGenres() { 
        this._http.get<any>(GENRE_URL) 
        .subscribe(data => { 
            this._genreArray = data.genres;
        },
        error =>{ 
          alert(error); 
          console.error(error) 
        }) 
    } 
    handlePageChange(event) {
        this.page = event;
        this.newURL = 'http://api.themoviedb.org/3/discover/movie?api_key=' 
                    +  API_KEY 
                    + '&primary_release_date.gte='
                    + this.pastDate
                    + '&primary_release_date.lte='
                    + this.todayDate 
                    + '&page='
                    + this.page
                    +'&with_genres='
                    + this.inputGenre;
        this.getMovies(this.newURL);
    }
    handleGenreChange(){
        this.inputGenre
        this.page = 1;
        this.newURL = 'http://api.themoviedb.org/3/discover/movie?api_key=' 
                    +  API_KEY 
                    + '&primary_release_date.gte='
                    + this.pastDate
                    + '&primary_release_date.lte='
                    + this.todayDate 
                    + '&page=1'
                    +'&with_genres='
                    + this.inputGenre;
        this.getMovies(this.newURL);
    }
} 