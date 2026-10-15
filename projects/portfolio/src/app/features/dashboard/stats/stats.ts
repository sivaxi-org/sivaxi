
import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import {
  StatsDto,
  StatsService
} from './stats-service';

import { StatsForm } from './stats-form/stats-form';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    StatsForm
  ],
  templateUrl: './stats.html',
  styleUrl: './stats.css'
})
export class Stats implements OnInit {

  private readonly statsService = inject(StatsService);

  stats = signal<StatsDto[]>([]);
  loading = signal(false);

  showAddStat = signal(false);
  editingStat = signal<StatsDto | null>(null);

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading.set(true);

    this.statsService.getStats(false).subscribe({
      next: stats => {
        this.stats.set(
          [...stats].sort(
            (a, b) => a.sortOrder - b.sortOrder
          )
        );

        this.loading.set(false);
      },
      error: error => {
        console.error('Failed to load stats', error);
        this.loading.set(false);
      }
    });
  }

  openAddStat(): void {
    this.editingStat.set(null);
    this.showAddStat.set(true);
  }

  closeAddStat(): void {
    this.showAddStat.set(false);
  }

  createStat(stat: StatsDto): void {
    const newStat: StatsDto = {
      ...stat,
      uid: '',
      sortOrder: this.stats().length
    };

    this.statsService.createStat(newStat).subscribe({
      next: created => {
        this.stats.update(stats =>
          [...stats, created].sort(
            (a, b) => a.sortOrder - b.sortOrder
          )
        );

        this.showAddStat.set(false);
      },
      error: error => {
        console.error('Failed to create stat', error);
      }
    });
  }

  openEditStat(stat: StatsDto): void {
    this.showAddStat.set(false);
    this.editingStat.set(stat);
  }

  closeEditStat(): void {
    this.editingStat.set(null);
  }

  updateStat(stat: StatsDto): void {
    if (!stat.uid) {
      return;
    }

    this.statsService.updateStat(
      stat.uid,
      stat
    ).subscribe({
      next: updated => {
        this.stats.update(stats =>
          stats
            .map(existing =>
              existing.uid === updated.uid
                ? updated
                : existing
            )
            .sort(
              (a, b) => a.sortOrder - b.sortOrder
            )
        );

        this.editingStat.set(null);
      },
      error: error => {
        console.error('Failed to update stat', error);
      }
    });
  }

  deleteStat(stat: StatsDto): void {
    if (!stat.uid) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${stat.label}"?`
    );

    if (!confirmed) {
      return;
    }

    this.statsService.deleteStat(stat.uid).subscribe({
      next: () => {
        this.stats.update(stats =>
          stats.filter(
            existing => existing.uid !== stat.uid
          )
        );

        const editing = this.editingStat();

        if (editing?.uid === stat.uid) {
          this.editingStat.set(null);
        }
      },
      error: error => {
        console.error('Failed to delete stat', error);
      }
    });
  }
}

