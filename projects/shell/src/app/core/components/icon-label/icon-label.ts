import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';

interface IconLabelProps{
    icon: string,
    title: string
}


@Component({
  imports: [],
  selector: 'app-icon-label',
  styleUrl: './icon-label.css',
  templateUrl: './icon-label.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IconLabel {
  data = input.required<IconLabelProps>()
}
