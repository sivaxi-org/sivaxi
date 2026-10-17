import { Component, input } from '@angular/core';
import { IconRenderer } from '../../../../shared/components/icon/icon-renderer/icon-renderer';

@Component({
  imports: [IconRenderer],
  selector: 'app-detail-panel',
  styleUrl: './detail-panel.css',
  templateUrl: './detail-panel.html',
})
export class DetailPanel {
  openedCategory = input<any>();
  skillsData = input<any>()
}
