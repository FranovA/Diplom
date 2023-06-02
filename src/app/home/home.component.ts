import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articles = [
    {'id': 0, 'title': 'Люди', 'category': 1},
    {'id': 1, 'title': 'Бригады', 'category': 3},
    {'id': 2, 'title': 'Объект', 'category': 2},
    {'id': 3, 'title': 'Работы по объектам', 'category': 1},
    {'id': 4, 'title': 'Справочник работ', 'category': 2},
    //{'id': 5, 'title': 'Общие положения', 'category': 2},
    //{'id': 6, 'title': 'Клиенту', 'category': 1},
    //{'id': 7, 'title': 'О компании', 'category': 1},
  ];
  tables: any = [ 
    {'name': 'Люди', 'db_name': 'people', 'fields': [{'title': 'id', 'verbose': 'id'}, {'title': 'name', 'verbose': 'ФИО'}, {'title': 'phone', 'verbose': 'Номер телефона'}, {'title': 'job', 'verbose': 'Должность'}, {'title': 'salary', 'verbose': 'Заработная плата'}, {'title': 'passport', 'verbose': 'Паспортные данные'}, {'title': 'requisite', 'verbose': 'Лицевой счёт'}, {'title': 'comment', 'verbose': 'Комментарий'}, {'title': 'is_client', 'verbose': 'Это клиент?'}, {'title': 'brigade', 'verbose': 'Бригада'} ]}, 
    {'name': 'Бригады', 'db_name': 'brigade', 'fields':[{'title': 'id', 'verbose': 'id'},{'title': 'code', 'verbose': 'Номер бригады'}]}, 
    {'name': 'Объект', 'db_name': 'project', 'fields':[{'title': 'id', 'verbose': 'id'}, {'title': 'address', 'verbose': 'Адрес объекта'}, {'title': 'client', 'verbose': 'Код клиента'}, {'title': 'technical', 'verbose': 'Техническая документация'}]}, 
    {'name': 'Работы по объектам', 'db_name': 'project_info', 'fields':[{'title':'id', 'verbose': 'id'}, {'title': 'works', 'verbose': 'id работ'}, {'title': 'project', 'verbose': 'id объекта'}, {'title': 'date_start', 'verbose': 'Дата начала работ'},{'title': 'date_end', 'verbose': 'Дата окончания работ'}, {'title': 'brigade', 'verbose': 'id бригады'}, {'title': 'total_sum', 'verbose': 'Общая сумма заказа'}]}, 
    {'name': 'Справочник работ', 'db_name': 'work_type', 'fields':[{'title': 'id', 'verbose': 'id'}, {'title': 'name', 'verbose': 'Вид работ'}, {'title': 'price', 'verbose': 'Цена за кв2'}]} 
  ];
  selectedCategory = 0;
  selectedTable = 0;
  isAdding = true;

  data: any = {
    'people': {'id': null, 'title': null, 'phone': null, 'job': null, 'salary': null, 'passport': null, 'requisite': null, 'comment': null, 'brigade': null, 'is_client': 0},
    'brigade': {'id': null, 'code': null},
    'work_type': {'id': null, 'name': null, 'price': null},
    'project_info': {'id': null, 'work': null, 'project': null, 'date_start': null, 'date_end': null, 'brigade': null, 'total_sum': null},
    'project': {'id': null, 'address': null, 'client': null}
  }

  queries: any = [
    {'id': 0, 'title': 'Поиск человека по ФИО', 'table': 'people', 'search': 'Введите ФИО'},
    {'id': 1, 'title': 'Информация об объекте', 'table': 'project_info', 'search': 'Введите код объекта'},
    // {'id': 2, 'title': 'Кто в бригаде', 'table': 'people', 'search': 'Введите код бригады'},
    {'id': 2, 'title': 'Какая бригада на объекте', 'table': 'project_info', 'search': 'Введите код объекта'}
  ]
  queryData: any = '';
  selectedQuery = 0;

  queryTable: any = [];

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  public openArticle(id: number)
  {
    this.router.navigateByUrl('/article/' + id);
  }

  public addRow() {
    console.log(this.data)
    let selectedTable = this.tables[this.selectedTable]['db_name']
    this.http.post(`http://127.0.0.1:8000/${selectedTable}/`, this.data[selectedTable]).subscribe(result => {
      console.log(result)
    })
  }

  public deleteRow()
  {
    let selectedTable = this.tables[this.selectedTable]['db_name']
    this.http.delete(`http://127.0.0.1:8000/${selectedTable}/${this.data[selectedTable]['id']}`).subscribe(result => {
      console.log(result)
    })
  }

  public editData(table: any, key: any, data: any)
  {
    this.data[table][key] = data
  }

  public editQuery(data: any)
  {
    this.queryData = data;
  }

  public searchQuery()
  {
    let selectedQuery = this.queries[this.selectedQuery];
    this.http.get(`http://127.0.0.1:8000/${selectedQuery['table']}?search=${this.queryData}`).subscribe(result => {
      this.queryTable = result;
      console.log(result)
    });
  }


}
