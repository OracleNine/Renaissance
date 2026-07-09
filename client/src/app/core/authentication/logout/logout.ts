import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.css',
})
export class Logout {
  private http = inject(HttpClient)
  private router = inject(Router)

  ngOnInit() {
    this.http.get("http://localhost:8000/api/core/logout", {
      withCredentials: true,
    }).subscribe({
      next: (payload) => {
        this.router.navigate(['/'])
      },
      error: (error) => {
        console.warn(error)
        this.router.navigate(['/'])
      }
    })
  }
}
