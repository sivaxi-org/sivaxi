import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';


interface RightSectionCardProp{
  icon:string
  title:string
  description:string
}

@Component({
  imports: [],
  selector: 'right-section-card',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './right-section-card.css',
  templateUrl: './right-section-card.html',

})
export class RightSectionCard {

  item = input.required<RightSectionCardProp>()

}
