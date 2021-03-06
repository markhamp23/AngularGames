import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})

export class GameViewComponent implements OnInit {

  public loading: Boolean = true;
  p: number = 1;
  games: any = [];
  game: any = null;
  llistaAux: any = [];
  edit: boolean = false;
  imgAux: string = "";
  captionAux: string = "";

  constructor(private gameService: GamesService, private router: Router, private activatedRoute: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService) {}

  ngOnInit() {
    this.getGames();
    this.getGame();

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.getGame();
    });
  }

  getGame() {
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.gameService.getGame(id)
        .subscribe(
          res => {
            console.log(res);
            this.game = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }

  getGames() {
    this.loading = true;
    this.gameService.getGames()
      .subscribe(
        res => {
          this.loading = false;
          this.games = res;
          this.getLlistaAux();
        },
        err => console.error(err)
      );
  }

  getLlistaAux() {
    for (let i = 0; i <= 8; i++) {
      var newItem = this.games[Math.floor(Math.random() * this.games.length)];
      this.llistaAux.indexOf(newItem) === -1 ? this.llistaAux.push(newItem) : console.log("This item already exists");
    }
  }

  ver(image,caption) {
    this.imgAux = image;
    this.captionAux = caption;
  }

  /*show()
  {
    this.spinnerService.show();
    setTimeout(()=>this.spinnerService.hide(),3000)
  }*/
}
