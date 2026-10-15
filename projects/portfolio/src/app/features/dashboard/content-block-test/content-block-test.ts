import {
  Component
} from '@angular/core';
import { ContentBlockManager } from '../../../shared/components/content-block-manager/content-block-manager';


@Component({
  selector: 'app-content-block-test',
  imports: [
    ContentBlockManager
  ],
  templateUrl: './content-block-test.html',
  styleUrl: './content-block-test.css'
})
export class ContentBlockTest {

}