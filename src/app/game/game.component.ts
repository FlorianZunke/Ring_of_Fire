import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GameDatasService } from '../shared/game-datas.service';
import { PlayerComponent } from './player/player.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from './dialog-add-player/dialog-add-player.component';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, DialogAddPlayerComponent, MatButtonModule, MatIconModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})


export class GameComponent {
  currentCard: string = '';
  drawCardAnimation: boolean = false;
  game = inject(GameDatasService);

  constructor(public dialog: MatDialog ) { }


  ngOnInit(): void {
    this.startGame();
  }


  drawCard() {
    if (this.drawCardAnimation) return
    else  this.drawCardAnimation = true;
     
    let currentCards = this.game.cardStack.pop(); ;
    if (currentCards != undefined) {
      this.currentCard = currentCards
    }

    setTimeout(() => {
      this.drawCardAnimation = false;
      this.game.playedCards.push(this.currentCard)
    }, 2000);
  }


  startGame() {
    this.game = new GameDatasService;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
      }
    });
  }

}
