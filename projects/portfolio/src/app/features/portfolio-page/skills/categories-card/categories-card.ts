import { Component, input, output } from '@angular/core';
import { IconRenderer } from '../../../../shared/components/icon/icon-renderer/icon-renderer';

@Component({
  imports: [IconRenderer],
  selector: 'app-categories-card',
  styleUrl: './categories-card.css',
  templateUrl: './categories-card.html',
})
export class CategoriesCard {

  skillsData = input<any>()
  openedCategory = input<any>()

  toggleCategory = output<any>();

  toggleCategoryFn(index:any){
    this.toggleCategory.emit(index)
  }

}
