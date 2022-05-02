import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, EMPTY, filter, map, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { singleUser, singleUserApi, usersList } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  _page$ = new BehaviorSubject<string>('1');
  page$ = this._page$.asObservable();

  _userId$ = new BehaviorSubject<string>('');
  userId$ = this._userId$.asObservable();

  _userList$ = new BehaviorSubject<any>([]);
  userList$ = this._userList$.asObservable();

  done = true;


  private userList: any = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

  }

  LoadUsersPerPage$ = this.page$
    .pipe(
      filter(page => Boolean(page)),
      switchMap((page) =>
        this.http.get<usersList>(`${environment.api_url}/users?page=${page}`)
          .pipe(
            map((data: usersList) => ({
              ...data,
              data: data.data.map(user => ({
                ...user,
                job: "Unknown",
                phone_number: "Unknown",
                address: "Unknown",
              }))
            })),
            tap(data => {
              this.userList.push(...data.data);
              this._userList$.next(this.userList);
            }),
            catchError(err => {
              return EMPTY
            })
          )
      )
    );

  loadSingleUser$ = this.userId$
    .pipe(
      filter(id => Boolean(id)),
      switchMap((id) =>
        this.userList$
          .pipe(
            map(data => ({
              data: data.find((data: any) => data.id === parseInt(id))
            })),
            catchError(err => {

              return EMPTY
            })
          )
      )
    );

  createUser(user: singleUser) {
    this.http.post<singleUserApi>(`${environment.api_url}/users`, user)
      .pipe(
        catchError(err => {

          return EMPTY
        })
      ).subscribe();

    user.id = this.userList.length + 10;

    this.userList.push(user);
    this._userList$.next(this.userList);
    this.router.navigate(['/users']);
  }

  updateUser(user: singleUser) {
    this.http.put<singleUser>(`${environment.api_url}/users/${user.id}`, user)
      .pipe(
        catchError(err => {

          return EMPTY
        })
      ).subscribe();

    const index = this.userList.findIndex((data: any) => data.id == user.id);
    this.userList[index] = user;
    this._userList$.next(this.userList);
    this.router.navigate(['/users']);
  }

  deleteUser(id: number) {
    this.http.delete(`${environment.api_url}/users/${id}`)
      .pipe(
        catchError(err => {

          return EMPTY
        })
      ).subscribe();

    const index = this.userList.findIndex((data: any) => data.id === id);
    this.userList.splice(index, 1);
    this._userList$.next(this.userList);
  }

}
