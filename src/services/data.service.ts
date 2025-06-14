import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSource = new BehaviorSubject<string>('');
  data = this.dataSource.asObservable();
  constructor() { }

  updateData(data: string) {
    this.dataSource.next(data);  // Thay đổi giá trị trong BehaviorSubject, phát ra cập nhật cho các subscriber
  }
}
