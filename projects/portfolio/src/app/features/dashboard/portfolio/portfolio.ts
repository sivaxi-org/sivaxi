import { Component, OnInit, inject, signal } from '@angular/core';

import {
  ProfileRequest,
  ProfileResponse,
  PortfolioService
} from './portfolio-service';

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css'
})
export class Portfolio implements OnInit {
logout() {
throw new Error('Method not implemented.');
}

  private readonly portfolioService = inject(PortfolioService);

  profile = signal<ProfileResponse | null>(null);

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.portfolioService.getProfile().subscribe({
      next: (data) => {
        console.log('Profile:', data);
        this.profile.set(data);
      },
      error: (error) => {
        console.error('Failed to load profile:', error);
      }
    });
  }

  updateField<K extends keyof ProfileRequest>(
    field: K,
    value: ProfileRequest[K]
  ): void {
    this.profile.update(current => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        [field]: value
      };
    });
  }

  saveProfile(): void {
    const current = this.profile();

    if (!current) {
      return;
    }

    const request: ProfileRequest = {
      siteTitle: current.siteTitle,
      metaDescription: current.metaDescription,
      resumeUrl: current.resumeUrl,
      theme: current.theme,
      displayName: current.displayName,
      active: current.active,
      headline: current.headline,
      bio: current.bio,
      avatarUrl: current.avatarUrl
    };

    this.portfolioService.updateProfile(request).subscribe({
      next: (data) => {
        console.log('Profile updated:', data);
        this.profile.set(data);
      },
      error: (error) => {
        console.error('Failed to update profile:', error);
      }
    });
  }
}