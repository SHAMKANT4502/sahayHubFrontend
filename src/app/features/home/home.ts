import { Component, OnInit, inject, signal } from '@angular/core';
import { Api } from '../../core/services/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private api = inject(Api);

  status = signal<'loading' | 'ok' | 'error'>('loading');
  serviceName = signal('');

  ngOnInit(): void {
    this.api.getHealth().subscribe({
      next: (res) => {
        this.serviceName.set(res.service);
        this.status.set(res.status === 'ok' ? 'ok' : 'error');
      },
      error: () => this.status.set('error'),
    });
  }
}