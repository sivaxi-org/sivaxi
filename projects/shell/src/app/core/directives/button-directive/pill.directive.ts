import { Directive } from '@angular/core';

@Directive({
  selector: '[appPill]',
  standalone: true,
  host: {
    class: 'inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft text-accent',
  },
})
export class PillDirective {}