import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Copyright © ENSA Khouribga by <b><a>ELMORABIT Younes</a></b> 2019</span>
    <div class="socials">
      <a href="https://github.com/ELMORABITYounes" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.facebook.com/younes.elmorabit.92" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://www.linkedin.com/in/younes-elmorabit-2a162310b/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
