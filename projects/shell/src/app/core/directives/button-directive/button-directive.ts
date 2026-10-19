import { Directive, input } from '@angular/core';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

@Directive({
  selector: '[appButton]',
  standalone: true,
  host: {
    '[class]': 'buttonClasses()',
  },
})
export class ButtonDirective {
  variant = input<ButtonVariant>('primary');

  private readonly baseClasses =
    'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.98]';

  buttonClasses() {
    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-accent text-white hover:brightness-110',
      secondary:
        'border border-border text-primary hover:border-accent hover:bg-accent-soft',
      ghost: 'text-muted hover:bg-surface hover:text-accent',
    };

    return `${this.baseClasses} ${variants[this.variant()]}`;
  }
}