import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit {
  title: string = 'Ψηφιακές διαδραστικές εφαρμογές';
  text: string =
    'Χάρη στις δυνατότητες των ψηφιακών εφαρμογών, ο επισκέπτης θα ανακαλύψει έναν καινούριο τρόπο ερμηνείας των εκθεμάτων, θα ζήσει το γεγονός της «μουσειακής εμπειρίας», όπως αυτό διαμορφώνεται, από την ενεργό αισθητηριακή συμμετοχή του επισκέπτη στην διαδικασία της επίσκεψης-ξενάγησης και θα αποκτήσει λόγους για επαναλαμβανόμενες επισκέψεις στο Μουσείο, τόσο στον φυσικό χώρο όσο και στον διαδικτυακό.';
  constructor() {}

  ngOnInit(): void {}
}
