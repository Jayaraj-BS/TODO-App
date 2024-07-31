import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonServiceService } from '../../services/common-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule, HttpClientModule],
  providers: [CommonServiceService],
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css']
})
export class TasksPageComponent {

  @ViewChild('taskModal') taskModal!: TemplateRef<any>;
  @ViewChild('viewTaskDetails') viewTaskDetails!: TemplateRef<any>;

  searchText: string = '';
  taskName: string = '';
  taskDescription: string = '';
  taskCreatedAt: string = '';

  todoTasks: any[] = [
    { id: 100, taskName: 'Planning', description: 'Description 1', createdAt: "2024-07-30 14:37:39" },
    { id: 110, taskName: 'Designing', description: 'Description 2', createdAt: "2024-07-30 14:37:39" },
  ];

  inProgressTasks: any[] = [
    { id: 120, taskName: 'Discussion', description: 'Description 3', createdAt: "2024-07-30 14:37:39" },
    { id: 121, taskName: 'Requirements', description: 'Description 3', createdAt: "2024-07-30 14:37:39" },
    { id: 170, taskName: 'Maintainence', description: 'Description 4', createdAt: "2024-07-30 14:37:39" },
  ];
  doneTasks: any[] = [
    { id: 140, taskName: 'Coding', description: 'Description 4', createdAt: "2024-07-30 14:37:39" },
    { id: 130, taskName: 'Implementation', description: 'Description 4', createdAt: "2024-07-30 14:37:39" },
    { id: 131, taskName: 'Deployment', description: 'Description 4', createdAt: "2024-07-30 14:37:39" },
  ];

  filteredTasks = {
    todoTasks: this.todoTasks,
    inProgressTasks: this.inProgressTasks,
    doneTasks: this.doneTasks
  };

  constructor(
    private router: Router,
    private commonService: CommonServiceService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.refreshTasks()
    this.filterTasks();
  }

  refreshTasks() {
    this.commonService.getAllTasks().subscribe((resp: any) => {
      console.log("ALLTASKS", resp);
      if (resp && resp.data) {
        for (let item of resp.data) {
          this.todoTasks.push(item)
        }
      }
    })
    console.log("ALLTODOS", this.todoTasks);
  }

  filterTasks(): void {
    this.filteredTasks.todoTasks = this.filterBySearchText(this.todoTasks);
    this.filteredTasks.inProgressTasks = this.filterBySearchText(this.inProgressTasks);
    this.filteredTasks.doneTasks = this.filterBySearchText(this.doneTasks);
  }

  filterBySearchText(tasks: any[]): any[] {
    if (!this.searchText) {
      return tasks;
    }
    return tasks.filter(task => task.taskName.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  getTasksList(container: any): any[] {
    switch (container.id) {
      case 'todo': return this.filteredTasks.todoTasks;
      case 'inProgress': return this.filteredTasks.inProgressTasks;
      case 'done': return this.filteredTasks.doneTasks;
      default: return [];
    }
  }

  editTask(task: any) {
    this.taskName = task.taskName;
    this.taskDescription = task.description;
    this.taskCreatedAt = task.createdAt;
    this.modalService.open(this.taskModal, {
      size: 'md',
      scrollable: true,
    });

    let params = {
      taskName: this.taskName,
      description: this.taskDescription
    }

    // this.commonService.updateTheTask(task.id, params).subscribe((resp: any) => {
    //   console.log(resp, "UPDATEDDDDD");
    // })
  }

  addTask() {
    this.taskName = '';
    this.taskDescription = '';
    this.modalService.open(this.taskModal, {
      size: 'md',
      scrollable: true,
    });
  }

  viewTask(task: any) {
    this.taskName = task.taskName;
    this.taskDescription = task.description;
    this.taskCreatedAt = task.createdAt;
    this.modalService.open(this.viewTaskDetails, {
      size: 'md',
      scrollable: true,
    });
  }


  deleteTheTask(task: any) {
    console.log(task);
    if (confirm("Are you sure you want to delete this task?")) {
      let index;
      if (this.todoTasks.some(t => t.id === task.id)) {
        index = this.todoTasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
          this.todoTasks.splice(index, 1);
        }
      } else if (this.inProgressTasks.some(t => t.id === task.id)) {
        index = this.inProgressTasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
          this.inProgressTasks.splice(index, 1);
        }
      } else if (this.doneTasks.some(t => t.id === task.id)) {
        index = this.doneTasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
          this.doneTasks.splice(index, 1);
        }
      }
  
      // this.commonService.deleteTheTask(task.id).subscribe((resp: any) => {
      //   console.log("DELETED");
      // });
  
      this.filteredTasks = {
        todoTasks: this.todoTasks,
        inProgressTasks: this.inProgressTasks,
        doneTasks: this.doneTasks,
      };
    }
  }
  

  close() {
    this.modalService.dismissAll("close");
  }

  onSubmit() {
    const newTask = {
      taskName: this.taskName,
      description: this.taskDescription,
      createdAt: this.taskCreatedAt
    };

    this.todoTasks.push(newTask);
    // this.commonService.addNewTask(newTask).subscribe((resp: any) => {
    //   console.log(resp, "CREATED");
    // })
    this.filterTasks();
    this.close();
  }

}
