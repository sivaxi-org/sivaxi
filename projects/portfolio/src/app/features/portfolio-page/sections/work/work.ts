import { SlicePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-work',
  imports: [],
  styleUrl: './work.css',
  templateUrl: './work.html',
})
export class Work {
  readonly projectsData = input< any | undefined>();
  readonly username = input<string | null>()

private readonly router = inject(Router);
private readonly route = inject(ActivatedRoute);

openProject(slug: string): void {
  this.router.navigate([`portfolio/${this.username}/projects/`, slug]);
}
    


showAll(): void {
  // Navigates relative to the current route: e.g. '/' -> '/projects',
  // '/portfolio/ajaymalah' -> '/portfolio/ajaymalah/projects'.
  this.router.navigate(['projects'], { relativeTo: this.route });
}

}