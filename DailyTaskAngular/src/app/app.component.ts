import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  baseURL = "https://localhost:7272/";
  showTasks: boolean = false;
  showAddTask: boolean = false;
  showDeleteTask: boolean = false;

  taskList: Array<Task> = [];
  formGroup: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required])
  });

  deleteFormGroup: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required])
  });

  constructor(private http: HttpClient) {

  }

  toggleTasks(selected: string) {
    this.showTasks = selected == 'load' ? true : false;
    this.showDeleteTask = selected == 'delete' ? true : false;;
    this.showAddTask = selected == 'add' ? true : false;;
  }

  loadAllTasks() {
    this.taskList = [];
    this.http.get(this.getURL('api/getTasks')).subscribe((data: any) => {
      if (data != null && data.length > 0) {
        this.taskList = data;
        this.showTasks = true;
      }
    })
  }

  addTask() {
    if (this.formGroup.valid) {
      var description = this.formGroup.get("description")?.value;
      if (description != null) {
        var options = { params: new HttpParams().set('description', description) };

        this.http.post(this.getURL("api/addTask"), null, options).subscribe((res) => {
          if (res != null) {
            this.formGroup.get("description")?.setValue("");
            alert("Task Added");
          }
        })
      }
    }
  }

  deleteTask() {
    if (this.deleteFormGroup.valid) {
      var id = this.deleteFormGroup.get("id")?.value;
      if (id != null) {
        var options = { params: new HttpParams().set('id', id) };

        this.http.delete(this.getURL("api/deleteTask"), options).subscribe((res) => {
          if (res != null) {
            this.deleteFormGroup.get("id")?.setValue("");
            alert("Task Deleted");
          }
        })
      }
    }
  }

  getURL(url: string) {
    return this.baseURL + url;
  }
}

interface Task {
  Id: Number,
  description: string,
  created_at: string
}
