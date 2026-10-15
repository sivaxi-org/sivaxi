import { Component, input } from '@angular/core';
import { IconRenderer } from '../../../../shared/components/icon/icon-renderer/icon-renderer';
import { ProfileResponse } from '../../../dashboard/portfolio/portfolio-service';
import { ContactDto } from '../../../dashboard/contact/contact-service';
import { StatsDto } from '../../../dashboard/stats/stats-service';


@Component({
  selector: 'app-hero',
  imports: [IconRenderer],
  styleUrl: './hero.css',
  templateUrl: './hero.html',
})
export class Hero {

  readonly portfolioData = input<ProfileResponse | undefined>();

  readonly contacts = input<ContactDto[]>([]);

  readonly stats = input<StatsDto[]>([]);

}