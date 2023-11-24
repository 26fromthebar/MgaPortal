import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-single',
  templateUrl: './application-single.component.html',
  styleUrls: ['./application-single.component.scss'],
})
export class ApplicationSingleComponent implements OnInit {
  title: string = 'Default title';
  shortDescription: string = 'This is a really short description';
  heroImgUrl: string = '/assets/images/app-2.png';
  sectionTitle: string = 'Default Section title';
  sectionSubtitle: string = 'Default Section Subtitle';
  sectionDetails: string =
    'Luctus accumsan tortor posuere ac ut. Cras tincidunt lobortis feugiat vivamus at augue. Dolor sit amet consectetur adipiscing elit. Sed faucibus turpis in eu mi bibendum. Integer vitae justo eget magna. Magna eget est lorem ipsum. Interdum varius sit amet mattis vulputate enim nulla. Senectus et netus et malesuada fames ac. Consequat interdum varius sit amet mattis vulputate. Nunc scelerisque viverra mauris in aliquam. Feugiat sed lectus vestibulum mattis. Tempor orci dapibus ultrices in iaculis nunc. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Tincidunt ornare massa eget egestas purus viverra accumsan in. Consectetur a erat nam at. Nunc mattis enim ut tellus. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Vestibulum rhoncus est pellentesque elit ullamcorper. Mollis nunc sed id semper risus in hendrerit gravida rutrum. Quis viverra nibh cras pulvinar mattis nunc sed blandit libero. Tempor nec feugiat nisl pretium fusce id velit. Magnis dis parturient montes nascetur ridiculus. Felis donec et odio pellentesque diam volutpat commodo sed egestas. Massa eget egestas purus viverra. Tempor nec feugiat nisl pretium fusce id velit. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi. Quis imperdiet massa tincidunt nunc pulvinar. Feugiat pretium nibh ipsum consequat nisl. Iaculis urna id volutpat lacus laoreet. Purus in massa tempor nec feugiat nisl. Vel facilisis volutpat est velit egestas dui id ornare. Nullam ac tortor vitae purus faucibus. Nisl purus in mollis nunc sed id. Vitae aliquet nec ullamcorper sit. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Donec ac odio tempor orci dapibus ultrices in iaculis. Tellus at urna condimentum mattis pellentesque.';

  imgSrc: string = '/assets/images/app-1.png';
  constructor() {}

  ngOnInit(): void {}
}
